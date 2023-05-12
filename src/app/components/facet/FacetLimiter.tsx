import DateRange from './element/DateRange';
import TextType from './element/TextType';
import Divider from '@mui/material/Divider';
import type { FacetLimiterProps } from '../../shared/types/props.types';

const FacetLimiter = ({ available, active }: FacetLimiterProps) => {
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
        textType = (
            <TextType
                texts={texts}
                initial={initial}
                onChange={(value) => {
                    console.log(value);
                }}
            />
        );
        divider = true;
    }

    let dateRage = null;
    if (available.dateRange) {
        let initial: number[] | undefined = undefined;
        if (active && active.dateRange) {
            initial = [active.dateRange.from, active.dateRange.to];
        }
        dateRage = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <DateRange
                    min={available.dateRange.from}
                    max={available.dateRange.to}
                    initial={initial}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
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
