import { PageDateProps } from '../../shared/types/props.types';
import { translator } from '../../shared/locales/I18N';

/**
 * Utils component use to display a date from an ISO valid string
 * @param date
 * @param t
 * @param props Component parameters containing the date
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
