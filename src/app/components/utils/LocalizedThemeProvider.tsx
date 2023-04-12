import { getLanguageKey } from '../../shared/locales/I18N';
import { LocalizedThemeProviderProps } from '../../shared/types/props.types';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { frFR } from '@mui/material/locale';
import { enUS } from '@mui/material/locale';

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

    // Create material ui theme
    const theme = createTheme(
        {
            typography: {
                fontFamily: '"DM Sans", sans-serif',
            },
            palette: {
                primary: {
                    main: '#337ab7',
                },
            },
        },
        getLocal(),
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default LocalizedThemeProvider;
