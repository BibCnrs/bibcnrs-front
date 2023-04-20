import './Header.scss';
import BibCNRSLogo from '/logos/bibcnrs.png';
import LocalButton from './element/LocalButton';
import SignInButton from './element/SignInButton';
import { RouteRoot } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import { translator } from '../../shared/locales/I18N';
import ThemeButton from './element/ThemeButton';
import UserButton from './element/UserButton';
import { useContext } from 'react';
import { BibContext } from '../provider/ContextProvider';
import NewsButton from './element/NewsButton';
import TestsButton from './element/TestsButton';
import LicencesButton from './element/LicencesButton';
import FaqButton from './element/FaqButton';
import ResourcesButton from './element/ResourcesButton';
import createSxProps from '../../shared/createSxProps';

export const headerButtonStyle = createSxProps({
    fontFamily: '"Source Sans Pro", sans-serif',
    textTransform: 'none',
    fontSize: 'initial',
    lineHeight: 'initial',
    minWidth: 'initial',
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
                <FaqButton />
                <LocalButton />
                <ThemeButton />
            </div>
        </header>
    );
};

export default Header;
