import TestsNews from '../../../components/testsnews/TestsNews';
import PageTitle from '../../../components/utils/PageTitle';
import { news } from '../../../services/user/TestsNews';
import { translator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { TestsNewsDataType } from '../../../shared/types/data.types';

const News = () => {
    const t = translator();

    const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
        queryKey: ['news'],
        queryFn: news,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page="news" t={t} />
            <h1>{t('pages.news.title')}</h1>
            <TestsNews data={data} />
        </div>
    );
};

export default News;
