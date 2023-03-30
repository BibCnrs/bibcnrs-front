import { translator } from '../../shared/locales/I18N';
import PageTitle from '../../components/utils/PageTitle';
import './ResearchData.scss';
import SearchBar from '../../components/searchbar/SearchBar';
import { RouteResearchData, updatePageQueryUrl, useSearchParams } from '../../shared/Routes';
import { useState } from 'react';
import { search } from '../../services/metadore/Metadore';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/utils/loading/Loading';
import Table from '../../components/table/Table';
import TableMetadore from '../../components/table/displayelement/TableMetadore';
import { TableArgsProps } from '../../shared/types/props.types';
import { useQuery } from '@tanstack/react-query';
import { MetadoreDataType } from '../../shared/types/data.types';

export default function ResearchData() {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = translator();

    const [args, setArgs] = useState<TableArgsProps>({
        value: '',
        page: 1,
        perPage: 25,
        disableUrlUpdate: true,
    });

    const { data, isFetching, isLoading } = useQuery<MetadoreDataType, any, MetadoreDataType, any>({
        queryKey: ['metadore', args.value, args.page, args.perPage],
        queryFn: async () => {
            if (!args.disableUrlUpdate)
                updatePageQueryUrl(RouteResearchData, navigate, {
                    q: args.value,
                    page: args.page,
                    perPage: args.perPage,
                });
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
                onSearch={(value, disableUrlUpdate) => {
                    setArgs({
                        ...args,
                        page: 1,
                        value,
                        disableUrlUpdate,
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
