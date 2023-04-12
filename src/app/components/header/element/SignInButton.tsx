import { SignInButtonProps } from '../../../shared/types/props.types';
import { BibContext } from '../../utils/ContextProvider';
import Button from '@mui/material/Button';
import { useContext } from 'react';

/**
 * Button component use to sign in to the application
 * This button is actually a placeholder
 * @param props
 * @constructor
 */
export default function SignInButton(props: SignInButtonProps) {
    const { t } = props;
    const { setLogin } = useContext(BibContext);
    return (
        <div className="header-nav">
            <Button className="header-button" onClick={() => setLogin(true)}>
                {t('components.header.login')}
            </Button>
        </div>
    );
}
