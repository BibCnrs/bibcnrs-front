import { useHref, useLinkClickHandler } from 'react-router-dom';

/**
 * Export evey route use by the application
 */
export const Routes = {
    root: '/',
    about: 'about',
    contact: '/contact',
    legal: '/legal',
};

export function buildLinkClickHandler(to: string) {
    const href = useHref(to);
    const handler = useLinkClickHandler(to);
    return { href, handler };
}

/**
 * Export the root route
 */
export const RouteRoot = Routes.root;

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
