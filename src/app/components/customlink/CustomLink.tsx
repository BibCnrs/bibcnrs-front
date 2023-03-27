import { Link, LinkProps } from 'react-router-dom';
import './CustomLink.scss';
import { isMatching } from '../../shared/Routes';

/**
 * Custom link
 * @param children Children html element
 * @param to Link href
 * @param props Extra props send to the link element
 */
export default function CustomLink({ children, to, ...props }: LinkProps) {
    return (
        <Link className="link" style={{ textDecoration: isMatching(to) ? 'underline' : 'none' }} to={to} {...props}>
            {children}
        </Link>
    );
}
