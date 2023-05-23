import { BibContext } from '../components/provider/ContextProvider';
import { useContext } from 'react';

export const useServicesCatch = () => {
    const { setLogin } = useContext(BibContext);
    return (error: Error) => {
        if (error.cause === '401') {
            setLogin(false);
        }
    };
};
