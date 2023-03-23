import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import fr from './common/fr';
import en from './common/en';

export type Common = {
    header: {
        title: string;
        login: string;
    };
    footer: {
        about: string;
        contact: string;
        legal: string;
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

export function translator() {
    const { t } = useTranslation('common');
    return t;
}

export function getFullTranslator() {
    return useTranslation('common');
}

export default i18next;
