import './Publication.scss';
import { BibContext } from '../../../components/provider/ContextProvider';
import SearchBar from '../../../components/searchbar/SearchBar';
import PageTitle from '../../../components/utils/PageTitle';
import { publication } from '../../../services/search/Publication';
import { useServicesCatch } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import type { PublicationDataType } from '../../../shared/types/data.types';

const Publication = () => {
    const t = useTranslator();
    const serviceCatch = useServicesCatch();
    const { search, setSearch } = useContext(BibContext);

    const { data, isError, error } = useQuery<PublicationDataType, any, PublicationDataType, any>({
        queryKey: [
            'article',
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
                !search.domain ||
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

    const handleSearch = (value: string): void => {
        setSearch({
            ...search,
            query: value,
            publication: {
                table: {
                    page: 1,
                    perPage: search.article.table.perPage,
                },
            },
        });
    };

    return (
        <div>
            <PageTitle page="publication" />
            <div className="header-footer">
                <SearchBar placeholder={t('pages.publication.searchBar')} onSearch={handleSearch} />
            </div>
            <div id="app">{JSON.stringify(data)}</div>
        </div>
    );
};

export default Publication;
