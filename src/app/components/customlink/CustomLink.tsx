import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import './CustomLink.scss';

/**
 * Custom link
 * @param children Children html element
 * @param to Link href
 * @param props Extra props send to the link element
 */
export default function CustomLink({ children, to, ...props }: LinkProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link className="link" style={{ textDecoration: match ? 'underline' : 'none' }} to={to} {...props}>
            {children}
        </Link>
    );
}
