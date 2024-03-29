import { BibContext } from './ContextProvider';
import { useLanguageKey } from '../../../shared/locales/I18N';
import { frFR } from '@mui/material/locale';
import { enUS } from '@mui/material/locale';
import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { memo, useContext, useEffect } from 'react';
import type { LocalizedThemeProviderProps } from '../../../shared/types/props.types';
import type { InstituteLowerCase } from '../../../shared/types/types';
import type { Institute, ThemeType } from '../../../shared/types/types';
import type { Property } from 'csstype';

/**
 * Application colors
 */
export const colors = {
    white: '#fff',
    grey: '#c0c0d0',
    text: {
        dark: '#cfcfe0',
        light: '#000000DE',
    },
    background: {
        dark: '#151723',
        light: '#eee',
    },
    button: {
        dark: '#0050a0',
        light: '#0050a0',
        hover: {
            dark: '#0f3556',
            light: '#00284b',
        },
        navActive: {
            dark: '#0f3556',
            light: '#fff',
        },
    },
    table: {
        light: '#c0c0d0',
        dark: '#151723',
    },
    cnrs: {
        primary: {
            dark: '#00284b',
            light: '#64c3dc',
        },
        secondary: {
            lightBlue: '#c8e6e6',
            blue: '#2d7dc3',
            darkBlue: '#0050a0',
            cyan: '#2d9bb4',
        },
        institute: {
            insb: '#eb004e',
            inc: '#007faa',
            inee: '#008000',
            inshs: '#b2003c',
            insis: '#f00000',
            insmi: '#007a7c',
            inp: '#0045e5',
            ins2i: '#a800e5',
            in2p3: '#db3a00',
            insu: '#e0009d',
        },
    },
    other: {
        legacy: '#f3ff33',
    },
};

/**
 * Function used to get color associated to an Institute
 * @param institute - The name of the institute
 * @returns - The color of the institute
 */
export const getInstituteColor = (institute: Institute): Property.Color => {
    return colors.cnrs.institute[institute.toLowerCase() as InstituteLowerCase];
};

export const getHeaderBackgroundColor = (theme: ThemeType): Property.Color => {
    return theme === 'light' ? colors.cnrs.secondary.darkBlue : colors.cnrs.primary.dark;
};

/**
 * Function used to update css variables on startup or when the user changes the application theme
 * @param theme - Name of the theme to load
 */
const updateTheme = (theme: ThemeType) => {
    const style = document.documentElement.style;
    style.setProperty('--text', colors.text[theme]);
    style.setProperty('--background', colors.background[theme]);
    style.setProperty('--background-nav', colors.cnrs.primary.dark);
    /*style.setProperty(
        '--background-nav',
        theme === 'light' ? colors.cnrs.secondary.darkBlue : colors.cnrs.primary.dark,
    );*/
    style.setProperty('--link', theme === 'light' ? colors.cnrs.secondary.blue : colors.cnrs.primary.light);
    style.setProperty('--nav-button-active', colors.button.navActive[theme]);
    style.setProperty('--nav-button-hover', colors.button.hover[theme]);
    style.setProperty('--button-background', colors.button[theme]);
    style.setProperty('--button-background-hover', colors.button.hover[theme]);
    style.setProperty('--table-border', colors.table[theme]);
};

/**
 * Utils component used to set up the Material UI theme.
 * @param children - component parameters containing react children.
 */
const LocalizedThemeProvider = ({ children }: LocalizedThemeProviderProps) => {
    // Get the language key and use it to get the material ui language pack
    const language = useLanguageKey();
    const { theme } = useContext(BibContext);

    /**
     * Function used to return a Material UI language object
     * @returns - Material UI language
     *            - Default: French
     */
    const getLocal = () => {
        if (language === 'en') {
            return enUS;
        }
        return frFR;
    };

    // Material UI light theme color palette
    const lightPalette = createPalette({
        mode: 'light',
        primary: {
            main: colors.cnrs.secondary.blue,
        },
    });

    // Material UI dark theme color palette
    const darkPalette = createPalette({
        mode: 'dark',
        primary: {
            main: colors.cnrs.secondary.blue,
        },
        background: {
            default: colors.background.dark,
            paper: colors.background.dark,
        },
    });

    // Create Material UI theme
    const muiTheme = createTheme(
        {
            typography: {
                fontFamily: '"DM Sans", sans-serif',
            },
            palette: theme === 'dark' ? darkPalette : lightPalette,
        },
        getLocal(),
    );

    // Add a hook to 'theme' used to update css variable on theme change
    useEffect(() => {
        updateTheme(theme);
    }, [theme]);

    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default memo(LocalizedThemeProvider);
