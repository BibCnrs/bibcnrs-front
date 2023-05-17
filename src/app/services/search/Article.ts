import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import { getToken } from '../user/Session';
import type { ArticleRetrieveItemDataType } from '../../shared/types/data.types';
import type { ArticleResultDataType } from '../../shared/types/data.types';
import type { ArticleRetrieveDataType } from '../../shared/types/data.types';
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

export class ArticleContentGetter {
    private readonly initial: ArticleResultDataType;
    private readonly retrieve: ArticleRetrieveDataType | null;
    constructor(initial: ArticleResultDataType, retrieve: ArticleRetrieveDataType | null) {
        this.initial = initial;
        this.retrieve = retrieve;
    }

    public getTitle = (): string | null => {
        const retrieveObj = this.getEntry('Title');
        const retrieve = this.getString(retrieveObj);
        if (retrieve) {
            return retrieve;
        }
        if (this.initial.title) {
            return this.initial.title;
        }
        return null;
    };

    public getDOI = (): string | null => {
        const retrieveObj = this.getEntry('DOI');
        const retrieve = this.getString(retrieveObj);
        if (retrieve) {
            return retrieve;
        }
        if (this.initial.doi) {
            return this.initial.doi;
        }
        return null;
    };

    public getSource = (): string | null => {
        const retrieveObj = this.getEntry('TitleSource');
        const retrieve = this.getString(retrieveObj);
        if (retrieve) {
            return retrieve;
        }
        if (this.initial.source) {
            return this.initial.source;
        }
        return null;
    };

    public getAuthors = (): string[] | null => {
        const retrieveObj = this.getEntry('Author', 'Authors');
        const retrieve = this.getStringArray(retrieveObj);
        if (retrieve) {
            return retrieve;
        }
        if (this.initial.authors) {
            return this.initial.authors;
        }
        return null;
    };

    public getLanguages = (): string[] | null => {
        const retrieveObj = this.getEntry('Language');
        const retrieve = this.getStringArray(retrieveObj);
        if (retrieve) {
            return retrieve;
        }
        if (this.initial.languages) {
            return this.initial.languages;
        }
        return null;
    };

    public getPublisherURL = (): string[] | null => {
        if (this.retrieve) {
            const urls = this.retrieve.articleLinks.urls.filter((value) => value.name === 'Publisher URL');
            if (urls.length > 0) {
                return urls.map((url) => url.url);
            }
        }
        return null;
    };

    public getAN = (): string => {
        return this.initial.an;
    };

    public getDBID = (): string => {
        return this.initial.dbId;
    };

    public getDatabase = (): string => {
        return this.initial.database;
    };

    public getType = (): string => {
        return this.initial.publicationType;
    };

    public getAllItems = (): Array<{ label: string; content: string[] }> => {
        if (this.retrieve) {
            const toReturn: Array<{ label: string; content: string[] }> = [];
            this.retrieve.items.forEach((value) => {
                const content = this.getStringArray(this.getEntry(value.name, value.label));
                if (content) {
                    toReturn.push({
                        label: value.label,
                        content,
                    });
                }
            });
            return toReturn;
        }
        return [];
    };

    private getEntry = (name: string, label?: string): ArticleRetrieveItemDataType[] | null => {
        if (!this.retrieve) {
            return null;
        }
        return this.retrieve.items.filter((value) => {
            const keep = value.name === name;
            if (label) {
                return keep && value.label === label;
            }
            return keep;
        });
    };

    private readValue = (value: any) => {
        let tmp = '';
        if (typeof value === 'string') {
            return value;
        }
        value.forEach((entry: any) => {
            if (typeof entry === 'string') {
                tmp += entry;
            }
            if (typeof entry === 'object') {
                if (entry.value) {
                    tmp += entry.value;
                }
                if (entry.indice) {
                    tmp += entry.indice;
                }
            }
        });
        return tmp;
    };

    private get = (values: any): string[] | string | undefined => {
        if (typeof values === 'string') {
            return values;
        }
        if (Array.isArray(values) && !Array.isArray(values[0])) {
            return values.map(this.readValue);
        }
        if (Array.isArray(values) && Array.isArray(values[0])) {
            const formatted: string[] = [];
            values.forEach((value: any) => {
                formatted.push(this.readValue(value));
            });
            return formatted;
        }
        return undefined;
    };

    private getString = (retrieveObj: ArticleRetrieveItemDataType[] | null): string | undefined => {
        if (retrieveObj && retrieveObj.length > 0) {
            const retrieve = this.get(retrieveObj[0].value);
            if (retrieve) {
                if (typeof retrieve === 'string') {
                    return retrieve;
                }
                return retrieve[0];
            }
        }
        return undefined;
    };

    private getStringArray = (retrieveObj: ArticleRetrieveItemDataType[] | null): string[] | undefined => {
        if (retrieveObj && retrieveObj.length > 0) {
            const retrieve = this.get(retrieveObj[0].value);
            if (retrieve) {
                if (typeof retrieve === 'string') {
                    return [retrieve];
                }
                return retrieve;
            }
        }
        return undefined;
    };
}

export const retrieve = async (domain: Institute, dbid: string, an: string): Promise<ArticleRetrieveDataType> => {
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
    return json<ArticleRetrieveDataType>(response);
};
