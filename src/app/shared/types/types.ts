import type { TableArgsProps } from './props.types';
import type { ArticleParam } from '../../services/search/Article';
import type { TFunction as TF, TypeOptions } from 'i18next';
import type { Dispatch, SetStateAction } from 'react';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type TFunction = TF<Array<FallbackOrNS<string>>>;

export type SupportedLanguageKeys = 'en' | 'fr';

export type SupportedLanguage = {
    key: SupportedLanguageKeys;
    label: string;
};

export type SupportedLanguages = SupportedLanguage[];

export type ThemeType = 'dark' | 'light';

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

export type SearchContextType = {
    query: string | undefined;
    article: ArticleParam & {
        domain: Institute | undefined;
        table: TableArgsProps;
    };
    metadore: {
        field: string | null;
        table: TableArgsProps;
    };
};

export type BibContextType = {
    login: boolean;
    setLogin: Dispatch<SetStateAction<boolean>>;
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
    search: SearchContextType;
    setSearch: Dispatch<SetStateAction<SearchContextType>>;
};

export type Url = {
    name: string;
    url: string;
};

export type Url2 = {
    value: string;
    url: string;
};

export type FacetEntry = {
    name: string;
    count: number;
};
