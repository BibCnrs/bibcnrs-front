import { translator } from '../../../shared/locales/I18N';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';

const ResourcesButton = () => {
    const t = translator();
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle}>
                {t('components.header.resources')}
            </Button>
        </div>
    );
};

export default ResourcesButton;
