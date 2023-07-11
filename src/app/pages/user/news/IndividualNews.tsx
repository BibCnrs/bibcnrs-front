import PageTitle from '../../../components/internal/PageTitle';
import RenderIndividualNews from '../../../components/page/render/RenderIndividualNews';
import { newsById } from '../../../services/user/TestsNews';
import { useLanguageKey } from '../../../shared/locales/I18N';
import Error404 from '../../errors/Error404';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { TestNewDataType } from '../../../shared/types/data.types';

const IndividualNews = () => {
    const params = useParams();
    const language = useLanguageKey();

    const id = useMemo(() => {
        if (params.id) {
            return parseInt(params.id, 10);
        }
        return -1;
    }, [params.id]);

    const { data } = useQuery<TestNewDataType, any, TestNewDataType, any>({
        queryKey: ['individual_news'],
        queryFn: () => newsById(id),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return data ? (
        <div id="app">
            <PageTitle customTitle page={language === 'en' ? data.name_en : data.name_fr} />
            <h1>{language === 'en' ? data.name_en : data.name_fr}</h1>
            <RenderIndividualNews {...data} />
        </div>
    ) : (
        <Error404 />
    );
};

export default IndividualNews;
