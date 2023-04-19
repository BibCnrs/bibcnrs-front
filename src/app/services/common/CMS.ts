import { CMSResultDataType } from '../../shared/types/data.types';
import { createQuery, environment } from '../Environment';

type Pages = 'home' | 'legal' | 'faq' | 'about' | 'alert';

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
    return await response.json();
};

export const alert = (): Promise<CMSResultDataType> => doQuery('alert');

export const home = (): Promise<CMSResultDataType> => doQuery('home');

export const legal = (): Promise<CMSResultDataType> => doQuery('legal');

export const faq = (): Promise<CMSResultDataType> => doQuery('faq', false);

export const about = (): Promise<CMSResultDataType> => doQuery('about');
