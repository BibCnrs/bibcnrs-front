import './Article.scss';
import Facet from '../../../components/facet/Facet';
import { BibContext } from '../../../components/provider/ContextProvider';
import SearchBar from '../../../components/searchbar/SearchBar';
import ArticleSkeleton from '../../../components/skeleton/ArticleSkeleton';
import TableDebug from '../../../components/table/displayelement/TableDebug';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { article } from '../../../services/search/Article';
import { getDomains, getFavoriteDomain } from '../../../services/user/Session';
import { useTranslator } from '../../../shared/locales/I18N';
import { getNumber, getString, RouteArticle, updatePageQueryUrl, useSearchParams } from '../../../shared/Routes';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ArticleParam } from '../../../services/search/Article';
import type { ArticleDataType } from '../../../shared/types/data.types';
import type { FacetProps } from '../../../shared/types/props.types';
import type { TableArgsProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';
import type { Institute } from '../../../shared/types/types';

const Article = () => {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = useTranslator();
    const { search, setSearch } = useContext(BibContext);

    const [first, setFirst] = useState<boolean>(true);

    const { data, isFetching, isLoading } = useQuery<ArticleDataType, any, ArticleDataType, any>({
        queryKey: [
            'article',
            search.query,
            search.article.domain,
            search.article.orderBy,
            search.article.limiters,
            search.article.facets,
            search.article.table.page,
            search.article.table.perPage,
        ],
        queryFn: async () => {
            if (
                (!search.query && search.query !== '') ||
                !search.article.domain ||
                !search.article.table.perPage ||
                !search.article.table.page
            ) {
                return null;
            }
            return await article(
                search.article.domain,
                search.query,
                search.article.table.page,
                search.article.table.perPage,
                {
                    orderBy: search.article.orderBy,
                    limiters: search.article.limiters,
                    facets: search.article.facets,
                },
            );
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    const handleSearch = (value: string): void => {
        setSearch({
            ...search,
            query: value,
            article: {
                domain: search.article.domain,
                orderBy: search.article.orderBy,
                table: {
                    page: 1,
                    perPage: search.article.table.perPage,
                },
            },
        });
    };

    const handleFacets = (values: Omit<ArticleParam, 'orderBy'>) => {
        setSearch({
            ...search,
            article: {
                ...search.article,
                facets: values.facets,
                limiters: values.limiters,
            },
        });
    };

    const handleTable = (tableArgs: TableArgsProps) => {
        setSearch({
            ...search,
            article: {
                ...search.article,
                table: tableArgs,
            },
        });
    };

    useEffect(() => {
        if (first) {
            const queryValue = getString<undefined>(query, 'q', search.query);
            let domain: string | undefined = getFavoriteDomain();
            if (domain === undefined) {
                const domains = getDomains();
                if (domains === undefined || domains.length === 0) {
                    throw new Error(`No domain found for this user: ${getFavoriteDomain()}, ${domains}`);
                }
                domain = domains[0];
            }
            setSearch({
                ...search,
                query: queryValue,
                article: {
                    domain: domain as Institute,
                    orderBy: 'relevance',
                    table: {
                        page: getNumber(query, 'page', 1),
                        perPage: getNumber(query, 'perPage', 25),
                    },
                },
            });
            setFirst(false);
        } else {
            const param: any = {};

            if (search.query) {
                param.q = search.query;
            }

            if (search.metadore.table.page) {
                param.page = search.article.table.page;
            }

            if (search.metadore.table.perPage) {
                param.perPage = search.article.table.perPage;
            }

            updatePageQueryUrl(RouteArticle, navigate, param);
        }
    }, [first, navigate, query, search, setSearch]);

    const getAvailable = (result: ArticleDataType | undefined) => {
        const available: Partial<FacetProps['available']> = {};
        available.limiters = {
            fullText: true,
            openAccess: true,
            reviewed: true,
        };
        if (result) {
            available.limiters.dateRange = {
                from: result.dateRange.min,
                to: result.dateRange.max,
            };
            result.facets.forEach((value) => {
                if (available.facets === undefined) {
                    available.facets = {};
                }
                const values = value.AvailableFacetValues.map<FacetEntry>(
                    (entry): FacetEntry => ({
                        name: entry.Value,
                        count: entry.Count,
                    }),
                );
                switch (value.Id) {
                    case 'CollectionLibrary':
                        available.facets.collection = values;
                        break;
                    case 'ContentProvider':
                        available.facets.provider = values;
                        break;
                    case 'Journal':
                        available.facets.journal = values;
                        break;
                    case 'Language':
                        available.facets.language = values;
                        break;
                    case 'Publisher':
                        available.facets.publisher = values;
                        break;
                    case 'RangeLexile':
                        available.facets.lexile = values;
                        break;
                    case 'SourceType':
                        available.facets.source = values;
                        break;
                    case 'SubjectEDS':
                        available.facets.subject = values;
                        break;
                }
            });
        }
        return available;
    };

    const getActive = () => {
        const active: Partial<FacetProps['active']> = {
            limiters: search.article.limiters,
            facets: search.article.facets,
        };
        if (!active.limiters) {
            active.limiters = {
                fullText: true,
            };
        }
        return active;
    };

    return (
        <div>
            <PageTitle page={'article'} t={t} />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.article.searchBar')}
                    value={query.get('q') || search.query}
                    onSearch={handleSearch}
                />
            </div>
            <div id="app">
                {data ? (
                    <div id="articles-container">
                        <div id="articles-facet">
                            <Facet available={getAvailable(data)} active={getActive()} onChange={handleFacets} />
                        </div>
                        {isLoading || isFetching ? (
                            <ArticleSkeleton />
                        ) : (
                            <Table
                                id="articles-content"
                                DisplayElement={TableDebug}
                                results={data?.results}
                                args={search.article.table}
                                onArgsChange={handleTable}
                                total={data?.totalHits}
                            />
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Article;
