import { TFunction as TF, TypeOptions } from 'i18next';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type TFunction = TF<FallbackOrNS<string>[]>;

export type SupportedLanguage = {
    key: 'en' | 'fr';
    label: string;
};

export type SupportedLanguages = SupportedLanguage[];
