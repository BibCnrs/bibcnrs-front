import { PageDateProps } from '../../shared/types/props.types';

/**
 * Utils component use to display a date from an ISO valid string
 * @param props Component parameters containing the date
 */
export default function PageDate(props: PageDateProps) {
    const date = new Date(props.date).toLocaleDateString();
    return (
        <p>
            <i>{`${props.t('components.pageDate.updateAt')} ${date}`}</i>
        </p>
    );
}
