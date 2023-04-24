import { BibContext } from '../provider/ContextProvider';
import Authentication from '../authentication/Authentication';
import { ProtectedRouteProps } from '../../shared/types/props.types';
import { useContext, useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { login } = useContext(BibContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
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
