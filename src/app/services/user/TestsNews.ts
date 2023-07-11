import { getDomains } from './Session';
import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { TestNewDataType } from '../../shared/types/data.types';
import type { TestsNewsDataType } from '../../shared/types/data.types';

export type Pages = 'news' | 'tests';

export const news = async <Page extends Pages>(page: Page): Promise<TestsNewsDataType> => {
    const query = createQuery(environment.get.account.testsNews, {
        domains: getDomains().join(','),
        page,
    });

    const response: Response = await fetch(query, {
        credentials: 'include',
    });

    throwIfNotOk(response);

    return json<TestsNewsDataType>(response);
};

export const newsById = async (id: number): Promise<TestNewDataType> => {
    const query = createQuery(`${environment.get.account.testsNews}/${id}`);

    const response: Response = await fetch(query, {
        credentials: 'include',
    });

    throwIfNotOk(response);

    return json<TestNewDataType>(response);
};
