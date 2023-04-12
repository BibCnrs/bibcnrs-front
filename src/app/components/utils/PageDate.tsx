import { PageDateProps } from '../../shared/types/props.types';

/**
 * Utils component use to display a date from an ISO valid string
 * @param date
 * @param t
 * @param props Component parameters containing the date
 */
const PageDate = ({ date, t }: PageDateProps) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return (
        <p>
            <i>{`${t('components.pageDate.updateAt')} ${formattedDate}`}</i>
        </p>
    );
};

export default PageDate;
