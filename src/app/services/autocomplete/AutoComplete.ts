import { createQuery } from '../Environment';
import { AutoCompleteDataType } from '../../shared/types/data.types';

export async function autoComplete(value: string): Promise<AutoCompleteDataType> {
    const response = await fetch(
        createQuery('https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomplete.php', {
            userId: '!Qw0.nnkOvwtnfBHjZ37',
            q: value,
        }),
    );
    return await response.json();
}
