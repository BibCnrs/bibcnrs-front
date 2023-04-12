import { translator } from '../../shared/locales/I18N';
import CNRSLogo from '/logos/cnrs.png';
import './Footer.scss';
import { RouteAbout, RouteLegal } from '../../shared/Routes';
import CustomLink from '../customlink/CustomLink';
import TwitterIcon from '@mui/icons-material/Twitter';

/**
 * Footer component use in every page
 */
const Footer = () => {
    const t = translator();
    const mailBody = `Bonjour,
Afin de répondre au mieux à votre demande, nous vous remercions de bien vouloir préciser votre :

 • Nom, Prénom :
 • Code unité (ex :UMR 12344) :
 • Demande, question ou problème rencontré, suggestion de ressource, …

Cordialement`;
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
                    <a
                        id="contact-mailto"
                        href={`mailto:assistance-portail@inist.fr?subject=${encodeURIComponent(
                            'Demande d’assistance',
                        )}&body=${encodeURIComponent(mailBody)}`}
                    >
                        {t('components.footer.contact')}
                    </a>
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
};

export default Footer;
