import TwitterIcon from '@mui/icons-material/Twitter';
import { translator } from '../../locales/I18N';
import CNRSLogo from '/logos/cnrs.png';
import './Footer.scss';
import { LinkAbout, LinkContact, LinkLegal } from '../routes';

/**
 * Application footer
 */
export default function Footer() {
    const t = translator();
    return (
        <footer>
            <a href="https://www.cnrs.fr" target="_blank">
                <img src={CNRSLogo} alt="CNRS logo" />
            </a>
            <ul>
                <li>
                    <LinkAbout>{t('footer.about')}</LinkAbout>
                </li>
                <li>
                    <LinkContact>{t('footer.contact')}</LinkContact>
                </li>
                <li>
                    <LinkLegal>{t('footer.legal')}</LinkLegal>
                </li>
            </ul>
            <div id={'social-media'}>
                <a href="https://twitter.com/BibCnrs" target="_blank">
                    <TwitterIcon />
                </a>
            </div>
        </footer>
    );
}
