import { BibContext } from '../provider/ContextProvider';
import Authentication from '../authentication/Authentication';
import { ProtectedRouteProps } from '../../shared/types/props.types';
import { RouteRoot } from '../../shared/Routes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { login } = useContext(BibContext);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        setClose(true);
    };

    useEffect(() => {
        if (close && !login) {
            navigate(RouteRoot);
        }
        setOpen(!login);
    }, [login, open]);

    return (
        <>
            <Authentication open={open} onClose={handleClose} />
            {login ? children : null}
        </>
    );
};

export default ProtectedRoute;
