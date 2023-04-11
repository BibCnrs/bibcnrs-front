import { translator } from '../../shared/locales/I18N';
import CNRSLogo from '/logos/cnrs.png';
import './Footer.scss';
import { RouteAbout, RouteContact, RouteLegal } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import TwitterIcon from '@mui/icons-material/Twitter';

/**
 * Footer component use in every page
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
                    <CustomLink to={RouteAbout}>{t('components.footer.about')}</CustomLink>
                </li>
                <li>
                    <CustomLink to={RouteContact}>{t('components.footer.contact')}</CustomLink>
                </li>
                <li>
                    <CustomLink to={RouteLegal}>{t('components.footer.legal')}</CustomLink>
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
