import Button from '@mui/material/Button';

export default function SignInButton(props: { t: any }) {
    const { t } = props;
    return (
        <div>
            <Button id="login">{t('header.login')}</Button>
        </div>
    );
}
