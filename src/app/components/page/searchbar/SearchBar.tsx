import './SearchBar.scss';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import type { SearchBarProps } from '../../../shared/types/props.types';
import type { ChangeEvent, KeyboardEvent } from 'react';

/**
 * Search bar component used in: "Root", "Article", "Journal, book", "Database" and "Research data"
 * @param placeholder - Search bar placeholder
 * @param onSearch    - Event call when the user press 'Enter' or click on the search icon
 * @param props       - Rest of the search bar props
 */
const SearchBar = ({ placeholder, onSearch, ...props }: SearchBarProps) => {
    // Search bar input reference
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

    // Search bar states
    const [value, setValue] = useState<string>(props.value ?? '');

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    const inputOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    // Perform search when the user press 'Enters'
    const inputKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
        }
    };

    // Clear the input when the user clicks on the clear button
    const clearOnClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setValue('');
            onSearch(undefined);
        }
    };

    // Perform search when the user clicks on the search button
    const searchOnClick = () => {
        onSearch(value);
    };

    return (
        <div id="search-container">
            <Paper id="search-box">
                <InputBase
                    placeholder={placeholder}
                    onChange={inputOnChange}
                    onKeyDown={inputKeyDown}
                    inputRef={inputRef}
                    value={value}
                    id="search-box-input"
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

export default SearchBar;
