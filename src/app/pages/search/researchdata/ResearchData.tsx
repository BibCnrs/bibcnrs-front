import './ResearchData.scss';
import { BibContext } from '../../../components/provider/ContextProvider';
import SearchBar from '../../../components/searchbar/SearchBar';
import { ResearchDataSkeleton } from '../../../components/skeleton/ResearchDataSkeleton';
import TableMetadore from '../../../components/table/displayelement/TableMetadore';
import Table from '../../../components/table/Table';
import PageTitle from '../../../components/utils/PageTitle';
import { metadore } from '../../../services/search/Metadore';
import { useTranslator } from '../../../shared/locales/I18N';
import { RouteResearchData, getNumber, getString, updatePageQueryUrl, useSearchParams } from '../../../shared/Routes';
import styled from '@mui/material/styles/styled';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MetadoreDataType } from '../../../shared/types/data.types';
import type { TableArgsProps } from '../../../shared/types/props.types';
import type { MouseEvent } from 'react';

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

const ResearchData = () => {
    const navigate = useNavigate();
    const query = useSearchParams();
    const t = useTranslator();
    const { search, setSearch } = useContext(BibContext);

    const [first, setFirst] = useState<boolean>(true);

    const { data, isFetching, isLoading } = useQuery<MetadoreDataType, any, MetadoreDataType, any>({
        queryKey: [
            'metadore',
            search.query,
            search.metadore.field,
            search.metadore.table.page,
            search.metadore.table.perPage,
        ],
        queryFn: async () => {
            if (
                (!search.query && search.query !== '') ||
                !search.metadore.table.perPage ||
                !search.metadore.table.page
            ) {
                return {
                    results: undefined,
                    totalHits: undefined,
                    maxPage: 1,
                    currentPage: 1,
                } as MetadoreDataType;
            }
            return await metadore(
                search.query,
                search.metadore.table.perPage,
                search.metadore.table.page,
                search.metadore.field,
            );
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    useEffect(() => {
        if (first) {
            const queryValue = getString<undefined>(query, 'q', undefined);
            if (search.query && !queryValue) {
                setFirst(false);
                return;
            }
            setSearch({
                ...search,
                query: queryValue,
                metadore: {
                    field: getString<null>(query, 'field', null),
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
                param.page = search.metadore.table.page;
            }

            if (search.metadore.table.perPage) {
                param.perPage = search.metadore.table.perPage;
            }

            if (search.metadore.field) {
                param.field = search.metadore.field;
            }

            updatePageQueryUrl(RouteResearchData, navigate, param);
        }
    }, [first, navigate, query, search, setSearch]);

    const handleField = (event: MouseEvent<HTMLElement>, field: string | null): void => {
        setSearch({
            ...search,
            metadore: {
                field,
                table: search.metadore.table,
            },
        });
    };

    const handleSearch = (value: string): void => {
        setSearch({
            ...search,
            query: value,
            metadore: {
                field: search.metadore.field,
                table: {
                    page: 1,
                    perPage: search.metadore.table.perPage,
                },
            },
        });
    };

    const handleTable = (tableArgs: TableArgsProps) => {
        setSearch({
            ...search,
            metadore: {
                field: search.metadore.field,
                table: tableArgs,
            },
        });
    };

    return (
        <div>
            <PageTitle page={'researchData'} t={t} />
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.researchData.search.bar')}
                    value={query.get('q') || search.query}
                    onSearch={handleSearch}
                />
                <div id="research-data-chips">
                    <span id="research-data-by">{t('pages.researchData.search.chips.by')}</span>
                    <StyledToggleButtonGroup
                        size="small"
                        value={search.metadore.field}
                        exclusive
                        onChange={handleField}
                    >
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
            </div>
            <div id="app">
                {isLoading || isFetching ? (
                    <ResearchDataSkeleton />
                ) : (
                    <Table
                        DisplayElement={TableMetadore}
                        results={data?.results}
                        args={search.metadore.table}
                        onArgsChange={handleTable}
                        total={data?.totalHits}
                    />
                )}
            </div>
        </div>
    );
};

export default ResearchData;
