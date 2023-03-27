import Button from '@mui/material/Button';
import './NavBar.scss';
import {
    buildLinkClickHandler,
    isMatching,
    RouteArticle,
    RouteDatabase,
    RouteJournal,
    RouteResearchData,
} from '../../shared/Routes';
import { translator } from '../../shared/locales/I18N';

export default function NavBar() {
    const article = buildLinkClickHandler(RouteArticle);
    const journal = buildLinkClickHandler(RouteJournal);
    const database = buildLinkClickHandler(RouteDatabase);
    const researchData = buildLinkClickHandler(RouteResearchData);
    const articleMatch = !!isMatching(RouteArticle);
    const journalMatch = !!isMatching(RouteJournal);
    const databaseMatch = !!isMatching(RouteDatabase);
    const researchDataMatch = !!isMatching(RouteResearchData);
    const noneMatch = !articleMatch && !journalMatch && !databaseMatch && !researchDataMatch;
    const t = translator();

    return (
        <nav>
            <div>
                <Button
                    className="nav-button"
                    id={articleMatch || noneMatch ? 'active-nav-button' : ''}
                    disabled={articleMatch || noneMatch}
                    onClick={article.handler}
                    href={article.href}
                >
                    {t('nav.article')}
                </Button>
                <Button
                    className="nav-button"
                    id={journalMatch ? 'active-nav-button' : ''}
                    disabled={journalMatch}
                    onClick={journal.handler}
                    href={journal.href}
                >
                    {t('nav.journal')}
                </Button>
                <Button
                    className="nav-button"
                    id={databaseMatch ? 'active-nav-button' : ''}
                    disabled={databaseMatch}
                    onClick={database.handler}
                    href={database.href}
                >
                    {t('nav.database')}
                </Button>
                <Button
                    className="nav-button"
                    id={researchDataMatch ? 'active-nav-button' : ''}
                    disabled={researchDataMatch}
                    onClick={researchData.handler}
                    href={researchData.href}
                >
                    {t('nav.researchData')}
                </Button>
            </div>
        </nav>
    );
}
