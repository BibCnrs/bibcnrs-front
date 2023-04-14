import { translator } from '../../../shared/locales/I18N';
import { headerButtonStyle } from '../Header';
import Button from '@mui/material/Button';

const QuestionsButton = () => {
    const t = translator();
    return (
        <div className="header-nav">
            <Button className="header-button" sx={headerButtonStyle}>
                {t('components.header.questions')}
            </Button>
        </div>
    );
};

export default QuestionsButton;
