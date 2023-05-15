import './Root.scss';
import AlertPaper from '../components/paper/alert/AlertPaper';
import RenderContent from '../components/rendercontent/RenderContent';
import SearchBar from '../components/searchbar/SearchBar';
import { alert, home } from '../services/common/CMS';
import { useTranslator } from '../shared/locales/I18N';
import { RouteArticle, updatePageQueryUrl } from '../shared/Routes';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { CMSResultDataType } from '../shared/types/data.types';

const Root = () => {
    const navigate = useNavigate();
    const t = useTranslator();

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

    const handleSearch = (q: string) => {
        updatePageQueryUrl(RouteArticle, navigate, { q });
    };

    return (
        <div>
            <div className="header-footer">
                <SearchBar placeholder={t('pages.article.searchBar')} onSearch={handleSearch} />
            </div>
            <div id="app">
                <RenderContent data={alertData} page="root" t={t} Container={AlertPaper} />
                <RenderContent data={homeData} page="root" t={t} />
            </div>
        </div>
    );
};

export default Root;
