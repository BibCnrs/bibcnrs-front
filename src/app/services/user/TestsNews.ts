import { getDomains, getFavoriteDomain } from './Session';
import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { TestsNewsDataType } from '../../shared/types/data.types';
import type { Institute } from '../../shared/types/types';

type Pages = 'news' | 'tests';

const doQuery = async <Page extends Pages>(page: Page, domain?: Institute): Promise<TestsNewsDataType> => {
    const query = createQuery(environment.get.account.testsNews, {
        domains: getDomains().join(','),
        page,
    });

    const response: Response = await fetch(query, {
        credentials: 'include',
    });

    throwIfNotOk(response);

    const results = await json<TestsNewsDataType>(response);

    let fallback = getFavoriteDomain();
    if (!fallback) {
        if (getDomains().length > 0) {
            fallback = getDomains()[0];
        }
        fallback = '';
    }

    return results.filter((result) => result.domains.includes(domain ?? (fallback as string)));
};

export const tests = (domain?: Institute): Promise<TestsNewsDataType> => doQuery('tests', domain);

export const news = (domain?: Institute): Promise<TestsNewsDataType> => doQuery('news', domain);
