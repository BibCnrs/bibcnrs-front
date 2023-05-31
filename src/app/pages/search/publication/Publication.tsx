import './Publication.scss';
import ChipFacet from '../../../components/facet/ChipFacet';
import Facet from '../../../components/facet/Facet';
import { BibContext, BibContextPublicationDefault } from '../../../components/provider/ContextProvider';
import SearchBar from '../../../components/searchbar/SearchBar';
import SearchSkeleton from '../../../components/skeleton/SearchSkeleton';
import TablePublication from '../../../components/table/displayelement/TablePublication';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { publication } from '../../../services/search/Publication';
import { useDomain, useFacetsCleaner, useFacetsDomainHandler, useServicesCatch } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import {
    getJSON,
    getNumber,
    getString,
    RoutePublication,
    updatePageQueryUrl,
    useSearchParams,
} from '../../../shared/Routes';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PublicationParam } from '../../../services/search/Publication';
import type { PublicationDataType } from '../../../shared/types/data.types';
import type { FacetProps, TableArgsProps } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';

const Publication = () => {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = useTranslator();
    const serviceCatch = useServicesCatch();
    const facetsCleaner = useFacetsCleaner<PublicationParam>();
    const { search, setSearch } = useContext(BibContext);

    const [first, setFirst] = useState<boolean>(true);
    const [seed, setSeed] = useState<number>(0);

    const handleDomain = useFacetsDomainHandler();
    const domains = useDomain();

    const { data, isFetching, isLoading, isError, error } = useQuery<
        PublicationDataType,
        any,
        PublicationDataType,
        any
    >({
        queryKey: [
            'publication',
            search.query,
            search.domain,
            search.publication.limiters,
            search.publication.facets,
            search.publication.table.page,
            search.publication.table.perPage,
        ],
        queryFn: async () => {
            if (
                (!search.query && search.query !== '') ||
                !search.publication.table.perPage ||
                !search.publication.table.page
            ) {
                return null;
            }
            return publication(
                search.domain,
                search.query,
                search.publication.table.page,
                search.publication.table.perPage,
                {
                    limiters: search.publication.limiters,
                    facets: search.publication.facets,
                },
            );
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    useEffect(() => {
        if (isError) {
            serviceCatch(error);
        }
    }, [error, isError, serviceCatch]);

    useEffect(() => {
        if (first) {
            const queryValue = getString<undefined>(query, 'q', search.query);
            setSearch({
                ...search,
                query: queryValue,
                publication: {
                    ...search.publication,
                    limiters: getJSON(query, 'limiters', search.publication.limiters),
                    facets: getJSON(query, 'facets', search.publication.facets),
                    table: {
                        page: getNumber(query, 'page', search.publication.table.page),
                        perPage: getNumber(query, 'perPage', search.publication.table.perPage),
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

        if (search.publication.table.page) {
            param.page = search.publication.table.page;
        }

        if (search.publication.table.perPage) {
            param.perPage = search.publication.table.perPage;
        }

        if (search.publication.limiters) {
            param.limiters = JSON.stringify(search.publication.limiters);
        }

        if (search.publication.facets) {
            param.facets = JSON.stringify(search.publication.facets);
        }
        updatePageQueryUrl(RoutePublication, navigate, param);
    }, [first, navigate, query, search, setSearch]);

    const handleSearch = (value: string | undefined): void => {
        setSearch({
            ...search,
            query: value,
            publication: {
                table: {
                    page: 1,
                    perPage: search.publication.table.perPage,
                },
            },
        });
    };

    const handleReset = () => {
        setSearch({
            ...search,
            publication: BibContextPublicationDefault,
        });
        setSeed(seed + 1);
    };

    const handleFacets = (values: PublicationParam) => {
        facetsCleaner(values);
        setSearch({
            ...search,
            publication: {
                ...search.publication,
                facets: values.facets,
                limiters: values.limiters,
            },
        });
        setSeed(seed + 1);
    };

    const handleTable = (tableArgs: TableArgsProps) => {
        setSearch({
            ...search,
            publication: {
                ...search.publication,
                table: tableArgs,
            },
        });
    };

    const getAvailable = (result: PublicationDataType | undefined) => {
        const available: Partial<FacetProps<PublicationParam>['available']> = {};
        available.limiters = {
            reviewed: true,
        };
        if (result) {
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
                    case 'PublisherPubDb':
                        available.facets.publisher = values;
                        break;
                    case 'SubjectPubDb':
                        available.facets.subject = values;
                        break;
                    case 'TypePublicationPubD':
                        available.facets.type = values;
                        break;
                }
            });
        }
        return available;
    };

    const getActive = () => {
        const active: Partial<FacetProps<PublicationParam>['active']> = {
            limiters: search.publication.limiters,
            facets: search.publication.facets,
        };
        return active;
    };

    return (
        <div>
            <PageTitle page="publication" />
            <div className="header-footer">
                <div id="publication-chips">
                    <ChipFacet value={search.domain} values={domains} onChange={handleDomain} />
                </div>
                <SearchBar
                    placeholder={t('pages.publication.searchBar')}
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
                        DisplayElement={TablePublication}
                        results={data?.results}
                        args={search.publication.table}
                        onArgsChange={handleTable}
                        total={data?.totalHits}
                    />
                )}
            </div>
        </div>
    );
};

export default Publication;
