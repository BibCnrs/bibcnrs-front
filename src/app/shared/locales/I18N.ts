import en from './common/en';
import fr from './common/fr';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import type { SupportedLanguages, TFunction } from '../types/types';

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
    ebsco: {
        facets: {
            SubjectEDS: string;
            SourceType: string;
            Journal: string;
            Language: string;
            RangeLexile: string;
            CollectionLibrary: string;
            Publisher: string;
            ContentProvider: string;
        };
        limiters: {
            fullText: string;
            openAccess: string;
            peerReviewedArticle: string;
            publicationDate: string;
        };
    };
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
        dialog: {
            title: {
                alert: string;
                bookmark: string;
            };
            fields: {
                title: string;
                url: string;
            };
            cancel: string;
            save: string;
        };
        nav: {
            article: string;
            publication: string;
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
                term: string;
                domain: string;
                limiters: string;
                facets: string;
                actions: string;
                nbResult: string;
                noAccess: string;
                publisherUrl: string;
                languages: string;
                accessNumber: string;
                dbId: string;
                issnOnline: string;
                issnPrint: string;
                isbnOnline: string;
                isbnPrint: string;
                present: string;
                links: string;
                pdf: string;
                alert: {
                    active: {
                        day: string;
                        week: string;
                        month: string;
                    };
                    disable: string;
                };
            };
        };
        facet: {
            title: string;
            text: string;
            reviewed: string;
            fullText: string;
            openAccess: string;
            date: string;
            source: string;
            subject: string;
            journal: string;
            language: string;
            lexile: string;
            collection: string;
            publisher: string;
            provider: string;
            reset: string;
            type: string;
            chips: {
                title: string;
                description: string;
                subject: string;
                doi: string;
            };
        };
        icon: {
            openAccess: string;
            diamond: string;
        };
        button: {
            favourite: {
                tooltip: string;
            };
        };
        dnd: {
            favourite: {
                open: string;
                delete: string;
            };
        };
        news: {
            from: string;
            to: string;
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
            selectAll: string;
            order: {
                dateAsc: string;
                dateDesc: string;
                relevance: string;
            };
        };
        publication: {
            title: string;
            searchBar: string;
        };
        database: {
            title: string;
            oa: string;
            anonymousMessage: string;
        };
        researchData: {
            title: string;
            search: {
                bar: string;
                chips: {
                    by: string;
                };
            };
        };
        licences: {
            title: string;
            empty: string;
            pdf: string;
        };
        news: {
            title: string;
        };
        tests: {
            title: string;
        };
        history: {
            title: string;
            buttons: {
                delete: string;
                disable: string;
            };
            confirm: {
                delete: string;
            };
        };
        alert: {
            title: string;
        };
        favourite: {
            title: string;
            add: string;
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
 * export the translation function and the i18n system
 */
export const useFullTranslator = () => {
    return useTranslation('common');
};

/**
 * export the translation function
 */
export const useTranslator = (): TFunction => {
    const { t } = useFullTranslator();
    return t;
};

export const useLanguageKey = (): string => {
    const { i18n } = useFullTranslator();
    return i18n.language;
};

export const supportedLanguages: SupportedLanguages = [
    { key: 'fr', label: 'FR - Français' },
    { key: 'en', label: 'EN - English' },
];

/**
 * export i18next instance
 */
export default i18next;
