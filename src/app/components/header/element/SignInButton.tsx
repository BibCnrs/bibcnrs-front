import Button from '@mui/material/Button';
import { SignInButtonProps } from '../../../shared/types';

export default function SignInButton(props: SignInButtonProps) {
    const { t } = props;
    return (
        <div>
            <Button id="login">{t('header.login')}</Button>
        </div>
    );
}
