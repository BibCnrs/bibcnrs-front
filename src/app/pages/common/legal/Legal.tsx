import './Legal.scss';
import { CMSResultDataType } from '../../../shared/types/data.types';
import { legal } from '../../../services/common/CMS';
import RenderContent from '../../../components/rendercontent/RenderContent';
import { translator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';

const Legal = () => {
    const t = translator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['legal'],
        queryFn: legal,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <RenderContent data={data} displayTitle={false} page="legal" updateDocumentTitle showDate={false} t={t} />
        </div>
    );
};

export default Legal;
