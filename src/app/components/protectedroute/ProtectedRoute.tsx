import { RouteRoot } from '../../shared/Routes';
import Authentication from '../authentication/Authentication';
import { BibContext } from '../provider/ContextProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProtectedRouteProps } from '../../shared/types/props.types';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { login } = useContext(BibContext);
    const navigate = useNavigate();

    return (
        <>
            <Authentication
                open={!login}
                onClose={() => {
                    navigate(RouteRoot);
                }}
            />
            {login ? children : null}
        </>
    );
};

export default ProtectedRoute;
