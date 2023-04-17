import { CMSDataType, CMSResultDataType } from '../../shared/types/data.types';
import { faq } from '../../services/cms/CMS';
import PageTitle from '../../components/utils/PageTitle';
import { getLanguageKey, translator } from '../../shared/locales/I18N';
import OpenablePaper from '../../components/openablepaper/OpenablePaper';
import { useQuery } from '@tanstack/react-query';

const FaqEntry = ({ data }: { data: CMSDataType }) => {
    const language = getLanguageKey();
    if (language === 'en') {
        return (
            <OpenablePaper
                Title={<>{data.name_en}</>}
                SmallBody={null}
                FullBody={<div dangerouslySetInnerHTML={{ __html: data.content_en }}></div>}
            />
        );
    }
    return (
        <OpenablePaper
            Title={<>{data.name_fr}</>}
            SmallBody={null}
            FullBody={<div dangerouslySetInnerHTML={{ __html: data.content_fr }}></div>}
        />
    );
};

const Faq = () => {
    const t = translator();
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
            <PageTitle t={t} page="faq" />
            {data ? data.map((value) => <FaqEntry data={value} />) : null}
        </div>
    );
};

export default Faq;
