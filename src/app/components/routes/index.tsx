import { AnchorHTMLAttributes } from 'react';
import CustomLink from '../customlink/CustomLink';

export const Routes = {
    root: '/',
    about: 'about',
    contact: '/contact',
    legal: '/legal',
};

export const RouteRoot = Routes.root;
export function LinkRoot({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteRoot} {...props}>
            {children}
        </CustomLink>
    );
}

export const RouteAbout = Routes.about;
export function LinkAbout({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteAbout} {...props}>
            {children}
        </CustomLink>
    );
}

export const RouteContact = Routes.contact;
export function LinkContact({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteContact} {...props}>
            {children}
        </CustomLink>
    );
}

export const RouteLegal = Routes.legal;
export function LinkLegal({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <CustomLink to={RouteLegal} {...props}>
            {children}
        </CustomLink>
    );
}
