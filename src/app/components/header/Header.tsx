import BibCNRSLogo from '/logos/bibcnrs.png';
import './Header.scss';
import LocalButton from './element/LocalButton';
import SignInButton from './element/SignInButton';
import { RouteRoot } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import { getFullTranslator } from '../../shared/locales/I18N';
import UserButton from './element/UserButton';
import { useContext } from 'react';
import { BibContext } from '../utils/ContextProvider';
import NewsButton from './element/NewsButton';

/**
 * Header component use in every page.
 * This component also handles language selection and account navigation.
 */
export default function Header() {
    const { t, i18n } = getFullTranslator();
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
                        <NewsButton text={'news'} />
                        <NewsButton text={'tests'} />
                        <NewsButton text={'Lienses'} />
                    </>
                ) : (
                    <SignInButton t={t} />
                )}
                <NewsButton text={'FAQ'} />
                <NewsButton text={'Liste ressources'} />
                <LocalButton i18n={i18n} />
            </div>
        </header>
    );
}
