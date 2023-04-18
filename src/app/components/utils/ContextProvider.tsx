import { ContextProviderProps } from '../../shared/types/props.types';
import { BibContextType, ThemeType } from '../../shared/types/types';
import { createContext, useEffect, useState } from 'react';

const createIfNotExist = () => {
    if (window.localStorage.getItem('mode') === null) {
        window.localStorage.setItem('mode', 'light');
    }
};

const getStorageTheme = (): ThemeType => {
    const mode = window.localStorage.getItem('mode');
    if (mode === null) {
        createIfNotExist();
        return 'light';
    }
    return mode as ThemeType;
};

const setStorageTheme = (value: ThemeType) => {
    window.localStorage.setItem('mode', value);
};

/* eslint-disable @typescript-eslint/no-empty-function */
export const BibContext = createContext<BibContextType>({
    globalQuery: null,
    setGlobalQuery: () => {},
    login: false,
    setLogin: () => {},
    theme: 'light',
    setTheme: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

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
