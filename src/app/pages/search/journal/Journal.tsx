import './Journal.scss';
import { translator } from '../../../shared/locales/I18N';
import PageTitle from '../../../components/utils/PageTitle';
import SearchBar from '../../../components/searchbar/SearchBar';

const Journal = () => {
    const t = translator();
    return (
        <div>
            <PageTitle page={'journal'} t={t} />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.journal.searchBar')}
                    onSearch={(v) => {
                        // eslint-disable-next-line no-console
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
