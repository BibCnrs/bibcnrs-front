import { BibContext } from '../components/internal/provider/ContextProvider';
import { getDomains, getFavouriteResources, updateFavouriteResources } from '../services/user/Session';
import { useContext, useEffect, useState } from 'react';
import type { FavouriteResourceDataType } from './types/data.types';
import type { FacetRequired } from './types/props.types';
import type { FavouriteResourceWithId } from './types/types';
import type { MouseEvent } from 'react';

export const useServicesCatch = () => {
    const { setLogin } = useContext(BibContext);
    return (error: Error) => {
        if (error.cause === '401') {
            setLogin(false);
        }
    };
};

export const useFacetsCleaner = <T extends FacetRequired>() => {
    return (values: T): T => {
        if (values.limiters) {
            for (const key of Object.keys(values.limiters)) {
                if (values.limiters[key] === undefined || values.limiters[key] === false) {
                    delete values.limiters[key];
                }
            }
            if (Object.keys(values.limiters).length === 0) {
                delete values.limiters;
            }
        }
        if (values.facets) {
            for (const key of Object.keys(values.facets)) {
                if (values.facets[key] === undefined || values.facets[key].length === 0) {
                    delete values.facets[key];
                }
            }
            if (Object.keys(values.facets).length === 0) {
                delete values.facets;
            }
        }
        return values;
    };
};

export const useFacetsDomainHandler = () => {
    const { search, setSearch } = useContext(BibContext);
    return (event: MouseEvent<HTMLElement>, field: string | null) => {
        if (field === null) {
            return;
        }
        setSearch({
            ...search,
            domain: field,
        });
    };
};

export const useDomain = (): Array<{ value: string; label: string }> => {
    const { login } = useContext(BibContext);
    if (!login) {
        return [];
    }
    return getDomains().map((domain) => {
        return {
            value: domain,
            label: domain,
        };
    });
};

type UseFavouriteResourcesType = {
    favouriteResources: FavouriteResourceWithId[];
    addFavourite: (entry: FavouriteResourceDataType | FavouriteResourceWithId) => void;
    removeFavourite: (entry: FavouriteResourceDataType | FavouriteResourceWithId) => void;
};
export const useFavouriteResources = (): UseFavouriteResourcesType => {
    const [favourites, setFavourites] = useState<FavouriteResourceDataType[]>(getFavouriteResources());
    const [favouritesWithId, setFavouritesWithId] = useState<FavouriteResourceWithId[]>([]);

    useEffect(() => {
        let index = 1;
        setFavouritesWithId(
            favourites.map((value) => {
                return {
                    id: index++,
                    ...value,
                };
            }),
        );
    }, [favourites]);

    const addFavourite = (entry: FavouriteResourceDataType | FavouriteResourceWithId) => {
        const favouriteResources = getFavouriteResources();
        updateFavouriteResources([
            {
                title: entry.title,
                url: entry.url,
                personal: entry.personal,
            },
            ...favouriteResources,
        ]).then(() => {
            setFavourites(getFavouriteResources());
        });
    };

    const removeFavourite = (entry: FavouriteResourceDataType | FavouriteResourceWithId) => {
        const favouriteResources = getFavouriteResources();
        const filtered = favouriteResources.filter((value) => {
            if (value.title === entry.title) {
                return false;
            }
            return value.url !== entry.url;
        });
        updateFavouriteResources(filtered).then(() => {
            setFavourites(getFavouriteResources());
        });
    };

    return {
        favouriteResources: favouritesWithId,
        addFavourite,
        removeFavourite,
    };
};
