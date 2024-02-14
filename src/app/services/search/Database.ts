import { createQuery, environment, throwIfNotOk } from '../Environment';
import type { DatabaseDataType } from '../../shared/types/data.types';
import type { Institute } from '../../shared/types/types';

export const database = async (
    language: string,
    oa: boolean,
    domain: Institute | undefined,
): Promise<DatabaseDataType> => {
    const response: Response = await fetch(createQuery(environment.get.search.database));
    throwIfNotOk(response);
    const data: DatabaseDataType = await response.json();
    return data
        .sort((a, b) => {
            const nameA = language === 'en' ? a.name_en.toLowerCase() : a.name_fr.toLowerCase();
            const nameB = language === 'en' ? b.name_en.toLowerCase() : b.name_fr.toLowerCase();
            return nameA.localeCompare(nameB, language);
        })
        .filter((value) => {
            if (!oa) {
                return value.domains.includes(domain ?? '') || value.oa;
            }
            return value.oa;
        })
        .map((value) => {
            if (value.use_proxy) {
                return {
                    ...value,
                    // eslint-disable-next-line camelcase
                    url_fr: `https://${domain}.bib.cnrs.fr/login?url=${value.url_fr}`,
                    // eslint-disable-next-line camelcase
                    url_en: `https://${domain}.bib.cnrs.fr/login?url=${value.url_en}`,
                };
            }
            return {
                ...value,
                // eslint-disable-next-line camelcase
                url_fr: `${environment.host}${environment.get.oa.database}?url=${value.url_fr}&sid=bdd&domaine=${domain}&doi=null`,
                // eslint-disable-next-line camelcase
                url_en: `${environment.host}${environment.get.oa.database}?url=${value.url_en}&sid=bdd&domaine=${domain}&doi=null`,
            };
        });
};
