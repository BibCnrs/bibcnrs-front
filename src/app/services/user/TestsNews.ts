import { getDomains } from './Session';
import { TestsNewsDataType } from '../../shared/types/data.types';
import { createQuery, environment } from '../Environment';

type Pages = 'tests' | 'news';

const doQuery = async <Page extends Pages>(page: Page): Promise<TestsNewsDataType> => {
    const query = createQuery(environment.get.account.testsNews, {
        domains: getDomains().join(','),
        page,
    });
    const response: Response = await fetch(query, {
        credentials: 'include',
    });
    return response.json();
};

export const tests = (): Promise<TestsNewsDataType> => doQuery('tests');
export const news = (): Promise<TestsNewsDataType> => doQuery('news');
