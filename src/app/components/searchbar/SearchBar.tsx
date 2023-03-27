import { SearchBarProps } from '../../shared/types';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import Divider from '@mui/material/Divider';

export default function SearchBar(props: SearchBarProps) {
    const { placeholder, onSearch } = props;
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>();
    const [value, setValue] = useState('');

    const inputOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const inputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key === 'Enter') onSearch(value);
    };

    const clearOnClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setValue('');
        }
    };

    const searchOnClick = () => {
        onSearch(value);
    };

    return (
        <Paper>
            <InputBase
                placeholder={placeholder}
                onChange={inputOnChange}
                onKeyDown={inputKeyDown}
                inputRef={inputRef}
            />
            {value !== '' ? (
                <>
                    <IconButton onClick={clearOnClick}>
                        <ClearIcon />
                    </IconButton>
                    <Divider orientation="vertical" />
                </>
            ) : (
                <></>
            )}
            <IconButton onClick={searchOnClick}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
