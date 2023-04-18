import { DatabaseDataType } from '../../shared/types/data.types';
import { createQuery, environment } from '../Environment';

export const database = async (language: string, login: boolean): Promise<DatabaseDataType> => {
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
    return data.filter((value) => {
        if (login) {
            return true;
        }
        return value.oa;
    });
};
