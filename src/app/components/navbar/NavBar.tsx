import './NavBar.scss';
import { translator } from '../../shared/locales/I18N';
import {
    RouteArticle,
    RouteDatabase,
    RouteJournal,
    RouteResearchData,
    RouteRoot,
    buildLinkClickHandler,
    isMatching,
} from '../../shared/Routes';
import { BibContext } from '../provider/ContextProvider';
import Button from '@mui/material/Button';
import { useContext } from 'react';

/**
 * Nav bar component use to navigate between: [Article], [Journal, book], [Database] and [Research data]
 */
const NavBar = () => {
    // Get translation function
    const t = translator();
    const { theme } = useContext(BibContext);
    const getActiveDarkButtonId = () => {
        if (theme === 'dark') {
            return 'active-nav-button-dark';
        }
        return 'active-nav-button';
    };

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

    return (
        <nav id="nav">
            <div id="nav-container">
                <Button
                    className="nav-button"
                    id={(articleMatch || noneMatch) && !disable ? getActiveDarkButtonId() : ''}
                    disabled={(articleMatch || noneMatch) && !disable}
                    onClick={article.handler}
                    href={article.href}
                >
                    {t('components.nav.article')}
                </Button>
                <Button
                    className="nav-button"
                    id={journalMatch ? getActiveDarkButtonId() : ''}
                    disabled={journalMatch}
                    onClick={journal.handler}
                    href={journal.href}
                >
                    {t('components.nav.journal')}
                </Button>
                <Button
                    className="nav-button"
                    id={databaseMatch ? getActiveDarkButtonId() : ''}
                    disabled={databaseMatch}
                    onClick={database.handler}
                    href={database.href}
                >
                    {t('components.nav.database')}
                </Button>
                <Button
                    className="nav-button"
                    id={researchDataMatch ? getActiveDarkButtonId() : ''}
                    disabled={researchDataMatch}
                    onClick={researchData.handler}
                    href={researchData.href}
                >
                    {t('components.nav.researchData')}
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
