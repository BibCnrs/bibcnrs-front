import './TableHistory.scss';
import { translator } from '../../../shared/locales/I18N';
import { BibContext } from '../../provider/ContextProvider';
import { useContext } from 'react';
import type { HistoryEntryDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const TableHistory = ({ data, first, last, index }: TableDisplayElementProps<HistoryEntryDataType>) => {
    const t = translator();
    const { theme } = useContext(BibContext);
    const getClassName = () => {
        let className = 'table-history';
        if (theme === 'light') {
            if (index % 2 === 0) {
                className += ' table-history-grey';
            }
        } else {
            className += ' table-history-dark';
            if (index % 2 === 0) {
                className += ' table-history-grey-dark';
            }
        }
        if (last) {
            className += ' table-history-last';
        }
        return className;
    };

    return (
        <>
            {first ? (
                <div className="table-history table-history-first">
                    <div className="table-history-box">{t('components.table.content.term')}</div>
                    <div className="table-history-box">{t('components.table.content.domain')}</div>
                    <div className="table-history-box">{t('components.table.content.limiters')}</div>
                    <div className="table-history-box">{t('components.table.content.facets')}</div>
                </div>
            ) : null}
            <div className={getClassName()}>
                <div className="table-history-box">{data.event.queries[0].term}</div>
                <div className="table-history-box">{data.event.domain}</div>
                <div className="table-history-box">{data.event.limiters.fullText ? 'Full Text' : ''}</div>
                <div className="table-history-box">{JSON.stringify(data.event.activeFacets)}</div>
            </div>
        </>
    );
};

export default TableHistory;
