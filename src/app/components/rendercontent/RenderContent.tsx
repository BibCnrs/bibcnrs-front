import PageTitle from '../utils/PageTitle';
import { getLanguageKey } from '../../shared/locales/I18N';
import { RenderContentProps } from '../../shared/types/props.types';
import PageDate from '../utils/PageDate';

export default function RenderContent(props: RenderContentProps) {
    const { data, updateDocumentTitle, displayTitle, page, t, showDate } = props;
    if (!data || data.length < 1) {
        return (
            <div id="app">
                <PageTitle page={page} t={t} />
                {displayTitle ? <h1>{t(`pages.${page}.title`)}</h1> : <></>}
            </div>
        );
    }

    const content = {
        title: data[0].name_fr,
        text: data[0].content_fr,
        date: data[0].from,
    };
    if (getLanguageKey() === 'en') {
        content.title = data[0].name_en;
        content.text = data[0].content_en;
    }
    return (
        <div id="app">
            {updateDocumentTitle ? (
                <PageTitle customTitle={true} page={content.title} />
            ) : (
                <PageTitle page={page} t={t} />
            )}
            {displayTitle ? <h1>{t(`pages.${page}.title`)}</h1> : <></>}
            <div dangerouslySetInnerHTML={{ __html: content.text }}></div>
            {showDate ? <PageDate date={content.date} t={t} /> : <></>}
        </div>
    );
}
