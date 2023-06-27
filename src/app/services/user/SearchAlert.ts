import { getToken } from './Session';
import { createQuery, environment, json, throwIfNotOk } from '../Environment';

export const updateAlert = async (userId: number, historyId: number, frequency: string) => {
    const response: Response = await fetch(createQuery(`${environment.put.account.searchAlert}`), {
        credentials: 'include',
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            userId,
            historyId,
            frequence: frequency,
        }),
    });
    throwIfNotOk(response);
    return json(response);
};

export const disableSearchAlert = async (historyId: number) => {
    const response: Response = await fetch(createQuery(`${environment.get.account.disableSearchAlert}/${historyId}`), {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
    throwIfNotOk(response);
    return json(response);
};

export const disableAllSearchAlert = async () => {
    const response: Response = await fetch(createQuery(environment.get.account.disableSearchAlert), {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
    throwIfNotOk(response);
    return json(response);
};
