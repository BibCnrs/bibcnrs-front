import './Article.scss';
import SearchBar from '../../../components/searchbar/SearchBar';
import { translator } from '../../../shared/locales/I18N';
import PageTitle from '../../../components/utils/PageTitle';

const Article = () => {
    const t = translator();
    return (
        <div>
            <PageTitle page={'article'} t={t} />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.article.searchBar')}
                    onSearch={(v) => {
                        // eslint-disable-next-line no-console
                        console.log(v);
                    }}
                />
            </div>
            <div id="app">
                <h1>Article</h1>
            </div>
        </div>
    );
};

export default Article;
