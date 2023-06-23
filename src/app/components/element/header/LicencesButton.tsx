import { useTranslator } from '../../../shared/locales/I18N';
import { useClickHandler, RouteLicences } from '../../../shared/Routes';
import { headerButtonStyle } from '../../page/header/Header';
import Button from '@mui/material/Button';
import { memo } from 'react';

/**
 * Button used to go to Licences page
 */
const LicencesButton = () => {
    const t = useTranslator();
    const action = useClickHandler(RouteLicences);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.licences')}
            </Button>
        </div>
    );
};

export default memo(LicencesButton);
