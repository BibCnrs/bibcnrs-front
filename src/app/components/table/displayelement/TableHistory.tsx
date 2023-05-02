import './scss/TableHistory.scss';
import { translator } from '../../../shared/locales/I18N';
import { HistoryEntryFacetsKeyDataType } from '../../../shared/types/data.types';
import { BibContext } from '../../provider/ContextProvider';
import { useContext } from 'react';
import type {
    HistoryEntryDataType,
    HistoryEntryLimiterDataType,
    HistoryEntryFacetsDataType,
} from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const Limiters = ({ data }: { data: HistoryEntryLimiterDataType }) => {
    const t = translator();
    return (
        <ul>
            {data.fullText ? (
                <li>
                    <b>{t('ebsco.limiters.fullText')}</b>
                </li>
            ) : null}
            {data.openAccess ? (
                <li>
                    <b>{t('ebsco.limiters.openAccess')}</b>
                </li>
            ) : null}
            {data.peerReviewedArticle ? (
                <li>
                    <b>{t('ebsco.limiters.peerReviewedArticle')}</b>
                </li>
            ) : null}
            {data.publicationDate.from ? (
                <li>
                    <b>{t('ebsco.limiters.publicationDate')}</b>
                    <ul>
                        <li>
                            <i>
                                {data.publicationDate.from}
                                <b>{' → '}</b>
                                {data.publicationDate.to}
                            </i>
                        </li>
                    </ul>
                </li>
            ) : null}
        </ul>
    );
};
const Facets = ({ data }: { data: HistoryEntryFacetsDataType }) => {
    const t = translator();
    if (!data) {
        return <></>;
    }
    const keys = Object.keys(data) as HistoryEntryFacetsKeyDataType[];
    return (
        <>
            {keys.map((key) => (
                <div key={key}>
                    <b>{t(`ebsco.facets.${key}`)}</b>
                    <ul>
                        {data[key].map((facets) => (
                            <li key={facets}>
                                <i>{facets}</i>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

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
                    <div className="table-history-box">
                        <b>{t('components.table.content.term')}</b>
                    </div>
                    <div className="table-history-box">
                        <b>{t('components.table.content.domain')}</b>
                    </div>
                    <div className="table-history-box">
                        <b>{t('components.table.content.limiters')}</b>
                    </div>
                    <div className="table-history-box">
                        <b>{t('components.table.content.facets')}</b>
                    </div>
                    <div className="table-history-box">
                        <b>{t('components.table.content.actions')}</b>
                    </div>
                </div>
            ) : null}
            <div className={getClassName()}>
                <div className="table-history-box">
                    <b>{data.event.queries[0].term}</b>
                </div>
                <div className="table-history-box">
                    <b>{data.event.domain}</b>
                </div>
                <div className="table-history-box">
                    <Limiters data={data.event.limiters} />
                </div>
                <div className="table-history-box">
                    <Facets data={data.event.activeFacets} />
                </div>
                <div className="table-history-box">{'TODO'}</div>
            </div>
        </>
    );
};

export default TableHistory;
