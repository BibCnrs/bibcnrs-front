import { getDomains, getFavouriteDomain } from '../../../services/user/Session';
import { createContext, useEffect, useState } from 'react';
import type { ContextProviderProps } from '../../../shared/types/props.types';
import type { SearchContextType } from '../../../shared/types/types';
import type { BibContextType, ThemeType } from '../../../shared/types/types';

/**
 * Function used to store the theme use by the user
 * @param value - Theme name
 */
const setStorageTheme = (value: ThemeType) => {
    window.localStorage.setItem('mode', value);
};

/**
 * Function used to get theme from local storage
 * @returns - Returns the value from local storage if present or 'light' as fallback
 */
const getStorageTheme = (): ThemeType => {
    const mode = window.localStorage.getItem('mode');
    if (mode === null) {
        setStorageTheme('light');
        return 'light';
    }
    return mode as ThemeType;
};

/**
 * Application context
 */
export const BibContext = createContext<BibContextType>(null as any);

export const BibContextArticleDefault: SearchContextType['article'] = {
    orderBy: 'relevance',
    limiters: {
        fullText: true,
    },
    table: {
        page: 1,
        perPage: 25,
    },
};

export const BibContextPublicationDefault: SearchContextType['publication'] = {
    table: {
        page: 1,
        perPage: 25,
    },
};

/**
 * Provider component which creates application context
 * @param children - Application content
 */
const ContextProvider = ({ children }: ContextProviderProps) => {
    const [login, setLogin] = useState<boolean>(false);
    const [askLogin, setAskLogin] = useState<boolean>(false);
    const [theme, setTheme] = useState<ThemeType>(getStorageTheme());
    const [search, setSearch] = useState<SearchContextType>({
        query: undefined,
        domain: undefined,
        article: BibContextArticleDefault,
        publication: BibContextPublicationDefault,
        metadore: {
            field: null,
            table: {
                page: 1,
                perPage: 25,
            },
        },
    });

    useEffect(() => {
        setStorageTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (login && search.domain === undefined) {
            let domain = getFavouriteDomain();
            if (domain === undefined) {
                const domains = getDomains();
                if (domains === undefined || domains.length === 0) {
                    throw new Error(`No domain found for this user: ${getFavouriteDomain()}, ${domains}`);
                }
                domain = domains[0];
            }
            setSearch({
                ...search,
                domain,
            });
        }
    }, [login, search]);

    return (
        <BibContext.Provider
            value={{
                login,
                setLogin,
                theme,
                setTheme,
                search,
                setSearch,
                askLogin,
                setAskLogin,
            }}
        >
            {children}
        </BibContext.Provider>
    );
};

export default ContextProvider;
