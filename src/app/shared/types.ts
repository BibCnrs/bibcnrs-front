import { i18n, TFunction, TypeOptions } from 'i18next';
import { ElementType, ReactNode } from 'react';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type T = TFunction<FallbackOrNS<string>[]>;

export type SearchBarProps = {
    placeholder: string;
    value?: string | null;
    onSearch: (value: string, disableUrlUpdate: boolean) => void;
};

export type PageTitleProps = {
    page?: string;
    t?: T;
};

export type LocalButtonProps = {
    i18n: i18n;
};

export type SignInButtonProps = {
    t: T;
};

export type TableProps = {
    DisplayElement: ElementType;
    results: any[];
};

export type LocalizedThemeProviderProps = {
    children: ReactNode;
};

export type MetadoreResultTitleType = {
    title: string;
    lang?: string;
};

export type MetadoreResultDescriptionType = {
    descriptionType: string;
    description: string;
    lang?: string;
};

export type MetadoreResultType = {
    id: number;
    doi: string;
    type: string;
    titles: MetadoreResultTitleType[];
    descriptions: MetadoreResultDescriptionType[];
    subjects: string[];
    publicationYear: number;
    url: string;
};

export type MetadoreDataType = {
    results: MetadoreResultType[];
    totalHits: number;
    maxPage: number;
    currentPage: number;
};

export type TableMetadoreProps = {
    data: MetadoreResultType;
};
