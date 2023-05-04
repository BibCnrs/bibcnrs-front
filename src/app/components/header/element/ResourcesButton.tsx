import { translator } from '../../../shared/locales/I18N';
import { buildLinkClickHandler, RouteResources } from '../../../shared/Routes';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';

/**
 * Button used to go to Ressources page
 */
const ResourcesButton = () => {
    const resources = 't';
    const t = translator();
    const action = buildLinkClickHandler(RouteResources);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.resources')}
                {resources}
            </Button>
        </div>
    );
};

export default ResourcesButton;
