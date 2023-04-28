import { BibContext } from './ContextProvider';
import { getLanguageKey } from '../../shared/locales/I18N';
import { frFR } from '@mui/material/locale';
import { enUS } from '@mui/material/locale';
import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useContext, useEffect } from 'react';
import type { LocalizedThemeProviderProps } from '../../shared/types/props.types';
import type { Institute, ThemeType } from '../../shared/types/types';
import type { Property } from 'csstype';

export const colors = {
    white: '#fff',
    text: {
        dark: '#cfcfe0',
        light: '#000000DE',
    },
    background: {
        dark: '#151723',
        light: '#eee',
    },
    nav: {
        hover: {
            dark: '#0f3556',
            light: '#00284b',
        },
        active: {
            dark: '#0f3556',
            light: '#fff',
        },
    },
    button: {
        dark: '#00284b',
        light: '#0050a0',
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

export const getInstituteColor = (institute: Institute | string): Property.Color => {
    return colors.cnrs.institute[institute.toLowerCase() as Institute];
};

const updateTheme = (theme: ThemeType) => {
    const style = document.documentElement.style;
    style.setProperty('--text', colors.text[theme]);
    style.setProperty('--background', colors.background[theme]);
    style.setProperty(
        '--background-nav',
        theme === 'light' ? colors.cnrs.secondary.darkBlue : colors.cnrs.primary.dark,
    );
    style.setProperty('--link', theme === 'light' ? colors.cnrs.secondary.blue : colors.cnrs.primary.light);
    style.setProperty('--nav-button-active', colors.nav.active[theme]);
    style.setProperty('--nav-button-hover', colors.nav.hover[theme]);
    style.setProperty('--button-background', colors.button[theme]);
    style.setProperty('--table-border', colors.table[theme]);
};

/**
 * Utils component use to set up the material ui theme.
 * @param children component parameters containing react children.
 * @see LocalizedThemeProviderProps
 */
const LocalizedThemeProvider = ({ children }: LocalizedThemeProviderProps) => {
    // Get the language key and use it to get the material ui language pack
    const language = getLanguageKey();
    const { theme } = useContext(BibContext);
    const getLocal = () => {
        if (language === 'en') {
            return enUS;
        }
        return frFR;
    };

    const lightPalette = createPalette({
        mode: 'light',
        primary: {
            main: colors.cnrs.secondary.blue,
        },
    });

    const darkPalette = createPalette({
        mode: 'dark',
        primary: {
            main: colors.cnrs.secondary.darkBlue,
        },
        background: {
            default: colors.background.dark,
            paper: colors.background.dark,
        },
    });

    // Create material ui theme
    const muiTheme = createTheme(
        {
            typography: {
                fontFamily: '"DM Sans", sans-serif',
            },
            palette: theme === 'dark' ? darkPalette : lightPalette,
        },
        getLocal(),
    );

    useEffect(() => {
        updateTheme(theme);
    }, [theme]);

    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default LocalizedThemeProvider;
