import './RenderContent.scss';
import { getLanguageKey } from '../../shared/locales/I18N';
import PageDate from '../utils/PageDate';
import PageTitle from '../utils/PageTitle';
import type { RenderContentProps } from '../../shared/types/props.types';

/**
 * Component used to create CMS pages
 * @param data                - CMS Content
 * @param updateDocumentTitle - Boolean used to enable document title update
 *                              - Default: false
 * @param displayTitle        - Boolean used to enable addition of a h1 element containing the page title
 *                              - Default: false
 * @param page                - Page name key
 * @param t                   - Translation function
 * @param showDate            - Boolean used to add the data of creation at the end of the page
 * @param Container           - Component container only use if the data element have something to display
 */
const RenderContent = ({
    data,
    updateDocumentTitle = false,
    displayTitle = false,
    page,
    showDate = false,
    t,
    Container,
}: RenderContentProps) => {
    // Returns an empty page when data is empty,
    // this empty page contains only the page title.
    if (!data || data.length < 1) {
        const children = (
            <>
                {updateDocumentTitle ? <PageTitle page={page} t={t} /> : <PageTitle />}
                {displayTitle ? <h1>{t(`pages.${page}.title`)}</h1> : <></>}
            </>
        );
        if (Container && displayTitle) {
            return <Container>{children}</Container>;
        }

        return children;
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

    const children = (
        <>
            {updateDocumentTitle ? <PageTitle customTitle={true} page={content.title} /> : <PageTitle />}
            {displayTitle ? <h1>{content.title}</h1> : <></>}
            <div className="cms-content" dangerouslySetInnerHTML={{ __html: content.text }}></div>
            {showDate ? <PageDate date={content.date} /> : <></>}
        </>
    );

    if (Container) {
        return <Container>{children}</Container>;
    }

    return children;
};

export default RenderContent;
