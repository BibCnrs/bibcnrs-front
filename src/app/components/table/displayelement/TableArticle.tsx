import './scss/TableList.scss';
import { retrieve as retrieveFn } from '../../../services/search/Article';
import { useTranslator } from '../../../shared/locales/I18N';
import OpenablePaper from '../../paper/openable/OpenablePaper';
import { BibContext } from '../../provider/ContextProvider';
import SkeletonEntry from '../../skeleton/SkeletonEntry';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import type { ArticleRetrieveItemDataType } from '../../../shared/types/data.types';
import type { ArticleResultDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const NoAccessArticle = ({ data }: { data: ArticleResultDataType }) => {
    const t = useTranslator();
    const urls = data.articleLinks.urls.filter((entry) => entry.name === 'Publisher URL');
    return (
        <OpenablePaper
            Title={
                <div className="table-list-title">
                    {data.title} <i>({t('components.table.content.noAccess')})</i>
                </div>
            }
            SmallBody={null}
            FullBody={
                <>
                    <dl className="table-list-body">
                        {urls.length > 0 ? (
                            <span>
                                <dt>{t('components.table.content.publisherUrl')}</dt>
                                <dd>
                                    {urls.map((urlEntry) => (
                                        <a
                                            className="link"
                                            key={urlEntry.name}
                                            href={urlEntry.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {urlEntry.url}
                                        </a>
                                    ))}
                                </dd>
                            </span>
                        ) : null}
                        {data.languages ? (
                            <span>
                                <dt>{t('components.table.content.languages')}</dt>
                                <dd>
                                    {data.languages.map((lang) => (
                                        <div key={lang}>{lang}</div>
                                    ))}
                                </dd>
                            </span>
                        ) : null}
                        <span>
                            <dt>{t('components.table.content.accessNumber')}</dt>
                            <dd>{data.an}</dd>
                        </span>
                        <span>
                            <dt>{t('components.table.content.dbId')}</dt>
                            <dd>{data.dbId}</dd>
                        </span>
                    </dl>
                    {data.raw ? (
                        <dl className="table-list-body">
                            {data.raw.items.map((value) => (
                                <span key={value.name + value.label}>
                                    <dt>{value.label}</dt>
                                    <dd>{JSON.stringify(value.value)}</dd>
                                </span>
                            ))}
                        </dl>
                    ) : null}{' '}
                </>
            }
            small
        />
    );
};

const Article = ({ data }: { data: ArticleResultDataType }) => {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    const t = useTranslator();
    const getContent = (value: ArticleRetrieveItemDataType, index: number) => {
        if (Array.isArray(value.value)) {
            const v1 = value.value[0];
            if (typeof v1 === 'string') {
                return <Fragment key={value.label}>{value.value.join(', ')}</Fragment>;
            }
            if (Array.isArray(v1)) {
                const v2 = v1[0];
                if (typeof v2 === 'string') {
                    return <Fragment key={`${value.label}-${index}`}>{v1.join(', ')}</Fragment>;
                }
                // @ts-expect-error
                if (v2.url) {
                    return (
                        <Fragment key={`${value.label}-${index}`}>
                            {v1.map((url: any) => (
                                <a className="link" key={url.value} href={url.url} target="_blank" rel="noreferrer">
                                    {url.value}
                                </a>
                            ))}
                        </Fragment>
                    );
                }
                // @ts-expect-error
                if (v2.term) {
                    return (
                        <Fragment key={`${value.label}-${index}`}>
                            {v1.map((author: any) => {
                                if (typeof author === 'string') {
                                    return <Fragment key={`${author}-${index}`}>{author}</Fragment>;
                                }
                                return <Fragment key={`${author.term}-${index}`}>{author.term}</Fragment>;
                            })}
                        </Fragment>
                    );
                }
            }
        }
        return <Fragment key={`${value.label}-${index}`}>{JSON.stringify(value)}</Fragment>;
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    };
    return (
        <OpenablePaper
            Title={
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="table-list-title link" href={'#'} target="_blank" rel="noreferrer noopener nofollow">
                    {data.title}
                </a>
            }
            SmallBody={
                <div className="table-list-body">
                    <div>{data.authors.join(', ')}</div>
                    <div>{data.source}</div>
                    <div>
                        {t('components.table.content.doiColon')} {data.doi}
                    </div>
                </div>
            }
            FullBody={
                data.raw ? (
                    <dl className="table-list-body">
                        {data.raw.items.map((value, index) => (
                            <span key={`${value.name}-${value.label}`}>
                                <dt>{value.label}</dt>
                                <dd>{getContent(value, index)}</dd>
                            </span>
                        ))}
                    </dl>
                ) : null
            }
        />
    );
};

const TableArticle = ({ data: dataIn }: TableDisplayElementProps<ArticleResultDataType>) => {
    const { search } = useContext(BibContext);
    const [retrieve, setRetrieve] = useState(false);
    const [missing, setMissing] = useState(false);
    const [first, setFirst] = useState(true);

    const {
        data: dataRetrieve,
        isFetching,
        isLoading,
        isSuccess,
    } = useQuery<ArticleResultDataType, any, ArticleResultDataType, any>({
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

    const data = useMemo(() => {
        if (retrieve) {
            return {
                ...dataIn,
                ...dataRetrieve,
            } as ArticleResultDataType;
        }
        return dataIn;
    }, [dataIn, dataRetrieve, retrieve]);

    useEffect(() => {
        if (!data.authors || !data.doi || !data.source || !data.raw) {
            setMissing(true);
        }
        setFirst(false);
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            setRetrieve(true);
        }
    }, [isSuccess]);

    if ((missing && !retrieve) || first || isFetching || isLoading) {
        return <SkeletonEntry animation="pulse" />;
    }

    if (!data.authors || !data.doi || !data.source) {
        return <NoAccessArticle data={data} />;
    }

    return <Article data={data} />;
};

export default TableArticle;
