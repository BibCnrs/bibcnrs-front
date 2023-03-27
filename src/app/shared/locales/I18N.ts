import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import fr from './common/fr';
import en from './common/en';

/**
 * Type use to localized error message
 */
type Error = {
    title: string;
    message: string;
};

/**
 * Type use to define the data use to localize the application
 */
export type Common = {
    header: {
        title: string;
        login: string;
    };
    nav: {
        article: string;
        journal: string;
        database: string;
        researchData: string;
    };
    footer: {
        about: string;
        contact: string;
        legal: string;
    };
    error: {
        return: string;
        '404': Error;
    };
};

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                common: en,
            },
            fr: {
                common: fr,
            },
        },
    })
    .then();

/**
 * export the translation function
 */
export function translator() {
    const { t } = useTranslation('common');
    return t;
}

/**
 * export the translation function and the i18n system
 */
export function getFullTranslator() {
    return useTranslation('common');
}

/**
 * export i18next instance
 */
export default i18next;
