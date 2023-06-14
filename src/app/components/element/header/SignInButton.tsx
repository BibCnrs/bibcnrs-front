import { useTranslator } from '../../../shared/locales/I18N';
import { BibContext } from '../../internal/provider/ContextProvider';
import { headerButtonStyle } from '../../pages/header/Header';
import Button from '@mui/material/Button';
import { useContext } from 'react';

/**
 * Button component used to sign-in into the application
 */
const SignInButton = () => {
    const { setAskLogin } = useContext(BibContext);
    const t = useTranslator();
    const handleClick = () => {
        setAskLogin(true);
    };

    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={handleClick}>
                {t('components.header.login')}
            </Button>
        </div>
    );
};

export default SignInButton;
