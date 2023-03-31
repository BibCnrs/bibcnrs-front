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
import { useState, MouseEvent, useEffect } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.1),
        '&:not(:first-of-type)': {
            marginLeft: '10px',
            borderLeftColor: '#fff',
            borderRadius: '5px',
        },
        '&:first-of-type': {
            borderRadius: '5px',
        },
    },
}));

const StyledToggleButton = styled(ToggleButton)(() => ({
    '&.MuiToggleButton-root': {
        textTransform: 'initial',
        fontWeight: '500',
        color: '#fff',
        borderColor: '#fff',
        padding: '5px 20px',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#0050a0',
        backgroundColor: '#fff',
    },
}));

export default function ResearchData() {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = translator();

    const [first, setFirst] = useState<boolean>(true);
    const [args, setArgs] = useState<TableArgsProps>({
        value: getString<undefined>(query, 'q', undefined),
        page: getNumber(query, 'page', 1),
        perPage: getNumber(query, 'perPage', 25),
        field: getString<null>(query, 'field', null),
    });

    const { data, isFetching, isLoading } = useQuery<MetadoreDataType, any, MetadoreDataType, any>({
        queryKey: ['metadore', args],
        queryFn: async () => {
            if (!args.value || !args.perPage || !args.page) {
                return {
                    results: [],
                    totalHits: 0,
                    maxPage: 1,
                    currentPage: 1,
                } as MetadoreDataType;
            }
            return await search(args.value, args.perPage, args.page, args.field);
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    useEffect(() => {
        if (!first) {
            updatePageQueryUrl(RouteResearchData, navigate, {
                q: args.value,
                page: args.page,
                perPage: args.perPage,
                field: args.field,
            });
        } else {
            setFirst(false);
        }
    }, [args]);

    const handleField = (event: MouseEvent<HTMLElement>, field: string | null): void => {
        setArgs({
            ...args,
            field,
        });
    };

    const handleSearch = (value: string): void => {
        setArgs({
            ...args,
            page: 1,
            value,
        });
    };

    return (
        <div>
            <PageTitle page={'researchData'} t={t} />
            <SearchBar
                placeholder={t('pages.researchData.search.bar')}
                value={query.get('q')}
                onSearch={handleSearch}
            />
            <div id="research-data-chips">
                <StyledToggleButtonGroup size="small" value={args.field} exclusive onChange={handleField}>
                    <StyledToggleButton value="attributes.titles.title">
                        {t('pages.researchData.search.chips.title')}
                    </StyledToggleButton>
                    <StyledToggleButton value="attributes.descriptions.description">
                        {t('pages.researchData.search.chips.description')}
                    </StyledToggleButton>
                    <StyledToggleButton value="attributes.subjects.subject">
                        {t('pages.researchData.search.chips.subject')}
                    </StyledToggleButton>
                    <StyledToggleButton value="attributes.doi">
                        {t('pages.researchData.search.chips.doi')}
                    </StyledToggleButton>
                </StyledToggleButtonGroup>
            </div>
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
