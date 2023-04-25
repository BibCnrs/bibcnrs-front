import { translator } from '../../../shared/locales/I18N';
import { headerButtonStyle } from '../Header';
import { buildLinkClickHandler, RouteFaq } from '../../../shared/Routes';
import Button from '@mui/material/Button';

const FaqButton = () => {
    const t = translator();
    const action = buildLinkClickHandler(RouteFaq);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.questions')}
            </Button>
        </div>
    );
};

export default FaqButton;