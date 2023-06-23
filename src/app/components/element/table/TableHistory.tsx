import './scss/TableHistory.scss';
import { HistoryContext } from '../../../pages/user/history/History';
import { useTranslator } from '../../../shared/locales/I18N';
import { RouteArticle, updatePageQueryUrl } from '../../../shared/Routes';
import { BibContext } from '../../internal/provider/ContextProvider';
import CustomButton from '../button/CustomButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ArticleFacetsKeyDataType } from '../../../shared/types/data.types';
import type {
    HistoryEntryDataType,
    HistoryEntryLimiterDataType,
    HistoryEntryFacetsDataType,
} from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';

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

const createParam = (event: HistoryEntryDataType['event']): any => {
    const param: any = {
        q: event.queries[0].term,
        limiters: {
            fullText: event.limiters.fullText,
            openAccess: event.limiters.openAccess,
            reviewed: event.limiters.peerReviewed,
        },
        orderBy: event.sort,
        page: 1,
        perPage: event.resultPerPage ?? 25,
    };

    if (event.limiters.publicationDate.from && event.limiters.publicationDate.to) {
        param.limiters = {
            ...param.limiters,
            dateRange: {
                from: event.limiters.publicationDate.from,
                to: event.limiters.publicationDate.to,
            },
        };
    }

    if (event.activeFacets) {
        param.facets = {};
        if (event.activeFacets.SourceType) {
            param.facets.source = convertFacet(event.activeFacets.SourceType);
        }
        if (event.activeFacets.SubjectEDS) {
            param.facets.subject = convertFacet(event.activeFacets.SubjectEDS);
        }
        if (event.activeFacets.Journal) {
            param.facets.journal = convertFacet(event.activeFacets.Journal);
        }
        if (event.activeFacets.Language) {
            param.facets.language = convertFacet(event.activeFacets.Language);
        }
        if (event.activeFacets.RangeLexile) {
            param.facets.lexile = convertFacet(event.activeFacets.RangeLexile);
        }
        if (event.activeFacets.CollectionLibrary) {
            param.facets.collection = convertFacet(event.activeFacets.CollectionLibrary);
        }
        if (event.activeFacets.Publisher) {
            param.facets.publisher = convertFacet(event.activeFacets.Publisher);
        }
        if (event.activeFacets.ContentProvider) {
            param.facets.provider = convertFacet(event.activeFacets.ContentProvider);
        }
    }
    return {
        ...param,
        facets: JSON.stringify(param.facets),
        limiters: JSON.stringify(param.limiters),
    };
};

const TableHistory = ({ data, first, last, index }: TableDisplayElementProps<HistoryEntryDataType>) => {
    const t = useTranslator();
    const navigate = useNavigate();
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

    const handleSearch = () => {
        updatePageQueryUrl(RouteArticle, navigate, createParam(data.event));
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
                        <CustomButton className="table-history-box-actions-button" size="small" onClick={handleSearch}>
                            <OpenInNewIcon />
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(TableHistory);
