import { BibContext } from '../../provider/ContextProvider';
import { translator } from '../../../shared/locales/I18N';
import { headerButtonStyle } from '../Header';
import Authentication from '../../authentication/Authentication';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';

/**
 * Button component use to sign in to the application
 * This button is actually a placeholder
 */
const SignInButton = () => {
    const t = translator();
    const { setLogin } = useContext(BibContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={handleOpen}>
                {t('components.header.login')}
            </Button>
            {/* TODO: To remove when authentication is finished */}
            <Button className="header-button" sx={headerButtonStyle} onClick={() => setLogin(true)}>
                FakeLogin
            </Button>
            <Authentication open={open} onClose={handleClose} />
        </div>
    );
};

export default SignInButton;
