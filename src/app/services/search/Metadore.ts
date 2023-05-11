import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { MetadoreDataType } from '../../shared/types/data.types';

export const metadore = async (
    v: string,
    resultsPerPage: number,
    currentPage: number,
    field: string | null,
): Promise<MetadoreDataType> => {
    const response: Response = await fetch(
        createQuery(environment.get.search.metadore, {
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
    throwIfNotOk(response);
    return json<MetadoreDataType>(response);
};
