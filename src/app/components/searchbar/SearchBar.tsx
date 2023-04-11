import { SearchBarProps } from '../../shared/types/props.types';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import './SearchBar.scss';

/**
 * Search bar component use in: [Root], [Article], [Journal, book], [Database] and [Research data]
 * @param props Components parameter who contain action function and options
 */
export default function SearchBar(props: SearchBarProps) {
    const { placeholder, onSearch } = props;

    // Search bar input reference
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>();

    // Get the search bar default value
    let defaultValue = '';
    if (props.value) {
        defaultValue = props.value;
    }

    // Search bar states
    const [value, setValue] = useState<string>(defaultValue);

    const inputOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    // Perform search when the user type 'Enters'
    const inputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
        }
    };

    // Clear the input when the user clicks on clear
    const clearOnClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setValue('');
        }
    };

    // Perform search when the user clicks on search
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
                ) : (
                    <></>
                )}
                <IconButton onClick={searchOnClick}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
}
