import BibCNRSLogo from '/logos/bibcnrs.png';
import './Header.scss';
import LocalButton from './element/LocalButton';
import SignInButton from './element/SignInButton';
import { RouteRoot } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import { translator } from '../../shared/locales/I18N';
import ThemeButton from './element/ThemeButton';
import createSxProps from '../../shared/createSxProps';
import UserButton from './element/UserButton';
import { useContext } from 'react';
import { BibContext } from '../utils/ContextProvider';
import NewsButton from './element/NewsButton';
import TestsButton from './element/TestsButton';
import LicencesButton from './element/licencesButton';
import QuestionsButton from './element/QuestionsButton';
import ResourcesButton from './element/ResourcesButton';

export const headerButtonStyle = createSxProps({
    fontFamily: '"Source Sans Pro", sans-serif',
});

/**
 * Header component use in every page.
 * This component also handles language selection and account navigation.
 */
const Header = () => {
    const t = translator();
    const { login } = useContext(BibContext);
    return (
        <header>
            <div id="header-left">
                <CustomLink to={RouteRoot}>
                    <img src={BibCNRSLogo} alt="BibCNRS Logo" />
                </CustomLink>
                <div>
                    <p>{t('components.header.title')}</p>
                </div>
            </div>
            <div id="header-right">
                {login ? (
                    <>
                        <UserButton />
                        <NewsButton />
                        <TestsButton />
                        <LicencesButton />
                    </>
                ) : (
                    <SignInButton />
                )}
                <ResourcesButton />
                <QuestionsButton />
                <LocalButton />
                <ThemeButton />
            </div>
        </header>
    );
};

export default Header;
