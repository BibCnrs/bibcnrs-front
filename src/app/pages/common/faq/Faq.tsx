import './Faq.scss';
import OpenablePaper from '../../../components/paper/openable/OpenablePaper';
import PageTitle from '../../../components/utils/PageTitle';
import { faq } from '../../../services/common/CMS';
import { useLanguageKey, useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { CMSDataType, CMSResultDataType } from '../../../shared/types/data.types';

const FaqEntry = ({ data }: { data: CMSDataType }) => {
    const language = useLanguageKey();
    if (language === 'en') {
        return (
            <OpenablePaper
                Title={data.name_en}
                SmallBody={null}
                FullBody={<div className="cms-content" dangerouslySetInnerHTML={{ __html: data.content_en }}></div>}
                small
            />
        );
    }
    return (
        <OpenablePaper
            Title={data.name_fr}
            SmallBody={null}
            FullBody={<div className="cms-content" dangerouslySetInnerHTML={{ __html: data.content_fr }}></div>}
            small
        />
    );
};

const Faq = () => {
    const t = useTranslator();
    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['faq'],
        queryFn: faq,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <h1>{t('pages.faq.title')}</h1>
            <PageTitle page="faq" />
            {data ? data.map((value) => <FaqEntry key={value.id} data={value} />) : null}
        </div>
    );
};

export default Faq;
