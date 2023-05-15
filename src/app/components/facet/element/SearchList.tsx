import { useTranslator } from '../../../shared/locales/I18N';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { FacetSearchListProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';
import type { SyntheticEvent } from 'react';

const SearchList = ({ facets, name, onChange, initial = undefined }: FacetSearchListProps) => {
    const t = useTranslator();

    const handleChange = (event: SyntheticEvent, value: FacetEntry[]) => {
        onChange(value);
    };

    return (
        <div>
            <Autocomplete
                size="small"
                multiple
                options={facets}
                getOptionLabel={(option) => `${option.name} (${option.count})`}
                defaultValue={initial}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField {...params} label={t(`components.facet.${name}`) + ' - ' + facets.length} />
                )}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchList;
