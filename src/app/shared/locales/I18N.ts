import fr from './common/fr';
import en from './common/en';
import { SupportedLanguages, TFunction } from '../types/types';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

/**
 * Type use to a localized error message
 */
type Error = {
    title: string;
    message: string;
};

/**
 * Type use to define the data use to localize the application
 */
export type Common = {
    components: {
        header: {
            title: string;
            login: string;
            logout: string;
            questions: string;
            resources: string;
            licences: string;
            tests: string;
            news: string;
            user: {
                history: string;
                bookmark: string;
                notifications: string;
                legacy: string;
            };
        };
        authentication: {
            title: string;
            info: string;
            mode: string;
            janus: {
                button: string;
                tooltip: string;
                ask: string;
            };
            legacy: {
                button: string;
                username: string;
                password: string;
                login: string;
                error: string;
            };
            contact: string;
        };
        nav: {
            article: string;
            journal: string;
            database: string;
            researchData: string;
        };
        table: {
            noData: string;
            content: {
                doi: string;
                doiColon: string;
                type: string;
                publicationYear: string;
                description: string;
                subjects: string;
            };
        };
        pageDate: {
            updateAt: string;
        };
        footer: {
            about: string;
            contact: string;
            legal: string;
            mail: {
                subject: string;
                body: string;
            };
        };
    };
    pages: {
        root: {
            title: string;
        };
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
            oa: string;
        };
        researchData: {
            title: string;
            search: {
                bar: string;
                chips: {
                    by: string;
                    title: string;
                    description: string;
                    subject: string;
                    doi: string;
                };
            };
        };
        licences: {
            title: string;
            empty: string;
            pdf: string;
        };
        faq: {
            title: string;
        };
        resources: {
            title: string;
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
    });

/**
 * export the translation function
 */
export const translator = (): TFunction => {
    const { t } = useTranslation('common');
    return t;
};

/**
 * export the translation function and the i18n system
 */
export const getFullTranslator = () => {
    return useTranslation('common');
};

export const getLanguageKey = () => {
    const { i18n } = getFullTranslator();
    return i18n.language;
};

export const supportedLanguages: SupportedLanguages = [
    { key: 'en', label: 'English' },
    { key: 'fr', label: 'Français' },
];

/**
 * export i18next instance
 */
export default i18next;
