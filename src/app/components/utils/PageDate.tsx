import { translator } from '../../shared/locales/I18N';
import type { PageDateProps } from '../../shared/types/props.types';

/**
 * Utils component use to display a date from an ISO valid string
 * @param date          - Date object who need to be display
 * @param updateAtLabel - Boolean who add an `update at` label
 *                        - Default: false
 */
const PageDate = ({ date, updateAtLabel = false }: PageDateProps) => {
    const t = translator();
    const formattedDate = new Date(date).toLocaleDateString();
    if (updateAtLabel) {
        return <i>{`${t('components.pageDate.updateAt')} ${formattedDate}`}</i>;
    }
    return <i>{formattedDate}</i>;
};

export default PageDate;
