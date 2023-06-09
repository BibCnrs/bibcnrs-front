import './Resources.scss';
import ColoredPaper from '../../../components/element/paper/colored/ColoredPaper';
import PageTitle from '../../../components/internal/PageTitle';
import { getInstituteColor } from '../../../components/internal/provider/LocalizedThemeProvider';
import { resources } from '../../../services/common/Resources';
import { useLanguageKey, useTranslator } from '../../../shared/locales/I18N';
import { useQuery } from '@tanstack/react-query';
import type { ResourcesDataType } from '../../../shared/types/data.types';

const DisplayResources = ({ data }: { data: ResourcesDataType | undefined }) => {
    const language = useLanguageKey();

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div id="resources">
            {data.map((resource) => (
                <ColoredPaper
                    elevation={2}
                    key={resource.id}
                    color={getInstituteColor(resource.community)}
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
    const t = useTranslator();
    const { data } = useQuery<ResourcesDataType, any, ResourcesDataType, any>({
        queryKey: ['resources'],
        queryFn: resources,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div id="app">
            <PageTitle page="resources" />
            <h1>{t('pages.resources.title')}</h1>
            <DisplayResources data={data} />
        </div>
    );
};

export default Resources;
