import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './Legal.scss';

export default function Legal() {
    const t = translator();
    return (
        <div>
            <PageTitle page={'legal'} t={t} />
            <div id="app">
                <h1>Legal</h1>
            </div>
        </div>
    );
}
