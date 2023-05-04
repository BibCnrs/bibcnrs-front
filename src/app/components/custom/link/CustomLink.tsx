import './CustomLink.scss';
import { isMatching } from '../../../shared/Routes';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

/**
 * Custom link component used to make an element clickable and uses React router link
 * @param children - Children html element
 * @param to       - Link href
 * @param props    - Extra props sent to the link element
 */
const CustomLink = ({ children, to, ...props }: LinkProps) => {
    return (
        <Link
            className="custom-link"
            style={{ textDecoration: isMatching(to) ? 'underline' : 'none' }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
