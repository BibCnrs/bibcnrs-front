import './scss/TableList.scss';
import { ArticleContext } from '../../../pages/search/article/Article';
import { retrieve as retrieveFn } from '../../../services/search/Article';
import { ArticleContentGetter } from '../../../services/search/Article';
import { useTranslator } from '../../../shared/locales/I18N';
import { BibContext } from '../../internal/provider/ContextProvider';
import OpenAccess from '../icon/OpenAccess';
import OpenablePaper from '../paper/openable/OpenablePaper';
import SkeletonEntry from '../skeleton/SkeletonEntry';
import Checkbox from '@mui/material/Checkbox';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { ArticleResultDataType } from '../../../shared/types/data.types';
import type { ArticleRetrieveDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';
import type { ChangeEvent } from 'react';

const ExportCheckbox = ({ getter }: { getter: ArticleContentGetter }) => {
    const { exports, setExports } = useContext(ArticleContext);
    const id = getter.getId();
    const exportLinks = getter.getExportLink() ?? { bibtex: '', ris: '' };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
            setExports([
                ...exports,
                {
                    id,
                    ...exportLinks,
                },
            ]);
            return;
        }
        setExports(exports.filter((value) => value.id !== id));
    };

    return (
        <Checkbox
            sx={{ padding: 0, marginTop: '-2px', marginRight: 1 }}
            size="small"
            onChange={handleOnChange}
            checked={exports.findIndex((value) => value.id === id) >= 0}
        />
    );
};

const NoAccessArticle = ({ getter }: { getter: ArticleContentGetter }) => {
    const t = useTranslator();
    const urls = getter.getPublisherURL();
    const languages = getter.getLanguages();
    return (
        <OpenablePaper
            Title={
                <>
                    <ExportCheckbox getter={getter} />
                    <div className="table-list-title link">
                        {getter.getId()}. {getter.getTitle()} [{getter.getType()}]{' '}
                        <i>({t('components.table.content.noAccess')})</i>
                    </div>
                </>
            }
            SmallBody={null}
            FullBody={
                <dl className="table-list-body">
                    {urls && urls.length > 0 ? (
                        <span>
                            <dt>{t('components.table.content.publisherUrl')}</dt>
                            <dd>
                                {urls.map((urlEntry) => (
                                    <a className="link" key={urlEntry} href={urlEntry} target="_blank" rel="noreferrer">
                                        {urlEntry}
                                    </a>
                                ))}
                            </dd>
                        </span>
                    ) : null}
                    {languages ? (
                        <span>
                            <dt>{t('components.table.content.languages')}</dt>
                            <dd>
                                {languages.map((lang) => (
                                    <div key={lang}>{lang}</div>
                                ))}
                            </dd>
                        </span>
                    ) : null}
                    <span>
                        <dt>{t('components.table.content.accessNumber')}</dt>
                        <dd>{getter.getAN()}</dd>
                    </span>
                    <span>
                        <dt>{getter.getDatabase()}</dt>
                        <dd>{getter.getDBID()}</dd>
                    </span>
                </dl>
            }
            small
        />
    );
};

const Article = ({
    getter,
    open,
    isWaiting,
    onChange,
}: {
    getter: ArticleContentGetter;
    open: boolean;
    isWaiting: boolean;
    onChange: (isOpen: boolean) => void;
}) => {
    const t = useTranslator();
    const { search } = useContext(BibContext);
    const authors = getter.getAuthors();
    const doi = getter.getDOI();
    const source = getter.getSource();
    const href = getter.proxify(getter.getHref(), search.domain);
    const openAccess = getter.isOpenAccess();

    return (
        <OpenablePaper
            onChange={onChange}
            defaultOpenState={open}
            Title={
                <>
                    <ExportCheckbox getter={getter} />
                    <a
                        className="table-list-title link"
                        href={href ? href : '#'}
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                    >
                        {getter.getId()}. {getter.getTitle()} [{getter.getType()}]
                    </a>
                    {openAccess ? <OpenAccess className="table-icon table-icon-oa" /> : null}
                </>
            }
            SmallBody={
                <div className="table-list-body">
                    {authors ? <div>{authors.join(', ')}</div> : null}
                    {source ? <div>{source}</div> : null}
                    {doi ? (
                        <div>
                            {t('components.table.content.doiColon')} {doi}
                        </div>
                    ) : null}
                </div>
            }
            FullBody={
                isWaiting ? (
                    <SkeletonEntry animation="pulse" height={450} />
                ) : (
                    <dl className="table-list-body">
                        {getter.getAllItems().map((entry) => {
                            if (entry.label === 'Access URL') {
                                return (
                                    <span key={entry.label}>
                                        <dt>{entry.label}</dt>
                                        <dd>
                                            {entry.content.map((value) => {
                                                const link = getter.proxify({ url: value, name: value }, search.domain);
                                                if (!link) {
                                                    return null;
                                                }
                                                return (
                                                    <div key={value}>
                                                        <a className="link" href={link}>
                                                            {value}
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </dd>
                                    </span>
                                );
                            }
                            return (
                                <span key={entry.label}>
                                    <dt>{entry.label}</dt>
                                    <dd>
                                        {entry.content.map((value) => (
                                            <div key={value}>{value}</div>
                                        ))}
                                    </dd>
                                </span>
                            );
                        })}
                    </dl>
                )
            }
        />
    );
};

const TableArticle = ({ data: dataIn }: TableDisplayElementProps<ArticleResultDataType>) => {
    const { search } = useContext(BibContext);
    const [retrieve, setRetrieve] = useState(false);
    const [missing, setMissing] = useState(false);
    const [first, setFirst] = useState(true);
    const [getter, setGetter] = useState(new ArticleContentGetter(dataIn, null));
    const [open, setOpen] = useState(false);

    const {
        data: dataRetrieve,
        isFetching,
        isLoading,
        isSuccess,
    } = useQuery<ArticleRetrieveDataType, any, ArticleRetrieveDataType, any>({
        queryKey: ['article_retrieve', missing, search.domain, dataIn.dbId, dataIn.an],
        queryFn: async () => {
            if (missing && search.domain) {
                return retrieveFn(search.domain, dataIn.dbId, dataIn.an);
            }
            return null;
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    const handleOpen = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen && !missing) {
            setMissing(true);
        }
    };

    useEffect(() => {
        if (!dataIn.authors || !dataIn.source) {
            setMissing(true);
        }
        setFirst(false);
    }, [dataIn]);

    useEffect(() => {
        if (isSuccess) {
            setRetrieve(true);
            setGetter(new ArticleContentGetter(dataIn, dataRetrieve));
        }
    }, [dataIn, dataRetrieve, isSuccess]);

    if (((missing && !retrieve) || first || isFetching || isLoading || !getter) && !open) {
        return <SkeletonEntry animation="pulse" />;
    }

    if (!getter.getAuthors() || !getter.getSource()) {
        return <NoAccessArticle getter={getter} />;
    }

    return <Article onChange={handleOpen} open={open} getter={getter} isWaiting={isFetching || isLoading} />;
};

export default TableArticle;
