import { translator } from '../shared/locales/I18N';
import SearchBar from '../components/searchbar/SearchBar';
import './Root.scss';
import { home } from '../services/cms/CMS';
import { CMSResultDataType } from '../shared/types/data.types';
import RenderContent from '../components/rendercontent/RenderContent';
import { useQuery } from '@tanstack/react-query';

const Root = () => {
    const t = translator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['home'],
        queryFn: async () => {
            return await home();
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <>
            <SearchBar
                placeholder={t('pages.article.searchBar')}
                onSearch={(v) => {
                    // eslint-disable-next-line no-console
                    console.log(v);
                }}
            />
            <div id="app">
                <RenderContent
                    data={data}
                    displayTitle={true}
                    page="root"
                    updateDocumentTitle={true}
                    t={t}
                    showDate={false}
                />
            </div>
        </>
    );
};

export default Root;
