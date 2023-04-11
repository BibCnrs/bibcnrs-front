import { SignInButtonProps } from '../../../shared/types/props.types';
import Button from '@mui/material/Button';

/**
 * Button component use to sign in to the application
 * This button is actually a placeholder
 * @param props
 * @constructor
 */
export default function SignInButton(props: SignInButtonProps) {
    const { t } = props;
    return (
        <div>
            <Button id="login">{t('components.header.login')}</Button>
        </div>
    );
}
