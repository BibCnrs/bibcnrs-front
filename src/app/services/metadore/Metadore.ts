import { createQuery, environment } from '../Environment';

export function search(
    v: string,
    resultsPerPage: number,
    currentPage: number,
    setResults: any,
    setTotalHits: any,
    setLoading: any,
) {
    fetch(
        createQuery(environment.get.metadore, {
            queries: JSON.stringify([
                {
                    term: v,
                    suggestedTerms: [],
                    field: null,
                },
            ]),
            resultsPerPage,
            currentPage: currentPage,
        }),
    )
        .then((response) => response.json())
        .then((data) => {
            setResults(data.results);
            setTotalHits(data.totalHits);
            setLoading(false);
        });
}
