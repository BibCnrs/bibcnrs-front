import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './ResearchData.scss';
import SearchBar from '../../components/searchbar/SearchBar';
import { useQuery } from '../../shared/Routes';

export default function ResearchData() {
    const query = useQuery();
    const t = translator();
    return (
        <div>
            <PageTitle page={'researchData'} t={t} />
            <SearchBar
                placeholder={t('pages.researchData.searchBar')}
                value={query.get('q')}
                onSearch={(v) => {
                    // eslint-disable-next-line no-console
                    console.log(v);
                }}
            />
            <div id="app">
                <h1>Research Data</h1>
            </div>
        </div>
    );
}
