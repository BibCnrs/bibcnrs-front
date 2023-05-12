import './scss/DateRange.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import type { FacetDateRangeProps } from '../../../shared/types/props.types';
import type { SyntheticEvent } from 'react';

const DateRange = ({ min, max, initial, onChange, minDistance = 1 }: FacetDateRangeProps) => {
    const t = useTranslator();

    const [range, setRange] = useState<number[]>(initial ?? [min, max]);

    const handleChange = (event: Event, newRange: number[] | number, activeThumb: number) => {
        if (!Array.isArray(newRange)) {
            return;
        }

        if (activeThumb === 0) {
            setRange([Math.min(newRange[0], range[1] - minDistance), range[1]]);
        } else {
            setRange([range[0], Math.max(newRange[1], range[0] + minDistance)]);
        }
    };

    const handleCommitted = (event: Event | SyntheticEvent, committedRange: number[] | number) => {
        if (!Array.isArray(committedRange)) {
            return;
        }
        onChange(committedRange);
    };

    return (
        <div className="facet-field">
            <label>
                {t('components.facet.date')}
                <div id="facet-date-range">
                    <Chip label={range[0]} />
                    <Slider
                        id="facet-date-range-slider"
                        getAriaLabel={() => 'Minimum distance'}
                        value={range}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={min}
                        max={max}
                        disableSwap
                        onChangeCommitted={handleCommitted}
                    />
                    <Chip label={range[1]} />
                </div>
            </label>
        </div>
    );
};

export default DateRange;
