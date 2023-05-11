import { createQuery, environment, throwIfNotOk } from '../Environment';
import type { Institute } from '../../shared/types/types';

export type ArticlePayLoad = {
    queries: any[];
    FT?: boolean;
    OA?: boolean;
    RV?: boolean;
    DT1?: string;
    activeFacets?: {
        SourceType: string[];
        SubjectEDS: string[];
        Journal: string[];
        Language: string[];
        RangeLexile: string[];
        CollectionLibrary: string[];
        Publisher: string[];
        ContentProvider: string[];
    };
    sort: 'date' | 'date2' | 'relevance';
    resultsPerPage: number;
};

export const article = async (domain: Institute, payload: ArticlePayLoad) => {
    const response: Response = await fetch(
        createQuery(environment.get.search.article.replace('{domain}', domain), {
            ...payload,
        }),
    );
    throwIfNotOk(response);
};
