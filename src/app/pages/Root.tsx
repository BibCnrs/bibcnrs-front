import { translator } from '../shared/locales/I18N';
import SearchBar from '../components/searchbar/SearchBar';
import './Root.scss';
import { alert, home } from '../services/cms/CMS';
import { CMSResultDataType } from '../shared/types/data.types';
import RenderContent from '../components/rendercontent/RenderContent';
import AlertPaper from '../components/paper/alert/AlertPaper';
import { useQuery } from '@tanstack/react-query';

const Root = () => {
    const t = translator();

    const { data: alertData } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['alert'],
        queryFn: alert,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    const { data: homeData } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
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
                <RenderContent data={alertData} page="root" t={t} Container={AlertPaper} />
                <RenderContent data={homeData} page="root" t={t} />
            </div>
        </div>
    );
};

export default Root;
