import { CMSResultDataType } from '../../shared/types/data.types';
import { createQuery, environment } from '../Environment';

type Pages = 'home' | 'legal' | 'faq' | 'about';

const doQuery = async <Page extends Pages>(page: Page): Promise<CMSResultDataType> => {
    const response: Response = await fetch(
        createQuery(environment.get.cms, {
            page,
        }),
    );
    return await response.json();
};

export const home = (): Promise<CMSResultDataType> => doQuery('home');

export const legal = (): Promise<CMSResultDataType> => doQuery('legal');

export const faq = (): Promise<CMSResultDataType> => doQuery('faq');

export const about = (): Promise<CMSResultDataType> => doQuery('about');
