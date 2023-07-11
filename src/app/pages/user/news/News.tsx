import PageTitle from '../../../components/internal/PageTitle';
import RenderNews from '../../../components/page/render/RenderNews';
import { news } from '../../../services/user/TestsNews';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { Pages } from '../../../services/user/TestsNews';
import type { TestsNewsDataType } from '../../../shared/types/data.types';

const News = ({ page }: { page: Pages }) => {
    const t = useTranslator();

    const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
        queryKey: [page],
        queryFn: () => news(page),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page={page} />
            <h1>{t(`pages.${page}.title`)}</h1>
            <RenderNews data={data} />
        </div>
    );
};

export default News;
