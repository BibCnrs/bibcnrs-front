import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './Database.scss';

export default function Database() {
    const t = translator();
    return (
        <div>
            <PageTitle page={'database'} t={t} />
            <div id="app">
                <h1>Database</h1>
            </div>
        </div>
    );
}
