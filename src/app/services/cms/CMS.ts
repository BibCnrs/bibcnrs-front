import { CMSResultDataType } from '../../shared/types/data.types';
import { createQuery, environment } from '../Environment';

const doQuery = async (page: string): Promise<CMSResultDataType> => {
    const response: Response = await fetch(
        createQuery(environment.get.cms, {
            page,
        }),
    );
    return await response.json();
};

export const home = async (): Promise<CMSResultDataType> => {
    return await doQuery('home');
};

export const legal = async (): Promise<CMSResultDataType> => {
    return await doQuery('legal');
};

export const faq = async (): Promise<CMSResultDataType> => {
    return await doQuery('faq');
};

export const about = async (): Promise<CMSResultDataType> => {
    return await doQuery('about');
};
