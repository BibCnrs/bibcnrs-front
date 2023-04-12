import PageTitle from '../../components/utils/PageTitle';
import { translator } from '../../shared/locales/I18N';
import './About.scss';

const About = () => {
    const t = translator();
    return (
        <div>
            <PageTitle page={'about'} t={t} />
            <div id="app">
                <h1>About</h1>
            </div>
        </div>
    );
};

export default About;
