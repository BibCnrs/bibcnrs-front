import './About.scss';
import { translator } from '../../../shared/locales/I18N';
import { CMSResultDataType } from '../../../shared/types/data.types';
import { about } from '../../../services/cms/CMS';
import RenderContent from '../../../components/rendercontent/RenderContent';
import { useQuery } from '@tanstack/react-query';

const About = () => {
    const t = translator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['about'],
        queryFn: about,
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

export default About;
