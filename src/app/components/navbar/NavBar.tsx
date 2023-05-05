import './NavBar.scss';
import { useTranslator } from '../../shared/locales/I18N';
import {
    RouteArticle,
    RouteDatabase,
    RouteJournal,
    RouteResearchData,
    RouteRoot,
    useClickHandler,
    useIsMatching,
} from '../../shared/Routes';
import { BibContext } from '../provider/ContextProvider';
import Button from '@mui/material/Button';
import { useContext } from 'react';

/**
 * Nav bar component used to navigate between: "Article", "Journal, book", "Database" and "Research data"
 */
const NavBar = () => {
    // Get translation function
    const t = useTranslator();
    const { theme } = useContext(BibContext);
    const getActiveDarkButtonId = () => {
        if (theme === 'dark') {
            return 'active-nav-button-dark';
        }
        return 'active-nav-button';
    };

    // Button action handler
    const article = useClickHandler(RouteArticle);
    const journal = useClickHandler(RouteJournal);
    const database = useClickHandler(RouteDatabase);
    const researchData = useClickHandler(RouteResearchData);

    // Current route
    const articleMatch = !!useIsMatching(RouteArticle);
    const journalMatch = !!useIsMatching(RouteJournal);
    const databaseMatch = !!useIsMatching(RouteDatabase);
    const researchDataMatch = !!useIsMatching(RouteResearchData);
    const rootMatch = !!useIsMatching(RouteRoot);
    const noneMatch = !articleMatch && !journalMatch && !databaseMatch && !researchDataMatch;
    const disable = noneMatch && !rootMatch;

    return (
        <nav id="nav">
            <div id="nav-container">
                <Button
                    className="nav-button"
                    id={(articleMatch || noneMatch) && !disable ? getActiveDarkButtonId() : ''}
                    disabled={articleMatch || noneMatch ? !disable : false}
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
