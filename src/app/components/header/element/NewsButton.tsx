import { translator } from '../../../shared/locales/I18N';
import { buildLinkClickHandler, RouteNews } from '../../../shared/Routes';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';

/**
 * Button used to go to News page
 */
const NewsButton = () => {
    const t = translator();
    const action = buildLinkClickHandler(RouteNews);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.news')}
            </Button>
        </div>
    );
};

export default NewsButton;
