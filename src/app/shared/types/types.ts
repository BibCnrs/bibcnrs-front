import type { TFunction as TF, TypeOptions } from 'i18next';
import type { Dispatch, SetStateAction } from 'react';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type TFunction = TF<FallbackOrNS<string>[]>;

export type SupportedLanguageKeys = 'en' | 'fr';

export type SupportedLanguage = {
    key: SupportedLanguageKeys;
    label: string;
};

export type SupportedLanguages = SupportedLanguage[];

export type ThemeType = 'light' | 'dark';

export type BibContextType = {
    globalQuery: string | null;
    setGlobalQuery: Dispatch<SetStateAction<string | null>>;
    login: boolean;
    setLogin: Dispatch<SetStateAction<boolean>>;
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
};

// eslint-disable-next-line no-shadow
export enum Institute {
    insb = 'insb',
    inc = 'inc',
    inee = 'inee',
    inshs = 'inshs',
    insis = 'insis',
    insmi = 'insmi',
    inp = 'inp',
    ins2i = 'ins2i',
    in2p3 = 'in2p3',
    insu = 'insu',
}
