import Button from '@mui/material/Button';
import './NavBar.scss';
import { translator } from '../../locales/I18N';
import { buildLinkClickHandler } from '../../shared/Routes';

export default function NavBar(props: { pageIndex: number }) {
    const index = props.pageIndex;
    const article = buildLinkClickHandler('/about');
    const journal = buildLinkClickHandler('/about');
    const database = buildLinkClickHandler('/about');
    const researchData = buildLinkClickHandler('/about');
    const t = translator();

    return (
        <nav>
            <div>
                <Button
                    className="nav-button"
                    id={index === 0 ? 'active-nav-button' : ''}
                    disabled={index === 0}
                    onClick={article.handler}
                    href={article.href}
                >
                    {t('nav.article')}
                </Button>
                <Button
                    className="nav-button"
                    id={index === 1 ? 'active-nav-button' : ''}
                    disabled={index === 1}
                    onClick={journal.handler}
                    href={journal.href}
                >
                    {t('nav.journal')}
                </Button>
                <Button
                    className="nav-button"
                    id={index === 2 ? 'active-nav-button' : ''}
                    disabled={index === 2}
                    onClick={database.handler}
                    href={database.href}
                >
                    {t('nav.database')}
                </Button>
                <Button
                    className="nav-button"
                    id={index === 3 ? 'active-nav-button' : ''}
                    disabled={index === 3}
                    onClick={researchData.handler}
                    href={researchData.href}
                >
                    {t('nav.researchData')}
                </Button>
            </div>
        </nav>
    );
}
