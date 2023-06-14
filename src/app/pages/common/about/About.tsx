import './About.scss';
import RenderContent from '../../../components/pages/rendercontent/RenderContent';
import { about } from '../../../services/common/CMS';
import { useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { CMSResultDataType } from '../../../shared/types/data.types';

const About = () => {
    const t = useTranslator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['about'],
        queryFn: about,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <RenderContent data={data} page="about" updateDocumentTitle t={t} />
        </div>
    );
};

export default About;
