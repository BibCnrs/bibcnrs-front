import { headerButtonStyle } from '../Header';
import { BibContext } from '../../utils/ContextProvider';
import { translator } from '../../../shared/locales/I18N';
import Button from '@mui/material/Button';
import { useContext } from 'react';

/**
 * Button component use to sign in to the application
 * This button is actually a placeholder
 */
const SignInButton = () => {
    const t = translator();
    const { setLogin } = useContext(BibContext);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={() => setLogin(true)}>
                {t('components.header.login')}
            </Button>
        </div>
    );
};

export default SignInButton;
