import { useTranslator } from '../../../shared/locales/I18N';
import PageDate from '../PageDate';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import type { TestNewDataType } from '../../../shared/types/data.types';

const TestsNewsFooter = ({
    id,
    from,
    to,
    page,
    showOpenButton = false,
}: Pick<TestNewDataType, 'from' | 'id' | 'page' | 'to'> & { showOpenButton?: boolean }) => {
    const t = useTranslator();

    return (
        <div className="news-footer">
            <div className="news-footer-text">
                <i>
                    {to ? t('components.news.from') : null}
                    <PageDate date={from} />
                    {to ? (
                        <>
                            {t('components.news.to')}
                            <PageDate date={to} />
                        </>
                    ) : null}
                </i>
            </div>
            {showOpenButton ? (
                <div className="news-footer-button">
                    <Button href={`/${page}/${id}`} target="_blank" size="small" rel="noreferrer noopener nofollow">
                        <OpenInNewIcon />
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default TestsNewsFooter;
