import { useTranslator } from '../../../shared/locales/I18N';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { memo } from 'react';
import type { FacetSearchListProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';
import type { SyntheticEvent } from 'react';

const SearchList = ({ facets, name, onChange, initial = undefined }: FacetSearchListProps) => {
    const t = useTranslator();

    const handleChange = (event: SyntheticEvent, value: FacetEntry[]) => {
        onChange(value);
    };

    const handleGroupBy = (option: FacetEntry): string => {
        if (option.name.toUpperCase() === 'HAL') {
            return 'HAL';
        }
        const firstLetter = option.name[0].toUpperCase();
        return /[0-9]/.test(firstLetter) ? '0-9' : firstLetter;
    };

    const handleIsOptionEqualToValue = (option: FacetEntry, value: FacetEntry) => {
        return option.name === value.name;
    };

    return (
        <div>
            <Autocomplete
                size="small"
                multiple
                options={facets}
                groupBy={handleGroupBy}
                getOptionLabel={(option) => `${option.name} (${option.count})`}
                defaultValue={initial}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField {...params} label={t(`components.facet.${name}`) + ' - ' + facets.length} />
                )}
                onChange={handleChange}
            />
        </div>
    );
};

export default memo(SearchList);
