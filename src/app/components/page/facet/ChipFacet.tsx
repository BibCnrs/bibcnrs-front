import { useTranslator } from '../../../shared/locales/I18N';
import styled from '@mui/material/styles/styled';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { memo, useMemo } from 'react';
import type { ChipFacetProps } from '../../../shared/types/props.types';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.1),
        '&:not(:first-of-type)': {
            marginLeft: '10px',
            borderLeftColor: '#fff',
            borderRadius: '5px',
        },
        '&:first-of-type': {
            borderRadius: '5px',
        },
    },
}));

const StyledToggleButton = styled(ToggleButton)(() => ({
    '&.MuiToggleButton-root': {
        textTransform: 'initial',
        fontWeight: '500',
        color: '#fff',
        borderColor: '#fff',
        padding: '5px 20px',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#0050a0',
        backgroundColor: '#fff',
    },
}));

const ChipFacet = ({ value, values, onChange, needTranslation = false }: ChipFacetProps) => {
    const t = useTranslator();

    const formattedValues = useMemo(() => {
        if (values.length > 0) {
            return values.map((v) => {
                if (typeof v === 'string') {
                    return {
                        label: v,
                        value: v,
                    };
                }
                return v;
            });
        }
        return [];
    }, [values]);

    return (
        <StyledToggleButtonGroup size="small" value={value} exclusive onChange={onChange}>
            {formattedValues.map((v) => (
                <StyledToggleButton key={v.value} value={v.value}>
                    {needTranslation ? t(`components.facet.chips.${v.label}`) : v.label}
                </StyledToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
};

export default memo(ChipFacet);
