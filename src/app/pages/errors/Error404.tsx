import { translator } from '../../shared/locales/I18N';
import { Link } from 'react-router-dom';

/**
 * React element use to display localized 404 error
 * @constructor
 */
const Error404 = () => {
    const t = translator();
    return (
        <div id="app">
            <h1>{t('error.404.title')}</h1>
            <p>{t('error.404.message')}</p>
            <Link to="/">{t('error.return')}</Link>
        </div>
    );
};

export default Error404;
