import { createQuery, environment } from '../Environment';
import type { HistoryDataType } from '../../shared/types/data.types';

export const history = async (limit: number, offset: number): Promise<HistoryDataType> => {
    const query = createQuery(environment.get.account.history, {
        limit,
        offset,
    });
    const response: Response = await fetch(query, {
        credentials: 'include',
    });
    return response.json();
};
