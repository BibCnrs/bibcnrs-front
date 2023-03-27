import SearchBar from '../../components/searchbar/SearchBar';
import './Article.scss';
import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';

export default function Article() {
    const t = translator();
    return (
        <div>
            <PageTitle page={'article'} t={t} />
            <SearchBar
                placeholder={t('pages.article.searchBar')}
                onSearch={(v) => {
                    // eslint-disable-next-line no-console
                    console.log(v);
                }}
            />
            <div id="app">
                <h1>Article</h1>
            </div>
        </div>
    );
}
