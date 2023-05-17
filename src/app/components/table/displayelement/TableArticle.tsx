import './scss/TableList.scss';
import { retrieve as retrieveFn } from '../../../services/search/Article';
import { useTranslator } from '../../../shared/locales/I18N';
import OpenablePaper from '../../paper/openable/OpenablePaper';
import { BibContext } from '../../provider/ContextProvider';
import SkeletonEntry from '../../skeleton/SkeletonEntry';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { ArticleContentGetter } from '../../../services/search/Article';
import type { ArticleResultDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const NoAccessArticle = ({ getter }: { getter: ArticleContentGetter }) => {
    const t = useTranslator();
    // const urls = dataIn.articleLinks.urls.filter((entry) => entry.name === 'Publisher URL');
    return (
        <OpenablePaper
            Title={
                <div className="table-list-title">
                    {getter.getTitle()} <i>({t('components.table.content.noAccess')})</i>
                </div>
            }
            SmallBody={null}
            FullBody={
                <dl className="table-list-body">
                    {/*{urls.length > 0 ? (*/}
                    {/*    <span>*/}
                    {/*        <dt>{t('components.table.content.publisherUrl')}</dt>*/}
                    {/*        <dd>*/}
                    {/*            {urls.map((urlEntry) => (*/}
                    {/*                <a*/}
                    {/*                    className="link"*/}
                    {/*                    key={urlEntry.name}*/}
                    {/*                    href={urlEntry.url}*/}
                    {/*                    target="_blank"*/}
                    {/*                    rel="noreferrer"*/}
                    {/*                >*/}
                    {/*                    {urlEntry.url}*/}
                    {/*                </a>*/}
                    {/*            ))}*/}
                    {/*        </dd>*/}
                    {/*    </span>*/}
                    {/*) : null}*/}
                    {/*{dataIn.languages ? (*/}
                    {/*    <span>*/}
                    {/*        <dt>{t('components.table.content.languages')}</dt>*/}
                    {/*        <dd>*/}
                    {/*            {dataIn.languages.map((lang) => (*/}
                    {/*                <div key={lang}>{lang}</div>*/}
                    {/*            ))}*/}
                    {/*        </dd>*/}
                    {/*    </span>*/}
                    {/*) : null}*/}
                    <span>
                        <dt>{t('components.table.content.accessNumber')}</dt>
                        <dd>{getter.getAN()}</dd>
                    </span>
                    <span>
                        <dt>{t('components.table.content.dbId')}</dt>
                        <dd>{getter.getDBID()}</dd>
                    </span>
                </dl>
            }
            small
        />
    );
};

const Article = ({ getter }: { getter: ArticleContentGetter }) => {
    const t = useTranslator();
    return (
        <OpenablePaper
            Title={
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="table-list-title link" href={'#'} target="_blank" rel="noreferrer noopener nofollow">
                    {getter.getTitle()}
                </a>
            }
            SmallBody={
                <div className="table-list-body">
                    {/*<div>{dataIn.authors.join(', ')}</div>*/}
                    {/*<div>{dataIn.source}</div>*/}
                    <div>
                        {t('components.table.content.doiColon')} {getter.getDOI()}
                    </div>
                </div>
            }
            FullBody={<div>{JSON.stringify(getter)}</div>}
        />
    );
};

const TableArticle = ({ data: dataIn }: TableDisplayElementProps<ArticleResultDataType>) => {
    const { search } = useContext(BibContext);
    const [retrieve, setRetrieve] = useState(false);
    const [missing, setMissing] = useState(false);
    const [first, setFirst] = useState(true);

    const {
        data: dataGetter,
        isFetching,
        isLoading,
        isSuccess,
    } = useQuery<ArticleContentGetter, any, ArticleContentGetter, any>({
        queryKey: ['article_retrieve', missing, search.article.domain, dataIn.dbId, dataIn.an],
        queryFn: async () => {
            if (missing) {
                if (search.article.domain) {
                    const getterProvider = await retrieveFn(search.article.domain, dataIn.dbId, dataIn.an);
                    return getterProvider(dataIn);
                }
            }
            return null;
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    useEffect(() => {
        if (!dataIn.authors || !dataIn.doi || !dataIn.source) {
            setMissing(true);
        }
        setFirst(false);
    }, [dataIn]);

    useEffect(() => {
        if (isSuccess) {
            setRetrieve(true);
        }
    }, [isSuccess]);

    if ((missing && !retrieve) || first || isFetching || isLoading || !dataGetter) {
        return <SkeletonEntry animation="pulse" />;
    }

    if (!dataIn.authors || !dataGetter.getDOI() || !dataIn.source) {
        return <NoAccessArticle getter={dataGetter} />;
    }

    return <Article getter={dataGetter} />;
};

export default TableArticle;
