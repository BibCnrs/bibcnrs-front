import { useMemo } from 'react';
import { useHref, useLinkClickHandler, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import type { To } from '@remix-run/router/history';
import type { NavigateFunction } from 'react-router/dist/lib/hooks';

/**
 * Export evey route use by the application
 */
const Routes = {
    root: '/',
    /* Search engine route */
    article: '/article',
    publication: '/publication',
    database: '/database',
    researchData: '/research-data',
    /* Information route */
    faq: '/faq',
    about: '/about',
    legal: '/legal',
    resources: '/resources',
    /* Domain route */
    tests: '/tests',
    news: '/news',
    licences: '/licences',
    /* Account specific route */
    history: '/account/history',
    alert: '/account/alert',
    favourite: '/account/favourite',
} as const;

type RoutesT = typeof Routes;

export type RoutesType = RoutesT[keyof RoutesT];

const cleanupParam = (paramIn: any): any => {
    const param: any = {};
    for (const [key, value] of Object.entries(paramIn)) {
        if (value !== null) {
            param[key] = value;
        }
    }
    return param;
};

export const useClickHandler = <Route extends RoutesType>(to: Route) => {
    const href = useHref(to);
    const handler = useLinkClickHandler(to);
    return { href, handler };
};

export const updatePageQueryUrl = (route: string, navigate: NavigateFunction, paramIn: any) => {
    const param = cleanupParam(paramIn);
    const query = new URLSearchParams(param);
    navigate(`${route}?${query.toString()}`);
};

export const useIsMatching = (to: To) => {
    const resolved = useResolvedPath(to);
    return useMatch({ path: resolved.pathname, end: true });
};

export const useSearchParams = (): URLSearchParams => {
    const { search } = useLocation();
    return useMemo<URLSearchParams>(() => new URLSearchParams(search), [search]);
};

export const getString = <Extend>(query: URLSearchParams, key: string, fallback: Extend | string): Extend | string => {
    const value = query.get(key);
    if (value === null) {
        return fallback;
    }
    return value;
};

export const getNumber = (query: URLSearchParams, key: string, fallback: number | undefined) => {
    const value = query.get(key);
    if (value === null) {
        return fallback;
    }
    return parseInt(value, 10);
};

export const getJSON = (query: URLSearchParams, key: string, fallback: any | undefined): any | undefined => {
    const value = query.get(key);
    if (value === null) {
        return fallback;
    }
    return JSON.parse(value);
};

export const RouteRoot = Routes.root;
export const RouteArticle = Routes.article;
export const RoutePublication = Routes.publication;
export const RouteDatabase = Routes.database;
export const RouteResearchData = Routes.researchData;
export const RouteFaq = Routes.faq;
export const RouteResources = Routes.resources;
export const RouteAbout = Routes.about;
export const RouteLegal = Routes.legal;
export const RouteLicences = Routes.licences;
export const RouteTests = Routes.tests;
export const RouteNews = Routes.news;
export const RouteHistory = Routes.history;
export const RouteAlert = Routes.alert;
export const RouteFavourite = Routes.favourite;
