import { i18n, TFunction, TypeOptions } from 'i18next';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type T = TFunction<FallbackOrNS<string>[]>;

export type SearchBarProps = {
    placeholder: string;
    onSearch: (value: string) => void;
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
