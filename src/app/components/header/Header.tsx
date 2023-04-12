import BibCNRSLogo from '/logos/bibcnrs.png';
import './Header.scss';
import LocalButton from './element/LocalButton';
import SignInButton from './element/SignInButton';
import { RouteRoot } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import { getFullTranslator } from '../../shared/locales/I18N';

/**
 * Header component use in every page.
 * This component also handles language selection and account navigation.
 */
const Header = () => {
    const { t, i18n } = getFullTranslator();
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
                <SignInButton t={t} />
                <LocalButton i18n={i18n} />
            </div>
        </header>
    );
};

export default Header;
