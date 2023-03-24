import BibCNRSLogo from '/logos/bibcnrs.png';
import './Header.scss';
import { getFullTranslator } from '../../locales/I18N';
import LocalButton from './element/LocalButton';
import SignInButton from './element/SignInButton';
import { LinkRoot } from '../routes';

export default function Header() {
    const { t, i18n } = getFullTranslator();
    return (
        <header>
            <div id="header-left">
                <LinkRoot>
                    <img src={BibCNRSLogo} alt="BibCNRS Logo" />
                </LinkRoot>
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
