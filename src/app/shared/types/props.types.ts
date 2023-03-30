import { i18n } from 'i18next';
import { ElementType, Key, ReactNode } from 'react';
import { T } from './types';
import { MetadoreResultType } from './data.types';

type HaveReactChildren = {
    children: ReactNode;
};

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

export type TableDisplayElementProps = {
    key: Key;
    data: MetadoreResultType;
};

export type TableProps = {
    DisplayElement: ElementType<TableDisplayElementProps>;
    results: any[];
};

export type LocalizedThemeProviderProps = HaveReactChildren;

export type ExceptedErrorProps = HaveReactChildren;
