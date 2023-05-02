import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { HistoryDataType } from '../../shared/types/data.types';

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

export const deleteHistory = async (): Promise<void> => {
    const query = createQuery(environment.delete.account.history);
    const response: Response = await fetch(query, {
        method: 'DELETE',
        credentials: 'include',
    });
    throwIfNotOk(response);
};
