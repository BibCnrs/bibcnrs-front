import './Legal.scss';
import RenderContent from '../../../components/pages/rendercontent/RenderContent';
import { legal } from '../../../services/common/CMS';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { CMSResultDataType } from '../../../shared/types/data.types';

const Legal = () => {
    const t = useTranslator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['legal'],
        queryFn: legal,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <RenderContent data={data} page="legal" updateDocumentTitle showDate t={t} />
        </div>
    );
};

export default Legal;
