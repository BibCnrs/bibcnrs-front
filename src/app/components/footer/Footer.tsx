import TwitterIcon from '@mui/icons-material/Twitter';
import { translator } from '../../locales/I18N';
import CNRSLogo from '/logos/cnrs.png';
import './Footer.scss';
import { RouteAbout, RouteContact, RouteLegal } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';

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
                    <CustomLink to={RouteAbout}>{t('footer.about')}</CustomLink>
                </li>
                <li>
                    <CustomLink to={RouteContact}>{t('footer.contact')}</CustomLink>
                </li>
                <li>
                    <CustomLink to={RouteLegal}>{t('footer.legal')}</CustomLink>
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
