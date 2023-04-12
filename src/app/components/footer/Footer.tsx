import { getLanguageKey, translator } from '../../shared/locales/I18N';
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
    const language = getLanguageKey();
    const mailBodyFr = `Bonjour,
Afin de répondre au mieux à votre demande, nous vous remercions de bien vouloir préciser votre :

 • Nom, Prénom :
 • Code unité (ex :UMR 12344) :
 • Demande, question ou problème rencontré, suggestion de ressource, …

Cordialement`;

    const mailBodyEn = `Hello,
In order to best answer your request, we would be grateful if you could specify your :

 • Name, First name:
 • Unit code (e.g.: UMR 12344):
 • Request, question or problem encountered, suggestion of resource...

Sincerely`;

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
                    {language === 'en' ? (
                        <a
                            id="contact-mailto"
                            href={`mailto:assistance-portail@inist.fr?subject=${encodeURIComponent(
                                'Request for assistance',
                            )}&body=${encodeURIComponent(mailBodyEn)}`}
                        >
                            {t('components.footer.contact')}
                        </a>
                    ) : (
                        <a
                            id="contact-mailto"
                            href={`mailto:assistance-portail@inist.fr?subject=${encodeURIComponent(
                                'Demande d’assistance',
                            )}&body=${encodeURIComponent(mailBodyFr)}`}
                        >
                            {t('components.footer.contact')}
                        </a>
                    )}
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
