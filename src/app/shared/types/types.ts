import type { FavouriteResourceDataType } from './data.types';
import type { TableArgsProps } from './props.types';
import type { ArticleParam } from '../../services/search/Article';
import type { PublicationParam } from '../../services/search/Publication';
import type { UniqueIdentifier } from '@dnd-kit/core';
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

export type InstituteLowerCase =
    | 'in2p3'
    | 'inc'
    | 'inee'
    | 'inp'
    | 'ins2i'
    | 'insb'
    | 'inshs'
    | 'insis'
    | 'insmi'
    | 'insu';

export type Institute = Uppercase<InstituteLowerCase> | string;

export type SearchContextType = {
    query: string | undefined;
    domain: Institute | undefined;
    article: ArticleParam & {
        table: TableArgsProps;
    };
    publication: PublicationParam & {
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
    askLogin: boolean;
    setAskLogin: Dispatch<SetStateAction<boolean>>;
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

export type FavouriteResourceWithId = FavouriteResourceDataType & { id: UniqueIdentifier };
