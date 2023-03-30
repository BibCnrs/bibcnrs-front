import { TFunction, TypeOptions } from 'i18next';

type Resources = TypeOptions['resources'];

type FallbackOrNS<F, T = keyof Resources> = [T] extends [never] ? F : T;

export type T = TFunction<FallbackOrNS<string>[]>;
