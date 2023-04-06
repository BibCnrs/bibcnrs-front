import { CMSResultDataType } from '../../shared/types/data.types';
import { createQuery, environment } from '../Environment';

async function doQuery(page: string): Promise<CMSResultDataType> {
    const response: Response = await fetch(
        createQuery(environment.get.cms, {
            page,
        }),
    );
    return await response.json();
}

export async function home(): Promise<CMSResultDataType> {
    return await doQuery('home');
}

export async function legal(): Promise<CMSResultDataType> {
    return await doQuery('legal');
}

export async function faq(): Promise<CMSResultDataType> {
    return await doQuery('faq');
}
