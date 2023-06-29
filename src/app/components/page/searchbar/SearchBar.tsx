import './SearchBar.scss';
import { autoComplete } from '../../../services/common/AutoComplete';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import type { SearchBarProps } from '../../../shared/types/props.types';
import type { KeyboardEvent, SyntheticEvent } from 'react';

/**
 * Search bar component used in: "Root", "Article", "Journal, book", "Database" and "Research data"
 * @param placeholder - Search bar placeholder
 * @param onSearch    - Event call when the user press 'Enter' or click on the search icon
 * @param props       - Rest of the search bar props
 */
const SearchBar = ({ placeholder, onSearch, ...props }: SearchBarProps) => {
    // Search bar states
    const [value, setValue] = useState<string>(props.value ?? '');
    const [autocompleteValue, setAutocompleteValue] = useState<string | undefined>('');

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    const { data } = useQuery<string[], any, string[], any>({
        queryKey: ['search-bar', value],
        queryFn: () => {
            if (value === '') {
                return [];
            }
            return autoComplete(value);
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    // Perform search when the user press 'Enters'
    const inputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
        }
    };

    // Clear the input when the user clicks on the clear button
    const clearOnClick = () => {
        setValue('');
        setAutocompleteValue(undefined);
        onSearch(undefined);
    };

    // Perform search when the user clicks on the search button
    const searchOnClick = () => {
        onSearch(value);
    };

    const handleAutocompleteChange = (event: SyntheticEvent, newValue: string | undefined) => {
        setAutocompleteValue(newValue);
        onSearch(newValue);
        if (newValue) {
            setValue(newValue);
        }
    };

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div id="search-container">
            <Paper id="search-box">
                <Autocomplete
                    inputValue={value}
                    value={autocompleteValue}
                    onChange={handleAutocompleteChange}
                    onInputChange={handleChange}
                    onKeyDown={inputKeyDown}
                    renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
                    options={data ?? []}
                    id="search-box-input"
                    freeSolo
                    disableClearable
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                />
                {value !== '' ? (
                    <>
                        <IconButton onClick={clearOnClick}>
                            <ClearIcon />
                        </IconButton>
                        <Divider orientation="vertical" id="search-box-divider" />
                    </>
                ) : null}
                <IconButton onClick={searchOnClick}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default memo(SearchBar);
