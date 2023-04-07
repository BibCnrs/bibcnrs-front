import { T } from './types';
import {CMSResultDataType, MetadoreResultType} from './data.types';
import { i18n } from 'i18next';
import { Dispatch, ElementType, Key, ReactNode, SetStateAction } from 'react';

type HaveReactChildren = {
    children: ReactNode;
};

export type SearchBarProps = {
    placeholder: string;
    value?: string | null;
    onSearch: (value: string) => void;
};

export type PageTitleProps = {
    customTitle?: boolean;
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
    value?: string;
    page?: number;
    perPage?: number;
    field: string | null;
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
    resultParPage?: number;
    currentPage?: number;
    onChange: (currentPage: number, resultParPage: number) => void;
};

export type RenderContentProps = {
    data: CMSResultDataType | undefined;
    updateDocumentTitle: boolean;
    displayTitle: boolean;
    page: string;
    t: T;
    showDate: boolean;
};

export type PageDateProps = {
    date: string;
    t: T;
};
