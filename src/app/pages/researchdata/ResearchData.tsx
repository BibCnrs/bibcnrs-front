import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './ResearchData.scss';
import SearchBar from '../../components/searchbar/SearchBar';
import { RouteResearchData, getNumber, getString, updatePageQueryUrl, useSearchParams } from '../../shared/Routes';
import { search } from '../../services/metadore/Metadore';
import Loading from '../../components/utils/loading/Loading';
import Table from '../../components/table/Table';
import TableMetadore from '../../components/table/displayelement/TableMetadore';
import { TableArgsProps } from '../../shared/types/props.types';
import { MetadoreDataType } from '../../shared/types/data.types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ResearchData() {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = translator();

    const [first, setFirst] = useState<boolean>(true);
    const [args, setArgs] = useState<TableArgsProps>({
        value: getString(query, 'q', undefined),
        page: getNumber(query, 'page', 1),
        perPage: getNumber(query, 'perPage', 25),
    });

    const { data, isFetching, isLoading } = useQuery<MetadoreDataType, any, MetadoreDataType, any>({
        queryKey: ['metadore', args.value, args.page, args.perPage],
        queryFn: async () => {
            if (!first) {
                updatePageQueryUrl(RouteResearchData, navigate, {
                    q: args.value,
                    page: args.page,
                    perPage: args.perPage,
                });
            } else {
                setFirst(false);
            }
            if (!args.value || !args.perPage || !args.page) {
                return {
                    results: [],
                    totalHits: 0,
                    maxPage: 1,
                    currentPage: 1,
                } as MetadoreDataType;
            }
            return await search(args.value, args.perPage, args.page);
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div>
            <PageTitle page={'researchData'} t={t} />
            <SearchBar
                placeholder={t('pages.researchData.searchBar')}
                value={query.get('q')}
                onSearch={(value) => {
                    setArgs({
                        ...args,
                        page: 1,
                        value,
                    });
                }}
            />
            <div id="app">
                {isLoading || isFetching ? (
                    <Loading />
                ) : (
                    <Table
                        DisplayElement={TableMetadore}
                        results={data?.results}
                        args={args}
                        setArgs={setArgs}
                        total={data?.totalHits}
                        t={t}
                    />
                )}
            </div>
        </div>
    );
}
