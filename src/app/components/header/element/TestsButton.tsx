import { useTranslator } from '../../../shared/locales/I18N';
import { useClickHandler, RouteTests } from '../../../shared/Routes';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';

/**
 * Button used to go to Tests page
 */
const TestsButton = () => {
    const t = useTranslator();
    const action = useClickHandler(RouteTests);
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle} onClick={action.handler} href={action.href}>
                {t('components.header.tests')}
            </Button>
        </div>
    );
};

export default TestsButton;
