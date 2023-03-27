import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './Contact.scss';

export default function Contact() {
    const t = translator();
    return (
        <div>
            <PageTitle page={'contact'} t={t} />
            <div id="app">
                <h1>Contact</h1>
            </div>
        </div>
    );
}
