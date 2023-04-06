import { getLanguageKey, translator } from '../shared/locales/I18N';
import PageTitle from '../components/utils/PageTitle';
import SearchBar from '../components/searchbar/SearchBar';
import './Root.scss';
import { home } from '../services/cms/CMS';
import { CMSResultDataType } from '../shared/types/data.types';
import { useQuery } from '@tanstack/react-query';

function RenderContent({ data }: any) {
    if (!data || data.length < 1) {
        return (
            <div id="app">
                <PageTitle />
                <h1>BibCNRS</h1>
            </div>
        );
    }

    const content = {
        title: data[0].name_fr,
        text: data[0].content_fr,
    };
    if (getLanguageKey() === 'en') {
        content.title = data[0].name_en;
        content.text = data[0].content_en;
    }
    return (
        <div id="app">
            <PageTitle customTitle={true} page={content.title} />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <div dangerouslySetInnerHTML={{ __html: content.text }}></div>
        </div>
    );
}

export default function Root() {
    const t = translator();

    const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
        queryKey: ['home'],
        queryFn: async () => {
            return await home();
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    return (
        <div>
            <SearchBar
                placeholder={t('pages.article.searchBar')}
                onSearch={(v) => {
                    // eslint-disable-next-line no-console
                    console.log(v);
                }}
            />
            <RenderContent data={data} />
        </div>
    );
}
