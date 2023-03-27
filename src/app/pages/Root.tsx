import { translator } from '../shared/locales/I18N';
import PageTitle from '../components/utils/PageTitle';
import SearchBar from '../components/searchbar/SearchBar';
import './Root.scss';

export default function Root() {
    const t = translator();
    return (
        <div>
            <PageTitle />
            <SearchBar
                placeholder={t('pages.article.searchBar')}
                onSearch={(v) => {
                    // eslint-disable-next-line no-console
                    console.log(v);
                }}
            />
            <div id="app">
                <h1>Root</h1>
            </div>
        </div>
    );
}
