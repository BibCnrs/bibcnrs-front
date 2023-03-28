import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './ResearchData.scss';
import SearchBar from '../../components/searchbar/SearchBar';
import { useQuery } from '../../shared/Routes';
import { useState } from 'react';
import { search } from '../../services/metadore/Metadore';

export default function ResearchData() {
    const query = useQuery();
    const t = translator();
    const [results, setResults] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [resultsPerPage, setResultPerPage] = useState(20);
    const [currentPage, setcurrentPage] = useState(1);
    return (
        <div>
            <PageTitle page={'researchData'} t={t} />
            <SearchBar
                placeholder={t('pages.researchData.searchBar')}
                value={query.get('q')}
                onSearch={(v) => {
                    search(v, resultsPerPage, currentPage, setResults, setTotalHits, setMaxPage);
                }}
            />
            <div id="app">
                <h1>Research Data</h1>
                <div>
                    {results.map((result: any, index: number) => (
                        <div key={index}>
                            <p>Title: {JSON.stringify(result.titles)}</p>
                            <p>Doi: {JSON.stringify(result.doi)}</p>
                            <p>Type: {JSON.stringify(result.type)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
