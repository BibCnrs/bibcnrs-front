import { useTranslator } from '../../../shared/locales/I18N';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { FacetSearchListProps } from '../../../shared/types/props.types';

const SearchList = ({ facets, name, initial = undefined }: FacetSearchListProps) => {
    const t = useTranslator();

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
            />
        </div>
    );
};

export default SearchList;
