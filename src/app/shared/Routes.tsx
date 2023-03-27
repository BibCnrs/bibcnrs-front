import { useHref, useLinkClickHandler, useMatch, useResolvedPath } from 'react-router-dom';
import { To } from '@remix-run/router/history';

/**
 * Export evey route use by the application
 */
export const Routes = {
    root: '/',
    article: '/article',
    journal: '/journal',
    database: '/database',
    researchData: '/research-data',
    about: 'about',
    contact: '/contact',
    legal: '/legal',
};

export function buildLinkClickHandler(to: string) {
    const href = useHref(to);
    const handler = useLinkClickHandler(to);
    return { href, handler };
}

export function isMatching(to: To) {
    const resolved = useResolvedPath(to);
    return useMatch({ path: resolved.pathname, end: true });
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
