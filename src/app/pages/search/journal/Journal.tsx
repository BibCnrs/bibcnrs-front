import './Journal.scss';
import SearchBar from '../../../components/searchbar/SearchBar';
import PageTitle from '../../../components/utils/PageTitle';
import { useTranslator } from '../../../shared/locales/I18N';

const Journal = () => {
    const t = useTranslator();
    return (
        <div>
            <PageTitle page={'journal'} t={t} />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.journal.searchBar')}
                    onSearch={(v) => {
                        console.log(v);
                    }}
                />
            </div>
            <div id="app">
                <h1>Journal</h1>
            </div>
        </div>
    );
};

export default Journal;
