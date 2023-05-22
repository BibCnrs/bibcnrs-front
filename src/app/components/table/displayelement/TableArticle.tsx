import './scss/TableList.scss';
import { retrieve as retrieveFn } from '../../../services/search/Article';
import { ArticleContentGetter } from '../../../services/search/Article';
import { useTranslator } from '../../../shared/locales/I18N';
import OpenablePaper from '../../paper/openable/OpenablePaper';
import { BibContext } from '../../provider/ContextProvider';
import SkeletonEntry from '../../skeleton/SkeletonEntry';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { ArticleResultDataType } from '../../../shared/types/data.types';
import type { ArticleRetrieveDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const NoAccessArticle = ({ getter }: { getter: ArticleContentGetter }) => {
    const t = useTranslator();
    const urls = getter.getPublisherURL();
    const languages = getter.getLanguages();
    return (
        <OpenablePaper
            Title={
                <div className="table-list-title">
                    {getter.getTitle()} [{getter.getType()}] <i>({t('components.table.content.noAccess')})</i>
                </div>
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

    const authors = getter.getAuthors();
    const doi = getter.getDOI();
    const source = getter.getSource();
    return (
        <OpenablePaper
            onChange={onChange}
            defaultOpenState={open}
            Title={
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="table-list-title link" href={'#'} target="_blank" rel="noreferrer noopener nofollow">
                    {getter.getTitle()} [{getter.getType()}]
                </a>
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
                        {getter.getAllItems().map((entry) => (
                            <span key={entry.label}>
                                <dt>{entry.label}</dt>
                                <dd>
                                    {entry.content.map((value) => (
                                        <div key={value}>{value}</div>
                                    ))}
                                </dd>
                            </span>
                        ))}
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
        queryKey: ['article_retrieve', missing, search.article.domain, dataIn.dbId, dataIn.an],
        queryFn: async () => {
            if (missing) {
                if (search.article.domain) {
                    return await retrieveFn(search.article.domain, dataIn.dbId, dataIn.an);
                }
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