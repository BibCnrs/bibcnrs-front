import { getFullTranslator } from '../../shared/locales/I18N';
import { LocalizedThemeProviderProps } from '../../shared/types/props.types';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { frFR } from '@mui/material/locale';
import { enUS } from '@mui/material/locale';

export default function LocalizedThemeProvider(props: LocalizedThemeProviderProps) {
    const { i18n } = getFullTranslator();
    const getLocal = () => {
        if (i18n.language === 'en') {
            return enUS;
        }
        return frFR;
    };

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

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
