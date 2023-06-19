import DateRange from './DateRange';
import TextType from './TextType';
import Divider from '@mui/material/Divider';
import type { FacetLimiterProps, FacetRequired } from '../../../shared/types/props.types';

const FacetLimiter = ({ available, active, onChange }: FacetLimiterProps<FacetRequired>) => {
    if (!available) {
        return null;
    }

    let divider = false;
    let textType = null;
    if (available.reviewed || available.fullText || available.openAccess) {
        const texts: string[] = [];
        let initial: string[] | undefined = undefined;

        if (available.reviewed) {
            texts.push('reviewed');
        }
        if (available.fullText) {
            texts.push('fullText');
        }
        if (available.openAccess) {
            texts.push('openAccess');
        }

        if (active) {
            initial = [];
            if (active.reviewed) {
                initial.push('reviewed');
            }
            if (active.fullText) {
                initial.push('fullText');
            }
            if (active.openAccess) {
                initial.push('openAccess');
            }
        }

        const handleTextType = (values: string[]) => {
            const set = new Set(values);
            if (active) {
                onChange({
                    dateRange: active.dateRange,
                    fullText: set.has('fullText'),
                    openAccess: set.has('openAccess'),
                    reviewed: set.has('reviewed'),
                });
                return;
            }
            onChange({
                fullText: set.has('fullText'),
                openAccess: set.has('openAccess'),
                reviewed: set.has('reviewed'),
            });
        };

        textType = <TextType texts={texts} initial={initial} onChange={handleTextType} />;
        divider = true;
    }

    let dateRage = null;
    if (available.dateRange) {
        let initial: number[] | undefined = undefined;
        if (active && active.dateRange) {
            initial = [active.dateRange.from, active.dateRange.to];
        }

        const handleDateRange = (value: number[]) => {
            if (active) {
                onChange({
                    ...active,
                    dateRange: {
                        from: value[0],
                        to: value[1],
                    },
                });
                return;
            }
            onChange({
                dateRange: {
                    from: value[0],
                    to: value[1],
                },
            });
        };

        dateRage = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <DateRange min={1000} max={new Date().getFullYear() + 1} initial={initial} onChange={handleDateRange} />
            </>
        );
    }

    return (
        <div>
            {textType}
            {dateRage}
        </div>
    );
};

export default FacetLimiter;
