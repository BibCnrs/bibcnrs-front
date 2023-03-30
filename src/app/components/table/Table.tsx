import { TableProps } from '../../shared/types/props.types';

export default function Table(props: TableProps) {
    const { results, DisplayElement } = props;
    return (
        <div>
            {results.map((result: any, index: number) => (
                <DisplayElement key={index} data={result} />
            ))}
        </div>
    );
}
