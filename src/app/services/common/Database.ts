import { createQuery, environment } from '../Environment';
import { getDomains } from '../user/Session';
import type { DatabaseDataType } from '../../shared/types/data.types';

export const database = async (language: string, oa: boolean): Promise<DatabaseDataType> => {
    const response: Response = await fetch(createQuery(environment.get.database));
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
    const domains = getDomains();
    return data.filter((value) => {
        if (!oa) {
            return value.domains.filter((domain) => domains.includes(domain)).length > 0 || value.oa;
        }
        return value.oa;
    });
};
