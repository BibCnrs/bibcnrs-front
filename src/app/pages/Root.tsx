import './Root.scss';
import AlertPaper from '../components/paper/alert/AlertPaper';
import RenderContent from '../components/rendercontent/RenderContent';
import SearchBar from '../components/searchbar/SearchBar';
import { alert, home } from '../services/common/CMS';
import { useTranslator } from '../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { CMSResultDataType } from '../shared/types/data.types';

const Root = () => {
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
