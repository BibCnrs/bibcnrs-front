import { PageDateProps } from '../../shared/types/props.types';

export default function PageDate(props: PageDateProps) {
    const date = new Date(props.date).toLocaleDateString();
    return (
        <p>
            <i>{`${props.t('components.pageDate.updateAt')} ${date}`}</i>
        </p>
    );
}
