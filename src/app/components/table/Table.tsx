import { TableProps } from '../../shared/types';

export default function Table(props: TableProps) {
    const { results, DisplayElement } = props;
    return (
        <div>
            {results.map((result: any, index: number) => (
                <DisplayElement key={index} index={index} data={result} />
            ))}
        </div>
    );
}
