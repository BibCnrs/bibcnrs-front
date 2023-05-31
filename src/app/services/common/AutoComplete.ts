import { createQuery, json, throwIfNotOk } from '../Environment';
import type { AutoCompleteDataType } from '../../shared/types/data.types';

export const autoComplete = async (value: string): Promise<string[]> => {
    const response = await fetch(
        createQuery('https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomplete.php', {
            userId: '!Qw0.nnkOvwtnfBHjZ37',
            q: value,
        }),
    );
    throwIfNotOk(response);
    const autoCompleteData = await json<AutoCompleteDataType>(response);
    return autoCompleteData.terms.map((term) => term.term);
};
