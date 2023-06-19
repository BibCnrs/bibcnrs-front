import { BibContext } from '../components/internal/provider/ContextProvider';
import { getDomains, getFavoriteResources, updateFavoriteResources } from '../services/user/Session';
import { useContext, useState } from 'react';
import type { FavouriteResourceDataType } from './types/data.types';
import type { FacetRequired } from './types/props.types';
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

export const useFavoriteResources = () => {
    const [favorites, setFavorites] = useState(getFavoriteResources());
    const addFavorite = (entry: FavouriteResourceDataType) => {
        const favoriteResources = getFavoriteResources();
        updateFavoriteResources([...favoriteResources, entry]).then(() => {
            setFavorites(getFavoriteResources());
        });
    };

    const removeFavorite = (entry: FavouriteResourceDataType) => {
        const favoriteResources = getFavoriteResources();
        const filtered = favoriteResources.filter((value) => {
            if (value.title === entry.title) {
                return false;
            }
            return value.url !== entry.url;
        });
        updateFavoriteResources(filtered).then(() => {
            setFavorites(getFavoriteResources());
        });
    };

    return {
        favoriteResources: favorites,
        addFavorite,
        removeFavorite,
    };
};
