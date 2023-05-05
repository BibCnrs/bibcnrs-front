import './Article.scss';
import SearchBar from '../../../components/searchbar/SearchBar';
import PageTitle from '../../../components/utils/PageTitle';
import { useTranslator } from '../../../shared/locales/I18N';

const Article = () => {
    const t = useTranslator();
    return (
        <div>
            <PageTitle page={'article'} t={t} />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.article.searchBar')}
                    onSearch={(v) => {
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
