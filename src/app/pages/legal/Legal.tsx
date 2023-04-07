import { translator } from '../../shared/locales/I18N';
import './Legal.scss';
import { CMSResultDataType } from '../../shared/types/data.types';
import { legal } from '../../services/cms/CMS';
import RenderContent from '../../components/rendercontent/RenderContent';
import { useQuery } from '@tanstack/react-query';

export default function Legal() {
    const t = translator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['legal'],
        queryFn: async () => {
            return await legal();
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <RenderContent data={data} displayTitle={true} page="legal" updateDocumentTitle={false} t={t} showDate={true} />
    );
}
