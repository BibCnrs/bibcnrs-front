import { useHref, useLinkClickHandler, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import { To } from '@remix-run/router/history';
import { useMemo } from 'react';
import { NavigateFunction } from 'react-router/dist/lib/hooks';

/**
 * Export evey route use by the application
 */
const Routes = {
    root: '/',
    article: '/article',
    journal: '/journal',
    database: '/database',
    researchData: '/research-data',
    about: '/about',
    contact: '/contact',
    legal: '/legal',
};

export function buildLinkClickHandler(to: string) {
    const href = useHref(to);
    const handler = useLinkClickHandler(to);
    return { href, handler };
}

export function updatePageQueryUrl(route: string, navigate: NavigateFunction, param: any) {
    const query = new URLSearchParams(param);
    navigate(`${route}?${query.toString()}`);
}

export function isMatching(to: To) {
    const resolved = useResolvedPath(to);
    return useMatch({ path: resolved.pathname, end: true });
}

export function useSearchParams(): URLSearchParams {
    const { search } = useLocation();
    return useMemo<URLSearchParams>(() => new URLSearchParams(search), [search]);
}

export function getString(query: URLSearchParams, key: string, fallback: string | undefined) {
    const value = query.get(key);
    if (value === null) {
        return fallback;
    }
    return value;
}

export function getNumber(query: URLSearchParams, key: string, fallback: number | undefined) {
    const value = query.get(key);
    if (value === null) {
        return fallback;
    }
    return parseInt(value, 10);
}

/**
 * Export the root route
 */
export const RouteRoot = Routes.root;

/**
 * Export the article route
 */
export const RouteArticle = Routes.article;

/**
 * Export the journal route
 */
export const RouteJournal = Routes.journal;

/**
 * Export the database route
 */
export const RouteDatabase = Routes.database;

/**
 * Export the research data route
 */
export const RouteResearchData = Routes.researchData;

/**
 * Export the about route
 */
export const RouteAbout = Routes.about;

/**
 * Export the contact route
 */
export const RouteContact = Routes.contact;
/**
 * Export the legal route
 */
export const RouteLegal = Routes.legal;
