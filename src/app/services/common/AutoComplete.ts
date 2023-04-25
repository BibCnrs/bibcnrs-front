import { createQuery } from '../Environment';
import { AutoCompleteDataType } from '../../shared/types/data.types';

export const autoComplete = async (value: string): Promise<AutoCompleteDataType> => {
    const response = await fetch(
        createQuery('https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomplete.php', {
            userId: '!Qw0.nnkOvwtnfBHjZ37',
            q: value,
        }),
    );
    return response.json();
};