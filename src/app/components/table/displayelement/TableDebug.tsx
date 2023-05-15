import OpenablePaper from '../../paper/openable/OpenablePaper';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

if (import.meta.env.VITE_ENV === 'prod') {
    console.warn('TableDebug have been imported, please create a element to replace it!');
}

const TableDebug = ({ data, debugKey, last, first, index }: TableDisplayElementProps<any>) => {
    return (
        <OpenablePaper
            Title={
                <p>
                    key: {JSON.stringify(debugKey)}, last: {JSON.stringify(last)}, first: {JSON.stringify(first)},
                    index: {JSON.stringify(index)}
                </p>
            }
            SmallBody={<p>Table debug format, open to see data receive.</p>}
            FullBody={<div>{JSON.stringify(data)}</div>}
        />
    );
};

export default TableDebug;
