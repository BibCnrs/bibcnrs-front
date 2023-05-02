import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { CMSResultDataType } from '../../shared/types/data.types';

type Pages = 'about' | 'alert' | 'faq' | 'home' | 'legal';

const doQuery = async <Page extends Pages>(page: Page, first = true): Promise<CMSResultDataType> => {
    const query = first
        ? createQuery(environment.get.cms, {
              page,
              first,
          })
        : createQuery(environment.get.cms, {
              page,
          });
    const response: Response = await fetch(query);
    throwIfNotOk(response);
    return json<CMSResultDataType>(response);
};

export const alert = (): Promise<CMSResultDataType> => doQuery('alert');

export const home = (): Promise<CMSResultDataType> => doQuery('home');

export const legal = (): Promise<CMSResultDataType> => doQuery('legal');

export const faq = (): Promise<CMSResultDataType> => doQuery('faq', false);

export const about = (): Promise<CMSResultDataType> => doQuery('about');
