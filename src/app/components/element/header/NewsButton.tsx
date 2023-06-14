import { useTranslator } from '../../../shared/locales/I18N';
import { useClickHandler, RouteNews } from '../../../shared/Routes';
import { headerButtonStyle } from '../../pages/header/Header';
import Button from '@mui/material/Button';

/**
 * Button used to go to News page
 */
const NewsButton = () => {
    const t = useTranslator();
    const action = useClickHandler(RouteNews);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.news')}
            </Button>
        </div>
    );
};

export default NewsButton;
