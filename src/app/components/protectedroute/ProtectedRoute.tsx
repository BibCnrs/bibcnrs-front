import { RouteRoot } from '../../shared/Routes';
import { BibContext } from '../provider/ContextProvider';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProtectedRouteProps } from '../../shared/types/props.types';

/**
 * Component which displays authentication modal if the user is not logged-in,
 * and returns the user to the home page if the authentication is canceled
 * @param children - Route content
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { login, askLogin, setAskLogin } = useContext(BibContext);
    const navigate = useNavigate();

    const [first, setFirst] = useState(true);

    useEffect(() => {
        if (first) {
            if (!login && !askLogin) {
                setAskLogin(true);
            }
        } else {
            if (!login && !askLogin) {
                navigate(RouteRoot);
            }
        }
        setFirst(false);
    }, [askLogin, first, login, navigate, setAskLogin]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{login ? children : null}</>;
};

export default ProtectedRoute;
