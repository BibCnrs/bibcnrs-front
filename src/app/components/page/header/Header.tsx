import './Header.scss';
import BibCNRSLogo from '/logos/bibcnrs.png';
import LocalButton from '../../element/header/LocaleButton';
import SignInButton from '../../element/header/SignInButton';
import { RouteRoot } from '../../../shared/Routes';
import CustomLink from '../../element/link/CustomLink';
import { useTranslator } from '../../../shared/locales/I18N';
import ThemeButton from '../../element/header/ThemeButton';
import UserButton from '../../element/header/UserButton';
import { memo, useContext } from 'react';
import { BibContext } from '../../internal/provider/ContextProvider';
import NewsButton from '../../element/header/NewsButton';
import TestsButton from '../../element/header/TestsButton';
import LicencesButton from '../../element/header/LicencesButton';
import FaqButton from '../../element/header/FaqButton';
import ResourcesButton from '../../element/header/ResourcesButton';
import createSxProps from '../../../shared/createSxProps';
import NavBar from '../../element/navbar/NavBar';

export const headerButtonStyle = createSxProps({
    fontFamily: '"Source Sans Pro", sans-serif',
    textTransform: 'none',
    fontSize: 'initial',
    lineHeight: 'initial',
    minWidth: 'initial',
});

/**
 * Header component used in every page.
 * This component also handles language selection and account navigation.
 */
const Header = () => {
    const t = useTranslator();
    const { login } = useContext(BibContext);
    return (
        <>
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
            <NavBar />
        </>
    );
};

export default memo(Header);
