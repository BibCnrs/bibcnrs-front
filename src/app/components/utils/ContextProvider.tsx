import { ContextProviderProps } from '../../shared/types/props.types';
import { createContext, useState } from 'react';

export const BibContext = createContext<any>(null);

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [globalQuery, setGlobalQuery] = useState<string | null>(null);
    const [login, setLogin] = useState<boolean>(false);

    return (
        <BibContext.Provider
            value={{
                globalQuery,
                setGlobalQuery,
                login,
                setLogin,
            }}
        >
            {children}
        </BibContext.Provider>
    );
};

export default ContextProvider;
