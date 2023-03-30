import fr from './common/fr';
import en from './common/en';
import { T } from '../types/types';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

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
    pages: {
        article: {
            title: string;
            searchBar: string;
        };
        journal: {
            title: string;
            searchBar: string;
        };
        database: {
            title: string;
        };
        researchData: {
            title: string;
            searchBar: string;
            content: {
                doi: string;
                doiColon: string;
                type: string;
                publicationYear: string;
                description: string;
                subjects: string;
            };
        };
        about: {
            title: string;
        };
        contact: {
            title: string;
        };
        legal: {
            title: string;
        };
    };
    footer: {
        about: string;
        contact: string;
        legal: string;
    };
    error: {
        return: string;
        '404': Error;
        component: string;
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
export function translator(): T {
    const { t } = useTranslation('common');
    return t;
}

/**
 * export the translation function and the i18n system
 */
export function getFullTranslator() {
    return useTranslation('common');
}

export function getLanguageKey() {
    const { i18n } = getFullTranslator();
    return i18n.language;
}

/**
 * export i18next instance
 */
export default i18next;
