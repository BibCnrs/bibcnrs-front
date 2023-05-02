import { createQuery, environment, json, throwIfNotOk } from '../Environment';
import type { MetadoreDataType } from '../../shared/types/data.types';

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
    throwIfNotOk(response);
    return json<MetadoreDataType>(response);
};
