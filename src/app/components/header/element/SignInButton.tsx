import { SignInButtonProps } from '../../../shared/types/props.types';
import Button from '@mui/material/Button';

export default function SignInButton(props: SignInButtonProps) {
    const { t } = props;
    return (
        <div>
            <Button id="login">{t('header.login')}</Button>
        </div>
    );
}
