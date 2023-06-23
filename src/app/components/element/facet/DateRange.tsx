import './scss/DateRange.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import { memo, useState } from 'react';
import type { FacetDateRangeProps } from '../../../shared/types/props.types';
import type { SyntheticEvent, KeyboardEvent } from 'react';

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

    const handleChipChange = (border: 0 | 1, newRange: number) => {
        if (border === 0) {
            setRange([newRange, range[1]]);
        } else {
            setRange([range[0], newRange]);
        }
    };

    const handleCommitted = (event: Event | SyntheticEvent | undefined, committedRange: number[] | number) => {
        if (!Array.isArray(committedRange)) {
            return;
        }
        onChange(committedRange);
    };

    const handleChipCommitted = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let rangeTmp = range;
            if (rangeTmp[1] < rangeTmp[0]) {
                rangeTmp = [rangeTmp[1], rangeTmp[0]];
            }
            if (rangeTmp[0] === rangeTmp[1]) {
                rangeTmp = [rangeTmp[0], rangeTmp[1] + 1];
            }
            setRange(rangeTmp);
            handleCommitted(undefined, rangeTmp);
        }
    };

    return (
        <div className="facet-field">
            <label>
                {t('components.facet.date')}
                <div id="facet-date-range">
                    <Chip
                        label={
                            <input
                                className="mono facet-date-range-input"
                                type="number"
                                name="date-range-lower"
                                value={range[0]}
                                onKeyUp={handleChipCommitted}
                                onChange={(event) => {
                                    handleChipChange(0, parseInt(event.target.value, 10));
                                }}
                            />
                        }
                    />
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
                    <Chip
                        label={
                            <input
                                className="mono facet-date-range-input"
                                type="number"
                                name="date-range-lower"
                                value={range[1]}
                                onKeyUp={handleChipCommitted}
                                onChange={(event) => {
                                    handleChipChange(1, parseInt(event.target.value, 10));
                                }}
                            />
                        }
                    />
                </div>
            </label>
        </div>
    );
};

export default memo(DateRange);
