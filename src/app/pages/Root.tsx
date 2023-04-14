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
        queryFn: home,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div>
            <div className="header-footer">
                <SearchBar
                    placeholder={t('pages.article.searchBar')}
                    onSearch={(v) => {
                        // eslint-disable-next-line no-console
                        console.log(v);
                    }}
                />
            </div>
            <div id="app">
                <RenderContent data={data} displayTitle page="root" updateDocumentTitle showDate={false} />
            </div>
        </div>
    );
};

export default Root;
