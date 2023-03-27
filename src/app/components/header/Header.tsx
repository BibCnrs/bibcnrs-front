import BibCNRSLogo from '/logos/bibcnrs.png';
import './Header.scss';
import LocalButton from './element/LocalButton';
import SignInButton from './element/SignInButton';
import { RouteRoot } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import { getFullTranslator } from '../../shared/locales/I18N';

/**
 * Application header
 */
export default function Header() {
    const { t, i18n } = getFullTranslator();
    return (
        <header>
            <div id="header-left">
                <CustomLink to={RouteRoot}>
                    <img src={BibCNRSLogo} alt="BibCNRS Logo" />
                </CustomLink>
                <div>
                    <p>{t('header.title')}</p>
                </div>
            </div>
            <div id="header-right">
                <SignInButton t={t} />
                <LocalButton i18n={i18n} />
            </div>
        </header>
    );
}
