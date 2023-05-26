import './Publication.scss';
import SearchBar from '../../../components/searchbar/SearchBar';
import PageTitle from '../../../components/utils/PageTitle';
import { useTranslator } from '../../../shared/locales/I18N';

const Publication = () => {
    const t = useTranslator();
    return (
        <div>
            <PageTitle page="publication" />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.publication.searchBar')}
                    onSearch={(v) => {
                        console.log(v);
                    }}
                />
            </div>
            <div id="app">
                <h1>Publication</h1>
            </div>
        </div>
    );
};

export default Publication;
