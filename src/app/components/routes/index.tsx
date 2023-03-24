import { AnchorHTMLAttributes } from 'react';
import CustomLink from '../customlink/CustomLink';

/**
 * Export evey route use by the application
 */
export const Routes = {
    root: '/',
    about: 'about',
    contact: '/contact',
    legal: '/legal',
};

/**
 * Export the root route
 */
export const RouteRoot = Routes.root;
/**
 * Export a custom link us to navigate to the root route
 * @param children Children html element
 * @param props Extra props send to the link element
 */
export function LinkRoot({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteRoot} {...props}>
            {children}
        </CustomLink>
    );
}

/**
 * Export the about route
 */
export const RouteAbout = Routes.about;
/**
 * Export a custom link us to navigate to the about route
 * @param children Children html element
 * @param props Extra props send to the link element
 */
export function LinkAbout({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteAbout} {...props}>
            {children}
        </CustomLink>
    );
}

/**
 * Export the contact route
 */
export const RouteContact = Routes.contact;
/**
 * Export a custom link us to navigate to the contact route
 * @param children Children html element
 * @param props Extra props send to the link element
 */
export function LinkContact({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteContact} {...props}>
            {children}
        </CustomLink>
    );
}

/**
 * Export the legal route
 */
export const RouteLegal = Routes.legal;
/**
 * Export a custom link us to navigate to the legal route
 * @param children Children html element
 * @param props Extra props send to the link element
 */
export function LinkLegal({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteLegal} {...props}>
            {children}
        </CustomLink>
    );
}
