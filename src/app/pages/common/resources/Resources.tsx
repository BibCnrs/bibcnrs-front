import './Resources.scss';
import { ResourcesDataType } from '../../../shared/types/data.types';
import { resources } from '../../../services/common/Resources';
import PageTitle from '../../../components/utils/PageTitle';
import { getLanguageKey, translator } from '../../../shared/locales/I18N';
import ColoredPaper from '../../../components/paper/colored/ColoredPaper';
import { getInstituteColor } from '../../../components/provider/LocalizedThemeProvider';
import { Institute } from '../../../shared/types/types';
import { useQuery } from '@tanstack/react-query';

const DisplayResources = ({ data }: { data: ResourcesDataType | undefined }) => {
    if (!data || data.length === 0) {
        return null;
    }
    const language = getLanguageKey();

    return (
        <div id="resources">
            {data.map((resource) => (
                <ColoredPaper
                    elevation={2}
                    key={resource.id}
                    color={getInstituteColor(resource.community.toLowerCase() as Institute)}
                    className="resource"
                    border
                >
                    <a className="link" href={resource.href} rel="nofollow noreferrer noopener">
                        {language === 'en' ? resource.name_en : resource.name_fr}
                    </a>
                </ColoredPaper>
            ))}
        </div>
    );
};

const Resources = () => {
    const t = translator();
    const { data } = useQuery<ResourcesDataType, any, ResourcesDataType, any>({
        queryKey: ['resources'],
        queryFn: resources,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page="resources" t={t} />
            <h1>{t('pages.resources.title')}</h1>
            <DisplayResources data={data} />
        </div>
    );
};

export default Resources;
