import './scss/TextType.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useState } from 'react';
import type { FacetTextTypeProps } from '../../../shared/types/props.types';
import type { SelectChangeEvent } from '@mui/material/Select';

const TextType = ({ texts, initial, onChange }: FacetTextTypeProps) => {
    const t = useTranslator();
    const [selectedText, setSelectedText] = useState<string[]>(initial ?? []);

    const handleChange = (event: SelectChangeEvent<typeof selectedText>) => {
        if (typeof event.target.value === 'string') {
            const value = event.target.value.split(',');
            setSelectedText(value);
            onChange(value);
            return;
        }
        const value = event.target.value;
        setSelectedText(value);
        onChange(value);
    };

    return (
        <FormControl id="facet-text-type" className="facet-field" size="small">
            <InputLabel id="facet-text-type-label">{t('components.facet.text')}</InputLabel>
            <Select
                labelId="facet-text-type-label"
                multiple
                value={selectedText}
                onChange={handleChange}
                input={<OutlinedInput label={t('components.facet.text')} />}
                renderValue={(selected) => (
                    <Box id="facet-text-type-selected">
                        {selected.map((text) => (
                            <Chip key={text} label={t(`components.facet.${text}`)} />
                        ))}
                    </Box>
                )}
            >
                {texts.map((text: string) => (
                    <MenuItem key={text} value={text}>
                        <Checkbox checked={selectedText.includes(text)} size="small" />
                        <ListItemText primary={t(`components.facet.${text}`)} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TextType;
