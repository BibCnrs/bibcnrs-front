import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import { getToken } from '../user/Session';
import type { ArticleRetrieveItemValueObjectDataType } from '../../shared/types/data.types';
import type { ArticleRetrieveDataType } from '../../shared/types/data.types';
import type { ArticleResultDataType } from '../../shared/types/data.types';
import type { ArticleDataType } from '../../shared/types/data.types';
import type { FacetEntry } from '../../shared/types/types';
import type { Institute } from '../../shared/types/types';

export type ArticlePayLoad = {
    queries: any[];
    FT?: 'Y' | undefined;
    OA?: 'Y' | undefined;
    RV?: 'Y' | undefined;
    DT1?: string;
    activeFacets?: {
        SourceType?: string[];
        SubjectEDS?: string[];
        Journal?: string[];
        Language?: string[];
        RangeLexile?: string[];
        CollectionLibrary?: string[];
        Publisher?: string[];
        ContentProvider?: string[];
    };
    sort?: 'date' | 'date2' | 'relevance';
    resultsPerPage: number;
    currentPage: number;
};

export type ArticleParam = {
    orderBy: 'date_asc' | 'date_desc' | 'relevance';
    limiters?: {
        fullText?: boolean;
        openAccess?: boolean;
        reviewed?: boolean;
        dateRange?: {
            from: number;
            to: number;
        };
    };
    facets?: Record<string, FacetEntry[]> & {
        source?: FacetEntry[];
        subject?: FacetEntry[];
        journal?: FacetEntry[];
        language?: FacetEntry[];
        lexile?: FacetEntry[];
        collection?: FacetEntry[];
        publisher?: FacetEntry[];
        provider?: FacetEntry[];
    };
};

export const article = async (
    domain: Institute,
    query: string,
    page: number,
    perPage: number,
    param: ArticleParam,
): Promise<ArticleDataType> => {
    // Create payload from params
    const payload: ArticlePayLoad = {
        queries: [
            {
                boolean: 'AND',
                term: query,
                suggestedTerms: [],
                field: null,
                key: 'initial',
            },
        ],
        currentPage: page,
        resultsPerPage: perPage,
    };

    switch (param.orderBy) {
        case 'date_asc': {
            payload.sort = 'date';
            break;
        }
        case 'date_desc': {
            payload.sort = 'date2';
            break;
        }
        default: {
            payload.sort = 'relevance';
            break;
        }
    }

    if (param.limiters) {
        if (param.limiters.fullText) {
            payload.FT = 'Y';
        }
        if (param.limiters.openAccess) {
            payload.OA = 'Y';
        }
        if (param.limiters.reviewed) {
            payload.RV = 'Y';
        }
        if (param.limiters.dateRange) {
            payload.DT1 = `${param.limiters.dateRange.from}-01/${param.limiters.dateRange.to}-01`;
        }
    }

    const convertFacet = (array: FacetEntry[]): string[] => {
        return array.map<string>((value) => value.name);
    };

    if (param.facets) {
        payload.activeFacets = {};
        if (param.facets.source) {
            payload.activeFacets.SourceType = convertFacet(param.facets.source);
        }
        if (param.facets.subject) {
            payload.activeFacets.SubjectEDS = convertFacet(param.facets.subject);
        }
        if (param.facets.journal) {
            payload.activeFacets.Journal = convertFacet(param.facets.journal);
        }
        if (param.facets.language) {
            payload.activeFacets.Language = convertFacet(param.facets.language);
        }
        if (param.facets.lexile) {
            payload.activeFacets.RangeLexile = convertFacet(param.facets.lexile);
        }
        if (param.facets.collection) {
            payload.activeFacets.CollectionLibrary = convertFacet(param.facets.collection);
        }
        if (param.facets.publisher) {
            payload.activeFacets.Publisher = convertFacet(param.facets.publisher);
        }
        if (param.facets.provider) {
            payload.activeFacets.ContentProvider = convertFacet(param.facets.provider);
        }
    }

    // Convert payload to a valide format
    const queryPayLoad: any = {
        ...payload,
        queries: JSON.stringify(payload.queries),
    };
    if (payload.activeFacets) {
        queryPayLoad.activeFacets = JSON.stringify(payload.activeFacets);
    }
    // Call api
    const response: Response = await fetch(
        createQuery(environment.get.search.article.replace('{domain}', domain), queryPayLoad),
        {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );
    throwIfNotOk(response);
    return json<ArticleDataType>(response);
};

export const retrieve = async (
    domain: Institute,
    dbid: string,
    an: string,
): Promise<Partial<ArticleResultDataType>> => {
    const response: Response = await fetch(
        createQuery(environment.get.retrieve.article.replace('{domain}', domain), {
            dbid,
            an,
        }),
        {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );
    throwIfNotOk(response);
    const rawRetrieve = await json<ArticleRetrieveDataType>(response);
    const formattedRetrieve: Partial<ArticleResultDataType> = {};

    formattedRetrieve.articleLinks = rawRetrieve.articleLinks;
    formattedRetrieve.dbId = rawRetrieve.dbId;
    formattedRetrieve.source = rawRetrieve.dbLabel;

    // Element mark as "to-do" are case who need more inspection to know how to use it
    rawRetrieve.items.forEach((item) => {
        switch (item.name) {
            case 'Abstract': {
                formattedRetrieve.abstract = item.value[0];
                break;
            }
            case 'AffiliationAuthor': {
                formattedRetrieve.affiliationAuthor = item.value;
                break;
            }
            case 'AN': {
                break; // TODO
            }
            case 'Author': {
                switch (item.label) {
                    case 'Authors': {
                        const authors: string[] = [];
                        item.value.forEach((value) => {
                            if (value.length === 1) {
                                authors.push((value[0] as ArticleRetrieveItemValueObjectDataType).value);
                            }
                            if (value.length === 2) {
                                authors.push(
                                    (value[0] as ArticleRetrieveItemValueObjectDataType).value + (value[1] as string),
                                );
                            }
                        });
                        formattedRetrieve.authors = authors;
                        break;
                    }
                    case 'Contributors': {
                        formattedRetrieve.authors = item.value;
                        break;
                    }
                }
                break;
            }
            case 'Copyright': {
                formattedRetrieve.copyright = item.value[0];
                break;
            }
            case 'DOI': {
                formattedRetrieve.doi = item.value[0];
                break;
            }
            case 'ISSN': {
                formattedRetrieve.issn = item.value;
                break;
            }
            case 'Language': {
                formattedRetrieve.languages = item.value;
                break;
            }
            case 'NoteTitleSource': {
                break; // TODO
            }
            case 'Publication Year': {
                break; // TODO
            }
            case 'Publisher': {
                break; // TODO
            }
            case 'Subject': {
                break; // TODO
            }
            case 'Subset': {
                break; // TODO
            }
            case 'Title': {
                break; // TODO
            }
            case 'TitleSource': {
                break; // TODO
            }
            case 'TypeDocument': {
                break; // TODO
            }
            case 'URL': {
                break; // TODO
            }
        }
    });
    return formattedRetrieve;
};
