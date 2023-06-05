import './scss/TableHistory.scss';
import { HistoryContext } from '../../../pages/user/history/History';
import { useTranslator } from '../../../shared/locales/I18N';
import CustomButton from '../../custom/button/CustomButton';
import { BibContext } from '../../provider/ContextProvider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useContext } from 'react';
import type { ArticleFacetsKeyDataType } from '../../../shared/types/data.types';
import type {
    HistoryEntryDataType,
    HistoryEntryLimiterDataType,
    HistoryEntryFacetsDataType,
} from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';
import type { SearchContextType } from '../../../shared/types/types';

const Limiters = ({ data }: { data: HistoryEntryLimiterDataType }) => {
    const t = useTranslator();
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
    const t = useTranslator();
    if (!data) {
        return null;
    }
    const keys = Object.keys(data) as ArticleFacetsKeyDataType[];
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

const convertFacet = (array: string[]): FacetEntry[] => {
    return array.map<FacetEntry>((value) => {
        return {
            name: value,
            count: 0,
        };
    });
};

const TableHistory = ({ data, first, last, index }: TableDisplayElementProps<HistoryEntryDataType>) => {
    const t = useTranslator();
    const { theme } = useContext(BibContext);
    const { handleDeleteEntry } = useContext(HistoryContext);
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const param: SearchContextType['article'] = {
        facets: undefined,
        limiters: {
            fullText: data.event.limiters.fullText,
            openAccess: data.event.limiters.openAccess,
            reviewed: data.event.limiters.peerReviewed,
        },
        orderBy: data.event.sort,
        table: {
            page: 1,
            perPage: data.event.resultPerPage,
        },
    };

    if (data.event.limiters.publicationDate.from && data.event.limiters.publicationDate.to) {
        param.limiters = {
            ...param.limiters,
            dateRange: {
                from: data.event.limiters.publicationDate.from,
                to: data.event.limiters.publicationDate.to,
            },
        };
    }

    if (data.event.activeFacets) {
        param.facets = {};
        if (data.event.activeFacets.SourceType) {
            param.facets.source = convertFacet(data.event.activeFacets.SourceType);
        }
        if (data.event.activeFacets.SubjectEDS) {
            param.facets.subject = convertFacet(data.event.activeFacets.SubjectEDS);
        }
        if (data.event.activeFacets.Journal) {
            param.facets.journal = convertFacet(data.event.activeFacets.Journal);
        }
        if (data.event.activeFacets.Language) {
            param.facets.language = convertFacet(data.event.activeFacets.Language);
        }
        if (data.event.activeFacets.RangeLexile) {
            param.facets.lexile = convertFacet(data.event.activeFacets.RangeLexile);
        }
        if (data.event.activeFacets.CollectionLibrary) {
            param.facets.collection = convertFacet(data.event.activeFacets.CollectionLibrary);
        }
        if (data.event.activeFacets.Publisher) {
            param.facets.publisher = convertFacet(data.event.activeFacets.Publisher);
        }
        if (data.event.activeFacets.ContentProvider) {
            param.facets.provider = convertFacet(data.event.activeFacets.ContentProvider);
        }
    }

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
                <div className="table-history-box">
                    <ul>
                        <li>
                            <b>{t('components.table.content.nbResult')}</b>
                            {` ${data.event.totalHits}`}
                        </li>
                    </ul>
                    <div className="table-history-box-actions-buttons">
                        <CustomButton
                            className="table-history-box-actions-button"
                            size="small"
                            onClick={() => {
                                handleDeleteEntry(data.id);
                            }}
                        >
                            <DeleteOutlineIcon />
                        </CustomButton>
                        <CustomButton className="table-history-box-actions-button" size="small">
                            <OpenInNewIcon />
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableHistory;
