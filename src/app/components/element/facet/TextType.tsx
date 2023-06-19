import './scss/TextType.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import type { FacetTextTypeProps } from '../../../shared/types/props.types';
import type { ChangeEvent } from 'react';

const TextType = ({ texts, initial, onChange }: FacetTextTypeProps) => {
    const t = useTranslator();
    const [selectedText, setSelectedText] = useState<string[]>(initial ?? []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean, text: string) => {
        if (checked) {
            if (selectedText.includes(text)) {
                return;
            }
            const values = [...selectedText, text];
            setSelectedText(values);
            onChange(values);
            return;
        }
        if (selectedText.includes(text)) {
            const values = selectedText.filter((value) => value !== text);
            setSelectedText(values);
            onChange(values);
            return;
        }
        setSelectedText([]);
        onChange([]);
    };

    return (
        <FormControl id="facet-text-type" className="facet-field" size="small">
            {texts.map((text: string) => (
                <FormControlLabel
                    key={text}
                    control={
                        <Checkbox
                            onChange={(event, checked) => {
                                handleChange(event, checked, text);
                            }}
                            checked={selectedText.includes(text)}
                            size="small"
                        />
                    }
                    label={t(`components.facet.${text}`)}
                />
            ))}
        </FormControl>
    );
};

export default TextType;
