import { SearchBarProps } from '../../shared/types/props.types';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import './SearchBar.scss';

export default function SearchBar(props: SearchBarProps) {
    const { placeholder, onSearch } = props;
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>();
    let defaultValue = '';
    if (props.value) {
        defaultValue = props.value;
    }
    const [value, setValue] = useState<string>(defaultValue);
    const [firstRun, setFirstRun] = useState<boolean>(true);

    useEffect(() => {
        if (firstRun && value && value !== '') onSearch(value, true);
        setFirstRun(false);
    });

    const inputOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const inputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key === 'Enter') onSearch(value, false);
    };

    const clearOnClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setValue('');
        }
    };

    const searchOnClick = () => {
        onSearch(value, false);
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
