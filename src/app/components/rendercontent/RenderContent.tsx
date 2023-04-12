import PageTitle from '../utils/PageTitle';
import { getLanguageKey } from '../../shared/locales/I18N';
import { RenderContentProps } from '../../shared/types/props.types';
import PageDate from '../utils/PageDate';

/**
 * Component use to create CMS pages
 * @param data
 * @param updateDocumentTitle
 * @param displayTitle
 * @param page
 * @param t
 * @param showDate
 * @param props Components parameter who contains data and options
 */
const RenderContent = ({ data, updateDocumentTitle, displayTitle, page, t, showDate }: RenderContentProps) => {
    // Return an empty page when data is empty,
    // this empty page contains only the page title.
    if (!data || data.length < 1) {
        return (
            <div id="app">
                <PageTitle page={page} t={t} />
                {displayTitle ? <h1>{t(`pages.${page}.title`)}</h1> : <></>}
            </div>
        );
    }

    // Get the page content in French
    const content = {
        title: data[0].name_fr,
        text: data[0].content_fr,
        date: data[0].from,
    };

    // Change the page content if the page is set to English
    if (getLanguageKey() === 'en') {
        content.title = data[0].name_en;
        content.text = data[0].content_en;
    }

    return (
        <div>
            {updateDocumentTitle ? (
                <PageTitle customTitle={true} page={content.title} />
            ) : (
                <PageTitle page={page} t={t} />
            )}
            {displayTitle ? <h1>{content.title}</h1> : <></>}
            <div dangerouslySetInnerHTML={{ __html: content.text }}></div>
            {showDate ? <PageDate date={content.date} t={t} /> : <></>}
        </div>
    );
};

export default RenderContent;
