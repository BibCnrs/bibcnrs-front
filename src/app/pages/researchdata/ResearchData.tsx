import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './ResearchData.scss';
import SearchBar from '../../components/searchbar/SearchBar';
import { RouteResearchData, updatePageQueryUrl, useQuery } from '../../shared/Routes';
import { useEffect, useState } from 'react';
import { search } from '../../services/metadore/Metadore';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/utils/loading/Loading';
import Table from '../../components/table/Table';
import TableMetadore from '../../components/table/displayelement/TableMetadore';

export default function ResearchData() {
    const navigate = useNavigate();
    const query = useQuery();
    const t = translator();

    const [firstRun, setFirstRun] = useState<boolean>(true);
    const [results, setResults] = useState([]);
    const [totalHits, setTotalHits] = useState<number>(0);
    const [resultsPerPage, setResultPerPage] = useState<number>(25);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [disableUrlUpdate, setDisableUrlUpdate] = useState<boolean>(true);

    const onSearch = () => {
        if (!disableUrlUpdate)
            updatePageQueryUrl(RouteResearchData, navigate, { q: value, p: currentPage, n: resultsPerPage });
        setLoading(true);
        search(value, resultsPerPage, currentPage, setResults, setTotalHits, setLoading);
    };

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
            return;
        }
        onSearch();
    }, [currentPage, value, disableUrlUpdate]);

    return (
        <div>
            <PageTitle page={'researchData'} t={t} />
            <SearchBar
                placeholder={t('pages.researchData.searchBar')}
                value={query.get('q')}
                onSearch={(value, disableUrlUpdate) => {
                    setResultPerPage(25);
                    setCurrentPage(1);
                    setValue(value);
                    setDisableUrlUpdate(disableUrlUpdate);
                }}
            />
            <div id="app">{loading ? <Loading /> : <Table DisplayElement={TableMetadore} results={results} />}</div>
        </div>
    );
}
