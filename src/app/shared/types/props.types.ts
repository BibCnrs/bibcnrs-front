import { TFunction } from './types';
import { CMSResultDataType, MetadoreResultType } from './data.types';
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
    t?: TFunction;
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
};

export type LocalizedThemeProviderProps = HaveReactChildren;

export type ExceptedErrorProps = HaveReactChildren;

export type ContextProviderProps = HaveReactChildren;

export type PaginationComponentProps = {
    total: number;
    resultsPerPage?: number;
    currentPage?: number;
    onChange: (currentPage: number, resultParPage: number) => void;
};

export type RenderContentProps = {
    data: CMSResultDataType | undefined;
    updateDocumentTitle: boolean;
    displayTitle: boolean;
    page: string;
    showDate: boolean;
    t: TFunction;
};

export type PageDateProps = {
    date: string;
};
