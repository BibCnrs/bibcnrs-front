import PageTitle from '../../../components/internal/PageTitle';
import TestsNews from '../../../components/pages/testsnews/TestsNews';
import { news } from '../../../services/user/TestsNews';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { TestsNewsDataType } from '../../../shared/types/data.types';

const News = () => {
    const t = useTranslator();

    const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
        queryKey: ['news'],
        queryFn: news,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page="news" />
            <h1>{t('pages.news.title')}</h1>
            <TestsNews data={data} />
        </div>
    );
};

export default News;
