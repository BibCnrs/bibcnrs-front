import { createQuery, environment } from '../Environment';
import { MetadoreDataType } from '../../shared/types/data.types';

export async function search(v: string, resultsPerPage: number, currentPage: number): Promise<MetadoreDataType> {
    const response = await fetch(
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
    );
    return await response.json();
}
