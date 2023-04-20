import './CustomLink.scss';
import { isMatching } from '../../shared/Routes';
import { Link, LinkProps } from 'react-router-dom';

/**
 * Custom link component use make an element clickable and use React router link
 * @param children Children html element
 * @param to Link href
 * @param props Extra props send to the link element
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
