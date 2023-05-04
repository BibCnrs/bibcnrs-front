import { createContext, useEffect, useState } from 'react';
import type { ContextProviderProps } from '../../shared/types/props.types';
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

/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * Application context
 */
export const BibContext = createContext<BibContextType>({
    globalQuery: null,
    setGlobalQuery: () => {},
    login: false,
    setLogin: () => {},
    theme: 'light',
    setTheme: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

/**
 * Provider component which creates application context
 * @param children - Application content
 */
const ContextProvider = ({ children }: ContextProviderProps) => {
    const [globalQuery, setGlobalQuery] = useState<string | null>(null);
    const [login, setLogin] = useState<boolean>(false);
    const [theme, setTheme] = useState<ThemeType>(getStorageTheme());

    useEffect(() => {
        setStorageTheme(theme);
    }, [theme]);

    return (
        <BibContext.Provider
            value={{
                globalQuery,
                setGlobalQuery,
                login,
                setLogin,
                theme,
                setTheme,
            }}
        >
            {children}
        </BibContext.Provider>
    );
};

export default ContextProvider;
