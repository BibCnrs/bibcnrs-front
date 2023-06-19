import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { FavouriteResourceDataType } from '../../shared/types/data.types';

export const updateFavorite = async (userId: number, favorites: FavouriteResourceDataType[]) => {
    const response: Response = await fetch(createQuery(`${environment.put.account.favourite}/${userId}`), {
        credentials: 'include',
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            favouriteResources: favorites,
        }),
    });
    throwIfNotOk(response);
    return json(response);
};
