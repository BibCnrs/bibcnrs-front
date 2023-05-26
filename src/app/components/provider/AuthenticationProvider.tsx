import { BibContext } from './ContextProvider';
import Authentication from '../authentication/Authentication';
import { useContext } from 'react';
import type { AuthenticationProviderProps } from '../../shared/types/props.types';

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const { login, askLogin, setAskLogin } = useContext(BibContext);
    const isOpen = !login && askLogin;
    console.log(login, askLogin);
    return (
        <>
            <Authentication
                open={isOpen}
                onClose={() => {
                    setAskLogin(false);
                }}
            />
            {children}
        </>
    );
};

export default AuthenticationProvider;
