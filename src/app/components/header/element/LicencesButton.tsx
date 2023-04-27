import { translator } from '../../../shared/locales/I18N';
import { buildLinkClickHandler, RouteLicences } from '../../../shared/Routes';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';

const LicencesButton = () => {
    const t = translator();
    const action = buildLinkClickHandler(RouteLicences);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.licences')}
            </Button>
        </div>
    );
};

export default LicencesButton;
