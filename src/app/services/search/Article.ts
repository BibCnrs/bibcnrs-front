import { convertFacet, convertPayload } from '../../shared/typeConvertion';
import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import { addHistory } from '../user/History';
import { getToken } from '../user/Session';
import type { RetrieveItemValueDataType } from '../../shared/types/data.types';
import type { ArticleLinksDataType } from '../../shared/types/data.types';
import type { RetrieveItemDataType } from '../../shared/types/data.types';
import type { ArticleResultDataType } from '../../shared/types/data.types';
import type { ArticleRetrieveDataType } from '../../shared/types/data.types';
import type { ArticleDataType } from '../../shared/types/data.types';
import type { Url } from '../../shared/types/types';
import type { FacetEntry } from '../../shared/types/types';
import type { Institute } from '../../shared/types/types';

export type ArticlePayLoad = {
    queries: any[];
    FT?: 'Y';
    OA?: 'Y';
    RV?: 'Y';
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

export type OrderByType = 'date_asc' | 'date_desc' | 'relevance';

export type ArticleParam = {
    orderBy: OrderByType;
    limiters?: Record<string, any> & {
        fullText?: boolean;
        openAccess?: boolean;
        reviewed?: boolean;
        dateRange?: {
            from: number;
            to: number;
        };
    };
    facets?: Record<
        string | 'collection' | 'journal' | 'language' | 'lexile' | 'provider' | 'publisher' | 'source' | 'subject',
        FacetEntry[]
    >;
};

export const article = async (
    domain: Institute,
    query: string,
    page: number,
    perPage: number,
    saveHistory: boolean,
    param: ArticleParam,
): Promise<ArticleDataType> => {
    // Create payload from params
    const payload: Partial<ArticlePayLoad> = {
        queries: [
            {
                boolean: 'AND',
                term: query,
                suggestedTerms: [],
                field: null,
                key: 'initial',
            },
        ],
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

    payload.currentPage = page;
    payload.resultsPerPage = perPage;

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

    // Call api
    const response: Response = await fetch(
        createQuery(environment.get.search.article.replace('{domain}', domain), convertPayload(payload)),
        {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );
    throwIfNotOk(response);
    const result = await json<ArticleDataType>(response);
    if (saveHistory) {
        addHistory(payload, param, domain, result).then();
    }
    return result;
};
const HAL_REGEX = /https?:\/\/(?:www\.)?(hal|tel)(shs)?(-.*)?\.(.*)\.(.*)/;
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

    public getArticleLinks = (): ArticleLinksDataType => {
        const articleLinks: ArticleLinksDataType = {
            fullTextLinks: [],
            pdfLinks: [],
            urls: [],
        };
        if (this.initial.articleLinks) {
            if (Array.isArray(this.initial.articleLinks.fullTextLinks)) {
                articleLinks.fullTextLinks.push(...this.initial.articleLinks.fullTextLinks);
            }
            if (Array.isArray(this.initial.articleLinks.pdfLinks)) {
                articleLinks.pdfLinks.push(...this.initial.articleLinks.pdfLinks);
            }
            if (Array.isArray(this.initial.articleLinks.html)) {
                if (!Array.isArray(articleLinks.html)) {
                    articleLinks.html = [];
                }
                articleLinks.html.push(...this.initial.articleLinks.html);
            }
            if (Array.isArray(this.initial.articleLinks.urls)) {
                articleLinks.urls.push(...this.initial.articleLinks.urls);
            }
        }
        if (this.retrieve) {
            if (Array.isArray(this.retrieve.articleLinks.fullTextLinks)) {
                articleLinks.fullTextLinks.push(...this.retrieve.articleLinks.fullTextLinks);
            }
            if (Array.isArray(this.retrieve.articleLinks.pdfLinks)) {
                articleLinks.pdfLinks.push(...this.retrieve.articleLinks.pdfLinks);
            }
            if (Array.isArray(this.retrieve.articleLinks.html)) {
                if (!Array.isArray(articleLinks.html)) {
                    articleLinks.html = [];
                }
                articleLinks.html.push(...this.retrieve.articleLinks.html);
            }
            if (Array.isArray(this.retrieve.articleLinks.urls)) {
                articleLinks.urls.push(...this.retrieve.articleLinks.urls);
            }
        }
        return articleLinks;
    };

    public getHref = (): Url | null => {
        const articleLinks = this.getArticleLinks();
        let openAccess = null;
        const fullText = articleLinks.fullTextLinks.find((d) => /lien\(s\) texte intégral/i.test(d.name));
        const unpaywall = articleLinks.urls.find((d) => /unpaywalleds/i.test(d.name));
        if (!unpaywall) {
            openAccess = articleLinks.fullTextLinks.find((d) => /accès en ligne en open access/i.test(d.name));
        }
        const accessUrl = articleLinks.urls.find((d) => /access url|online access/i.test(d.name));
        const availability = articleLinks.urls.find((d) => /availability/i.test(d.name));
        const pdf = articleLinks.pdfLinks.find((d) => !!d.url);
        const html = articleLinks.html ? ({ url: `data:${articleLinks.html}` } as Url) : null;

        return openAccess || unpaywall || fullText || pdf || accessUrl || availability || html;
    };

    public guessSid(url: string) {
        if (url.startsWith('http://arxiv.org/')) {
            return 'arxiv';
        }

        if (url.startsWith('https://doaj.org/')) {
            return 'doaj';
        }

        if (HAL_REGEX.test(url)) {
            return 'hal';
        }

        return null;
    }

    public proxify = (urlObj: Url | null, domain?: string, database = false, isLogged = false) => {
        if (!urlObj) {
            return null;
        }
        let { url } = urlObj;
        const { name } = urlObj;
        let sid = this.guessSid(url);

        if (database) {
            sid = 'bdd';
        }

        if (!sid) {
            if (/open access/i.test(name)) {
                sid = 'oa';
            } else {
                return url;
            }
        }

        let path = 'oa';
        if (database && !isLogged) {
            path = 'oa_database';
        }

        url = encodeURI(url);
        if (url.includes('ebsco/oa')) {
            return url;
        }
        return `${environment.host}/ebsco/${path}?url=${url}&sid=${sid}&domaine=${domain}&doi=${this.getDOI()}`;
    };

    public isOpenAccess = (): boolean => {
        if (this.initial.articleLinks) {
            if (this.initial.articleLinks.urls && this.initial.articleLinks.urls.length > 0) {
                const openAccess = !this.initial.articleLinks.urls[0].url.includes('bib.cnrs.fr');
                if (openAccess) {
                    return true;
                }
            }
        }
        if (this.retrieve) {
            if (this.retrieve.articleLinks) {
                if (this.retrieve.articleLinks.urls && this.retrieve.articleLinks.urls.length > 0) {
                    const openAccess = !this.retrieve.articleLinks.urls[0].url.includes('bib.cnrs.fr');
                    if (openAccess) {
                        return true;
                    }
                }
            }
        }
        return this.isOpenAccessUnpaywall();
    };

    public getAN = (): string => this.initial.an;

    public getDBID = (): string => this.initial.dbId;

    public getDatabase = (): string => this.initial.database;

    public getType = (): string => this.initial.publicationType;

    public getId = (): number => this.initial.id;

    public getExportLink = () => this.initial.exportLinks;

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

    private isOpenAccessUnpaywall = (): boolean => {
        const href = this.getHref();
        if (!href) {
            return false;
        }
        const articleLinks = this.getArticleLinks();
        let openAccess = null;
        const unpaywall = articleLinks.urls.find((d) => /unpaywalleds/i.test(d.name));
        if (!unpaywall) {
            openAccess = articleLinks.fullTextLinks.find((d) => /accès en ligne en open access/i.test(d.name));
        }
        const hrefWithIcon = [openAccess, unpaywall].filter(Boolean);
        return hrefWithIcon.includes(href) || HAL_REGEX.test(href.url);
    };

    private getEntry = (
        name: string,
        label?: string,
    ): Array<RetrieveItemDataType<RetrieveItemValueDataType>> | null => {
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
        if (value === null) {
            return tmp;
        }
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

    private getString = (
        retrieveObj: Array<RetrieveItemDataType<RetrieveItemValueDataType>> | null,
    ): string | undefined => {
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

    private getStringArray = (
        retrieveObj: Array<RetrieveItemDataType<RetrieveItemValueDataType>> | null,
    ): string[] | undefined => {
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

export const retrieveExport = async (links: string[]): Promise<string[]> => {
    const response: Response = await fetch(createQuery(environment.post.retrieve.articleExport), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            links,
        }),
    });
    throwIfNotOk(response);
    return json<string[]>(response);
};
