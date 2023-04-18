import { TFunction as TF, TypeOptions } from 'i18next';
import { Dispatch, SetStateAction } from 'react';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type TFunction = TF<FallbackOrNS<string>[]>;

export type SupportedLanguage = {
    key: 'en' | 'fr';
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
