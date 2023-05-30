import { BibContext } from '../components/provider/ContextProvider';
import { useContext } from 'react';
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
