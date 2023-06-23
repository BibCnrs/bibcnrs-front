import { useTranslator } from '../../../shared/locales/I18N';
import { useClickHandler, RouteFaq } from '../../../shared/Routes';
import { headerButtonStyle } from '../../page/header/Header';
import Button from '@mui/material/Button';
import { memo } from 'react';

/**
 * Button used to go to Faq page
 */
const FaqButton = () => {
    const t = useTranslator();
    const action = useClickHandler(RouteFaq);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.questions')}
            </Button>
        </div>
    );
};

export default memo(FaqButton);
