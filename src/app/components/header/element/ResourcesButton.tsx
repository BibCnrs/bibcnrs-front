import { translator } from '../../../shared/locales/I18N';
import { headerButtonStyle } from '../Header';
import { buildLinkClickHandler, RouteResources } from '../../../shared/Routes';
import Button from '@mui/material/Button';

const ResourcesButton = () => {
    const t = translator();
    const action = buildLinkClickHandler(RouteResources);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.resources')}
            </Button>
        </div>
    );
};

export default ResourcesButton;
