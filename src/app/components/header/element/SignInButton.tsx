import { SignInButtonProps } from '../../../shared/types/props.types';
import Button from '@mui/material/Button';

/**
 * Button component use to sign in to the application
 * This button is actually a placeholder
 * @param t
 */
const SignInButton = ({ t }: SignInButtonProps) => {
    return (
        <div>
            <Button id="login">{t('components.header.login')}</Button>
        </div>
    );
};

export default SignInButton;
