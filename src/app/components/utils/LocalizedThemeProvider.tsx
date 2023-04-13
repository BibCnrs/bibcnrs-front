import { getLanguageKey } from '../../shared/locales/I18N';
import { LocalizedThemeProviderProps } from '../../shared/types/props.types';
import { getTheme } from '../../shared/Theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { frFR } from '@mui/material/locale';
import { enUS } from '@mui/material/locale';
import createPalette from '@mui/material/styles/createPalette';

/**
 * Utils component use to set up the material ui theme.
 * @param children component parameters containing react children.
 * @see LocalizedThemeProviderProps
 */
const LocalizedThemeProvider = ({ children }: LocalizedThemeProviderProps) => {
    // Get the language key and use it to get the material ui language pack
    const language = getLanguageKey();
    const getLocal = () => {
        if (language === 'en') {
            return enUS;
        }
        return frFR;
    };

    const lightPalette = createPalette({
        mode: 'light',
        primary: {
            main: '#2d7dc3',
        },
    });

    const darkPalette = createPalette({
        mode: 'dark',
        primary: {
            main: '#0050a0',
        },
        background: {
            default: '#151723',
            paper: '#151723',
        },
    });

    // Create material ui theme
    const theme = createTheme(
        {
            typography: {
                fontFamily: '"DM Sans", sans-serif',
            },
            palette: getTheme() === 'dark' ? darkPalette : lightPalette,
        },
        getLocal(),
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default LocalizedThemeProvider;
