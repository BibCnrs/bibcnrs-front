import { getDomains } from './Session';
import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { LicencesDataType } from '../../shared/types/data.types';

export const licences = async (): Promise<LicencesDataType> => {
    const response = await fetch(
        createQuery(environment.get.account.licences, {
            domains: getDomains().join(','),
        }),
        {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    );
    throwIfNotOk(response);
    return json<LicencesDataType>(response);
};
