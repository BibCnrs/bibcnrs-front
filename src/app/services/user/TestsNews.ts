import { getDomains } from './Session';
import { createQuery, environment, json } from '../Environment';
import type { TestsNewsDataType } from '../../shared/types/data.types';

type Pages = 'news' | 'tests';

const doQuery = async <Page extends Pages>(page: Page): Promise<TestsNewsDataType> => {
    const query = createQuery(environment.get.account.testsNews, {
        domains: getDomains().join(','),
        page,
    });
    const response: Response = await fetch(query, {
        credentials: 'include',
    });
    return json<TestsNewsDataType>(response);
};

export const tests = (): Promise<TestsNewsDataType> => doQuery('tests');
export const news = (): Promise<TestsNewsDataType> => doQuery('news');
