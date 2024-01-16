/* eslint-disable @typescript-eslint/no-unsafe-return */
const PRESENT = Symbol('PRESENT');
const CALENDAR = Symbol('CALENDAR');

const isNil = (value) => {
    return value === undefined || value === null;
};

const isAfter = (a, b) => {
    if (a.year > b.year) {
        return true;
    } else if (a.year < b.year) {
        return false;
    }

    if (a.month > b.month) {
        return true;
    } else if (a.month < b.month) {
        return false;
    }

    return a.day > b.day;
};
const isBefore = (a, b) => !isAfter(a, b);

const parseCoverageDate = (date) => {
    return {
        day: parseInt(date.day, 10),
        month: parseInt(date.month, 10),
        year: parseInt(date.year, 10),
    };
};
const parseEmbargoValue = (embargo) => {
    const value = embargo.value || 0;

    switch ((embargo.unit || '').toLowerCase()) {
        case 'month':
            return value * 30;
        case 'year':
            return value * 365;
        default:
            return value;
    }
};

const computeCalendarData = (holding) => {
    if (!holding.coverage) {
        return {
            end: {
                day: 1,
                month: 1,
                year: -9999,
            },
            start: {
                day: 31,
                month: 12,
                year: 9999,
            },
        };
    }

    const coverage = holding.coverage[0];

    const start = parseCoverageDate(coverage.start);
    const endValue = parseCoverageDate(coverage.end);
    const end = endValue.year === 9999 ? PRESENT : endValue;
    return {
        end,
        start,
        ...(end === PRESENT && holding.embargo && { embargo: parseEmbargoValue(holding.embargo) }),
    };
};

const shouldKeepAOverBWhenPresent = (a, b) => {
    const aCalendar = a[CALENDAR];
    const bCalendar = b[CALENDAR];

    if (bCalendar.end !== PRESENT && aCalendar.end === PRESENT) {
        // we found an holding with the same start date but present as end date,
        // and our current holding doesn't have present as end date
        // the found holding is kept, the current holding is discarded
        return true;
    }

    if (bCalendar.end === PRESENT && aCalendar.end !== PRESENT) {
        // our current holding has present as end date
        // we found an holding with the same start date, but without present as end date
        // the current holding is kept, the found holding is discarded
        return false;
    }

    if (bCalendar.end === PRESENT && aCalendar.end === PRESENT) {
        // our current holding has present as end date
        // we found an holding with the same start date and present as end date
        // the one with no embargo or with the lowest embargo is kept

        if (bCalendar.embargo && isNil(aCalendar.embargo)) {
            // compare start date
            if (isAfter(bCalendar.start, aCalendar.start)) {
                return true;
            }
        }

        if (isNil(bCalendar.embargo) && aCalendar.embargo) {
            return false;
        }

        if (isNil(bCalendar.embargo) && isNil(aCalendar.embargo)) {
            // compare start date
            if (isAfter(bCalendar.start, aCalendar.start)) {
                return true;
            }
            return false;
        }

        return aCalendar.embargo < bCalendar.embargo;
    }

    return false;
};

const parseFullTextHoldings = (fullTextHoldings = []) => {
    return (
        fullTextHoldings
            .sort((a, b) => {
                let aOA = 0;
                if (a.url) {
                    aOA = a.url.includes('bib.cnrs.fr') ? 1 : 0;
                }

                let bOA = 0;
                if (b.url) {
                    bOA = b.url.includes('bib.cnrs.fr') ? 1 : 0;
                }
                return aOA - bOA;
            })
            .map((d) => ({
                ...d,
                [CALENDAR]: computeCalendarData(d),
            }))
            // we first deduplicate the holdings
            .filter((a, index, array) => {
                return (
                    array.findIndex((b) => {
                        return a[CALENDAR] === b[CALENDAR];
                    }) === index
                );
            })
            // we keep the oldest end date when start dates match
            .filter((holding, index, self) => {
                const holdingsWithSameStartDate = self.filter(
                    (d, i) => d[CALENDAR].start === holding[CALENDAR].start && i !== index,
                );
                return !holdingsWithSameStartDate.find((d) => {
                    if (shouldKeepAOverBWhenPresent(d, holding)) {
                        return true;
                    }

                    // we found an holding with the same start date
                    // if its end date is after our current holding, we keep it
                    if (isAfter(d[CALENDAR].end, holding[CALENDAR].end)) {
                        return true;
                    }

                    // we found an holding with the same start date
                    // but it is not relevant, we discard it
                    return false;
                });
            })
            // we keep the present without embargo
            .filter((holding, index, self) => {
                const holdingsWithSameEndDate = self.filter(
                    (d, i) => d[CALENDAR].end === holding[CALENDAR].end && i !== index,
                );
                return !holdingsWithSameEndDate.find((d) => {
                    return shouldKeepAOverBWhenPresent(d, holding);
                });
            })
            // we keep the oldest start date when end dates match
            .filter((holding, index, self) => {
                const holdingsWithSameEndDate = self.filter(
                    (d, i) => d[CALENDAR].end === holding[CALENDAR].end && i !== index,
                );
                return !holdingsWithSameEndDate.find((d) => {
                    if (shouldKeepAOverBWhenPresent(d, holding)) {
                        return true;
                    }
                    return (
                        isBefore(d[CALENDAR].start, holding[CALENDAR].start) &&
                        d[CALENDAR].end !== PRESENT &&
                        holding[CALENDAR].end !== PRESENT
                    );
                });
            })
            // we keep the max range between overlapping dates
            .filter((holding, index, self) => {
                const isWrappedByOtherHoldingDateRange = self.find((d, i) => {
                    const isOlder =
                        isAfter(d[CALENDAR].end, holding[CALENDAR].end) ||
                        (d[CALENDAR].end === PRESENT && holding[CALENDAR].end !== PRESENT);

                    return isBefore(d[CALENDAR].start, holding[CALENDAR].start) && isOlder && i !== index;
                });

                return !isWrappedByOtherHoldingDateRange;
            })
            .map((d) => {
                delete d[CALENDAR];
                return d;
            })
    );
};

export default parseFullTextHoldings;
