import TestsNews from '../../../components/testsnews/TestsNews';
import PageTitle from '../../../components/utils/PageTitle';
import { tests } from '../../../services/user/TestsNews';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { TestsNewsDataType } from '../../../shared/types/data.types';

const Tests = () => {
    const t = useTranslator();

    const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
        queryKey: ['tests'],
        queryFn: tests,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page="tests" t={t} />
            <h1>{t('pages.tests.title')}</h1>
            <TestsNews data={data} />
        </div>
    );
};

export default Tests;
