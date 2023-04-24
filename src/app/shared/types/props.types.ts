import { TFunction } from './types';
import { CMSResultDataType, DatabaseDataType, MetadoreResultType } from './data.types';
import { Dispatch, ElementType, Key, PropsWithChildren, PropsWithoutRef, ReactElement, SetStateAction } from 'react';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/material/styles/createTheme';

type HaveReactChildren = PropsWithChildren;

export type SearchBarProps = PropsWithoutRef<{
    placeholder: string;
    value?: string | null;
    onSearch: (value: string) => void;
}>;

export type PageTitleProps = PropsWithoutRef<{
    customTitle?: boolean;
    page?: string;
    t?: TFunction;
}>;

export type TableDisplayElementProps = PropsWithoutRef<{
    key: Key;
    data: MetadoreResultType;
}>;

export type TableArgsProps = PropsWithoutRef<{
    value?: string;
    page?: number;
    perPage?: number;
    field: string | null;
}>;

export type TableProps = PropsWithoutRef<{
    DisplayElement: ElementType<TableDisplayElementProps>;
    results?: any[];
    total?: number;
    args: TableArgsProps;
    setArgs: Dispatch<SetStateAction<TableArgsProps>>;
}>;

export type LocalizedThemeProviderProps = HaveReactChildren;

export type ExceptedErrorProps = HaveReactChildren;

export type ContextProviderProps = HaveReactChildren;

export type PaginationComponentProps = PropsWithoutRef<{
    total: number;
    resultsPerPage?: number;
    currentPage?: number;
    onChange: (currentPage: number, resultParPage: number) => void;
}>;

export type RenderContentProps = PropsWithoutRef<{
    data: CMSResultDataType | undefined;
    updateDocumentTitle?: boolean;
    displayTitle?: boolean;
    page: string;
    showDate?: boolean;
    t: TFunction;
    Container?: ElementType;
}>;

export type PageDateProps = PropsWithoutRef<{
    date: string;
}>;

export type OpenablePaperProps = PropsWithoutRef<{
    Title: ReactElement | null;
    SmallBody: ReactElement | null;
    FullBody: ReactElement | null;
    small?: boolean;
}>;

export type DatabaseDisplayGroupProps = PropsWithoutRef<{
    letter: string;
    data: DatabaseDataType;
    language: string;
}>;

export type AnimatedPaperProps = PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    sx?: SxProps<Theme>;
}>;

export type AlertPaperProps = HaveReactChildren;

export type AuthenticationProps = PropsWithoutRef<{
    open: boolean;
    onClose: () => void;
}>;

export type ProtectedRouteProps = HaveReactChildren;
