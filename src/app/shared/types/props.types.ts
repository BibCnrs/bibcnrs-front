import { i18n } from 'i18next';
import {Dispatch, ElementType, Key, ReactNode, SetStateAction} from 'react';
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

export type TableArgsProps = {
    value: string;
    page: number;
    perPage: number;
    disableUrlUpdate: boolean;
};

export type TableProps = {
    DisplayElement: ElementType<TableDisplayElementProps>;
    results?: any[];
    total?: number;
    args: TableArgsProps;
    setArgs: Dispatch<SetStateAction<TableArgsProps>>;
    t: T;
};

export type LocalizedThemeProviderProps = HaveReactChildren;

export type ExceptedErrorProps = HaveReactChildren;

export type PaginationComponentProps = {
    total: number;
    resultParPage: number;
    currentPage: number;
    onChange: (currentPage: number, resultParPage: number) => void;
};
