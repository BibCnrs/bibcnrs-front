import { headerButtonStyle } from '../Header';
import { translator } from '../../../shared/locales/I18N';
import Button from '@mui/material/Button';

const NewsButton = () => {
    const t = translator();
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle}>
                {t('components.header.news')}
            </Button>
        </div>
    );
};

export default NewsButton;
