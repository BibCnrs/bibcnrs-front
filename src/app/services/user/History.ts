import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { ArticleDataType } from '../../shared/types/data.types';
import type { HistoryDataType } from '../../shared/types/data.types';
import type { Institute } from '../../shared/types/types';
import type { ArticleParam } from '../search/Article';
import type { ArticlePayLoad } from '../search/Article';

export const history = async (limit: number, offset: number): Promise<HistoryDataType> => {
    const query = createQuery(environment.get.account.history, {
        limit,
        offset,
    });
    const response: Response = await fetch(query, {
        credentials: 'include',
    });
    throwIfNotOk(response);
    return json<HistoryDataType>(response);
};

export const addHistory = async (
    payload: Partial<ArticlePayLoad>,
    param: ArticleParam,
    domain: Institute,
    result: ArticleDataType,
): Promise<void> => {
    if (!result) {
        return;
    }
    const query = createQuery(environment.post.account.history);

    const limiters: ArticleParam['limiters'] & {
        publicationId: any;
        publicationDate: {
            from: number | null;
            to: number | null;
        };
    } = {
        fullText: false,
        openAccess: false,
        peerReviewed: false,
        publicationDate: {
            from: null,
            to: null,
        },
        publicationId: null,
    };
    Object.assign(limiters, param.limiters);
    if (limiters.dateRange) {
        limiters.publicationDate = limiters.dateRange;
        delete limiters.dateRange;
    }

    const response: Response = await fetch(query, {
        credentials: 'include',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            history: {
                activeFacets: payload.activeFacets ?? {},
                domain,
                limiters,
                queries: payload.queries,
                resultsPerPage: payload.resultsPerPage,
                sort: payload.sort,
                totalHits: result.totalHits,
            },
        }),
    });
    throwIfNotOk(response);
};

export const deleteHistory = async (): Promise<void> => {
    const query = createQuery(environment.delete.account.histories);
    const response: Response = await fetch(query, {
        method: 'DELETE',
        credentials: 'include',
    });
    throwIfNotOk(response);
};

export const deleteHistoryEntry = async (id: number): Promise<void> => {
    const query = createQuery(environment.delete.account.history, {
        id,
    });
    const response: Response = await fetch(query, {
        method: 'DELETE',
        credentials: 'include',
    });
    throwIfNotOk(response);
};
