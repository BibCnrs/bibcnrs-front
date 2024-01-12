import './Footer.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import CNRSLogo from '/logos/cnrs.png';
import TwitterLogo from '/logos/twitter.png';
import { RouteAbout, RouteLegal } from '../../../shared/Routes';
import CustomLink from '../../element/link/CustomLink';
import { memo } from 'react';

/**
 * Footer component used in every page
 */
const Footer = () => {
    const t = useTranslator();

    return (
        <footer>
            <a href="https://www.cnrs.fr" target="_blank" rel="noreferrer noopener nofollow">
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
                            t('components.footer.mail.subject').toString(),
                        )}&body=${encodeURIComponent(t('components.footer.mail.body').toString())}`}
                    >
                        {t('components.footer.contact')}
                    </a>
                </li>
                <li>
                    <CustomLink to={RouteLegal}>{t('components.footer.legal')}</CustomLink>
                </li>
            </ul>
            <div id={'social-media'}>
                <a href="https://twitter.com/BibCnrs" target="_blank" rel="noreferrer noopener nofollow">
                    <img src={TwitterLogo} alt="twitter logo" />
                </a>
            </div>
        </footer>
    );
};

export default memo(Footer);
