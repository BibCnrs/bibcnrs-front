import { useTranslator } from '../../../shared/locales/I18N';
import { useClickHandler, RouteResources } from '../../../shared/Routes';
import { headerButtonStyle } from '../../page/header/Header';
import Button from '@mui/material/Button';
import { memo } from 'react';

/**
 * Button used to go to Ressources page
 */
const ResourcesButton = () => {
    const t = useTranslator();
    const action = useClickHandler(RouteResources);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.resources')}
            </Button>
        </div>
    );
};

export default memo(ResourcesButton);
