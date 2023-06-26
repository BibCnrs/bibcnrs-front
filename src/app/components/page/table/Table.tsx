import './Table.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import PaginationComponent from '../../element/table/PaginationComponent';
import md5 from 'md5';
import { memo } from 'react';
import type { TableProps } from '../../../shared/types/props.types';

/**
 * Table component used to display search results and any other results which needs a table format.
 * @param results        - Array of objects which needs to be displayed in a table component
 * @param DisplayElement - React component which displays the actual result
 * @param total          - Total number of elements
 * @param args           - Table args
 * @param setArgs        - Function used to update table args
 * @param header         - Pagination extension used by the top pagination
 */
const Table = ({ id, className, results, DisplayElement, total, args, onArgsChange, header }: TableProps) => {
    const t = useTranslator();

    // Update args parameters when we change page or results per page
    const onChange = (currentPage: number, resultsPerPage: number) => {
        onArgsChange({ ...args, perPage: resultsPerPage, page: currentPage });
    };

    const getDisplayElementKey = (result: any): number | string => {
        if (result.id) {
            return result.id as number | string;
        }
        return md5(JSON.stringify(result));
    };

    return (
        <div id={id} className={className}>
            {/* Display an empty page if results and total are not initialized */}
            {results === undefined || total === undefined ? null : (
                <>
                    {/* Add pagination on top of the results with header */}
                    <PaginationComponent
                        currentPage={args.page}
                        onChange={onChange}
                        resultsPerPage={args.perPage}
                        total={total}
                        extend={header}
                    />
                    {/* Display the results with the React component given in parameter,
                        or display "no data" if the total is equals to 0 */}
                    <div>
                        {total !== 0 ? (
                            results.map((result: any, index: number) => (
                                <DisplayElement
                                    key={getDisplayElementKey(result)}
                                    debugKey={getDisplayElementKey(result)}
                                    data={result}
                                    index={index}
                                    first={index === 0}
                                    last={index === results.length - 1}
                                />
                            ))
                        ) : (
                            <p>{t('components.table.noData')}</p>
                        )}
                    </div>
                    {/* Add pagination on bottom of the results */}
                    <PaginationComponent
                        currentPage={args.page}
                        onChange={onChange}
                        resultsPerPage={args.perPage}
                        total={total}
                    />
                </>
            )}
        </div>
    );
};

export default memo(Table);
