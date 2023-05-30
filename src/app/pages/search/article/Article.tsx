import './Article.scss';
import ChipFacet from '../../../components/facet/ChipFacet';
import Facet from '../../../components/facet/Facet';
import { BibContext, BibContextArticleDefault } from '../../../components/provider/ContextProvider';
import SearchBar from '../../../components/searchbar/SearchBar';
import SearchSkeleton from '../../../components/skeleton/SearchSkeleton';
import TableArticle from '../../../components/table/displayelement/TableArticle';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { article } from '../../../services/search/Article';
import { useDomain, useFacetsCleaner, useFacetsDomainHandler, useServicesCatch } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import {
    getJSON,
    getNumber,
    getString,
    RouteArticle,
    updatePageQueryUrl,
    useSearchParams,
} from '../../../shared/Routes';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ArticleParam, OrderByType } from '../../../services/search/Article';
import type { ArticleDataType } from '../../../shared/types/data.types';
import type { FacetProps } from '../../../shared/types/props.types';
import type { TableArgsProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';

const Article = () => {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = useTranslator();
    const serviceCatch = useServicesCatch();
    const facetsCleaner = useFacetsCleaner<Omit<ArticleParam, 'orderBy'>>();
    const { search, setSearch } = useContext(BibContext);

    const [first, setFirst] = useState<boolean>(true);
    const [seed, setSeed] = useState<number>(0);

    const handleDomain = useFacetsDomainHandler();
    const domains = useDomain();

    const { data, isFetching, isLoading, isError, error } = useQuery<ArticleDataType, any, ArticleDataType, any>({
        queryKey: [
            'article',
            search.query,
            search.domain,
            search.article.orderBy,
            search.article.limiters,
            search.article.facets,
            search.article.table.page,
            search.article.table.perPage,
        ],
        queryFn: async () => {
            if (
                (!search.query && search.query !== '') ||
                !search.domain ||
                !search.article.table.perPage ||
                !search.article.table.page
            ) {
                return null;
            }
            return article(search.domain, search.query, search.article.table.page, search.article.table.perPage, {
                orderBy: search.article.orderBy,
                limiters: search.article.limiters,
                facets: search.article.facets,
            });
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
                orderBy: search.article.orderBy,
                table: {
                    page: 1,
                    perPage: search.article.table.perPage,
                },
            },
        });
    };

    const handleFacets = (values: Omit<ArticleParam, 'orderBy'>) => {
        facetsCleaner(values);
        setSearch({
            ...search,
            article: {
                ...search.article,
                facets: values.facets,
                limiters: values.limiters,
            },
        });
        setSeed(seed + 1);
    };

    const handleReset = () => {
        setSearch({
            ...search,
            article: {
                ...BibContextArticleDefault,
                orderBy: search.article.orderBy,
            },
        });
        setSeed(seed + 1);
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
            setSearch({
                ...search,
                query: queryValue,
                article: {
                    ...search.article,
                    limiters: getJSON(query, 'limiters', search.article.limiters),
                    facets: getJSON(query, 'facets', search.article.facets),
                    orderBy: getString(query, 'orderBy', search.article.orderBy) as OrderByType,
                    table: {
                        page: getNumber(query, 'page', search.article.table.page),
                        perPage: getNumber(query, 'perPage', search.article.table.perPage),
                    },
                },
            });
            setFirst(false);
            return;
        }
        const param: any = {};

        if (search.query) {
            param.q = search.query;
        }

        if (search.article.table.page) {
            param.page = search.article.table.page;
        }

        if (search.article.table.perPage) {
            param.perPage = search.article.table.perPage;
        }

        if (search.article.limiters) {
            param.limiters = JSON.stringify(search.article.limiters);
        }

        if (search.article.facets) {
            param.facets = JSON.stringify(search.article.facets);
        }
        updatePageQueryUrl(RouteArticle, navigate, param);
    }, [first, navigate, query, search, setSearch]);

    useEffect(() => {
        if (isError) {
            serviceCatch(error);
        }
    }, [error, isError, serviceCatch]);

    const getAvailable = (result: ArticleDataType | undefined) => {
        const available: Partial<FacetProps<ArticleParam>['available']> = {};
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
        const active: Partial<FacetProps<ArticleParam>['active']> = {
            limiters: search.article.limiters,
            facets: search.article.facets,
        };
        return active;
    };

    return (
        <div>
            <PageTitle page="article" />
            <div className="header-footer">
                <div id="article-chips">
                    <ChipFacet value={search.domain} values={domains} onChange={handleDomain} />
                </div>
                <SearchBar
                    placeholder={t('pages.article.searchBar')}
                    value={query.get('q') || search.query}
                    onSearch={handleSearch}
                />
            </div>
            <div id="search-container">
                <div id="search-facet">
                    <Facet
                        key={seed}
                        available={getAvailable(data)}
                        active={getActive()}
                        onChange={handleFacets}
                        onReset={handleReset}
                    />
                </div>
                {isLoading || isFetching ? (
                    <SearchSkeleton />
                ) : (
                    <Table
                        id="search-content"
                        DisplayElement={TableArticle}
                        results={data?.results}
                        args={search.article.table}
                        onArgsChange={handleTable}
                        total={data?.totalHits}
                    />
                )}
            </div>
        </div>
    );
};

export default Article;
