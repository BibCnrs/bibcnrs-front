import { createContext, useEffect, useState } from 'react';
import type { ContextProviderProps } from '../../shared/types/props.types';
import type { SearchContextType } from '../../shared/types/types';
import type { BibContextType, ThemeType } from '../../shared/types/types';

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

/**
 * Provider component which creates application context
 * @param children - Application content
 */
const ContextProvider = ({ children }: ContextProviderProps) => {
    const [login, setLogin] = useState<boolean>(false);
    const [theme, setTheme] = useState<ThemeType>(getStorageTheme());
    const [search, setSearch] = useState<SearchContextType>({
        query: undefined,
        article: {
            orderBy: 'relevance',
            domain: undefined,
            limiters: {
                fullText: true,
            },
            table: {
                page: 1,
                perPage: 25,
            },
        },
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

    return (
        <BibContext.Provider
            value={{
                login,
                setLogin,
                theme,
                setTheme,
                search,
                setSearch,
            }}
        >
            {children}
        </BibContext.Provider>
    );
};

export default ContextProvider;
