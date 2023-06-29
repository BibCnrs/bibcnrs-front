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
    data.sort((a, b) => {
        const nameA = language === 'en' ? a.name_en.toLowerCase() : a.name_fr.toLowerCase();
        const nameB = language === 'en' ? b.name_en.toLowerCase() : b.name_fr.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return data.filter((value) => {
        if (!oa) {
            return value.domains.includes(domain ?? '') || value.oa;
        }
        return value.oa;
    });
};
