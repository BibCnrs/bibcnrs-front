import { useTranslator } from '../../shared/locales/I18N';
import { memo, useEffect } from 'react';
import type { PageTitleProps } from '../../shared/types/props.types';

/**
 * Utils component used to update the document title
 */
const PageTitle = ({ customTitle, page }: PageTitleProps) => {
    const t = useTranslator();

    useEffect(() => {
        if (customTitle && page) {
            window.document.title = `BibCNRS - ${page}`;
            return;
        }
        if (page) {
            window.document.title = `BibCNRS - ${t(`pages.${page}.title`)}`;
            return;
        }
        window.document.title = 'BibCNRS';
    }, [customTitle, page, t]);

    return null;
};

export default memo(PageTitle);
