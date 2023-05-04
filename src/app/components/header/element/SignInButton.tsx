import { translator } from '../../../shared/locales/I18N';
import Authentication from '../../authentication/Authentication';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';
import { useState } from 'react';

/**
 * Button component used to sign-in into the application
 */
const SignInButton = () => {
    const t = translator();
    // State used to display the authentication modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={handleOpen}>
                {t('components.header.login')}
            </Button>
            <Authentication open={open} onClose={handleClose} />
        </div>
    );
};

export default SignInButton;
