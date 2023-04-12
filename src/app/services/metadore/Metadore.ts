import { createQuery, environment } from '../Environment';
import { MetadoreDataType } from '../../shared/types/data.types';

export const search = async (
    v: string,
    resultsPerPage: number,
    currentPage: number,
    field: string | null,
): Promise<MetadoreDataType> => {
    const response: Response = await fetch(
        createQuery(environment.get.metadore, {
            queries: JSON.stringify([
                {
                    term: v,
                    suggestedTerms: [],
                    field,
                },
            ]),
            resultsPerPage,
            currentPage: currentPage,
        }),
    );
    return await response.json();
};
