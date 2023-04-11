import './NavBar.scss';
import {
    RouteArticle,
    RouteDatabase,
    RouteJournal,
    RouteResearchData,
    RouteRoot,
    buildLinkClickHandler,
    isMatching,
} from '../../shared/Routes';
import { translator } from '../../shared/locales/I18N';
import Button from '@mui/material/Button';

/**
 * Nav bar component use to navigate between: [Article], [Journal, book], [Database] and [Research data]
 */
export default function NavBar() {
    // Get translation function
    const t = translator();

    // Button action handler
    const article = buildLinkClickHandler(RouteArticle);
    const journal = buildLinkClickHandler(RouteJournal);
    const database = buildLinkClickHandler(RouteDatabase);
    const researchData = buildLinkClickHandler(RouteResearchData);

    // Current route
    const articleMatch = !!isMatching(RouteArticle);
    const journalMatch = !!isMatching(RouteJournal);
    const databaseMatch = !!isMatching(RouteDatabase);
    const researchDataMatch = !!isMatching(RouteResearchData);
    const rootMatch = !!isMatching(RouteRoot);
    const noneMatch = !articleMatch && !journalMatch && !databaseMatch && !researchDataMatch;
    const disable = noneMatch && !rootMatch;

    if (disable) {
        return <></>;
    }

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
                    {t('components.nav.article')}
                </Button>
                <Button
                    className="nav-button"
                    id={journalMatch ? 'active-nav-button' : ''}
                    disabled={journalMatch}
                    onClick={journal.handler}
                    href={journal.href}
                >
                    {t('components.nav.journal')}
                </Button>
                <Button
                    className="nav-button"
                    id={databaseMatch ? 'active-nav-button' : ''}
                    disabled={databaseMatch}
                    onClick={database.handler}
                    href={database.href}
                >
                    {t('components.nav.database')}
                </Button>
                <Button
                    className="nav-button"
                    id={researchDataMatch ? 'active-nav-button' : ''}
                    disabled={researchDataMatch}
                    onClick={researchData.handler}
                    href={researchData.href}
                >
                    {t('components.nav.researchData')}
                </Button>
            </div>
        </nav>
    );
}
