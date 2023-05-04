import './Table.scss';
import { translator } from '../../shared/locales/I18N';
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import type { PaginationComponentProps, TableProps } from '../../shared/types/props.types';
import type { SelectChangeEvent } from '@mui/material/Select';

/**
 * Pagination component use by Table.
 * @param total          - Total number of element
 * @param resultsPerPage - Number of elements per page
 * @param currentPage    - Current page
 * @param onChange       - Event call went the page or number of elements per page is updated
 * @param extend         - Variable containing elements to display at the end of the pagination
 */
const PaginationComponent = ({
    total,
    resultsPerPage,
    currentPage,
    onChange,
    extend = null,
}: PaginationComponentProps) => {
    // Set the default values if the current page and the number of results per page is not initialized
    const page = currentPage ? currentPage : 1;
    const perPage = resultsPerPage ? resultsPerPage : 25;
    return (
        <div className="pagination">
            {/* Show the current element index and the number of elements found */}
            {total === 0 ? (
                <span className="current-page">0-0 / 0</span>
            ) : (
                <span className="current-page">
                    {1 + (page - 1) * perPage}-{Math.min(1 + page * perPage, total)} / {total}
                </span>
            )}
            {/* Pagination component use to show and change the current page */}
            <Pagination
                onChange={(event, newPage) => {
                    onChange(newPage, perPage);
                }}
                color="primary"
                className="page-selector"
                count={Math.ceil(total / perPage)}
                page={page}
            />
            {/* Show and change select number of results per page */}
            <FormControl size="small">
                <Select
                    onChange={(event: SelectChangeEvent<number>) => {
                        onChange(1, event.target.value as number);
                    }}
                    autoWidth
                    value={perPage}
                    sx={{ borderRadius: '64px' }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
            {extend}
        </div>
    );
};

/**
 * Table component use to display search results and any other results who need a table format.
 * @param results        - Array of objects who need to be display in a table component
 * @param DisplayElement - React component who display the actual result
 * @param total          - Total number of element
 * @param args           - Table args
 * @param setArgs        - Function use to update table args
 * @param header         - Pagination extension use by the top pagination
 */
const Table = ({ results, DisplayElement, total, args, setArgs, header }: TableProps) => {
    const t = translator();

    // Update args parameters when we change page or results per page
    const onChange = (currentPage: number, resultsPerPage: number) => {
        setArgs({ ...args, perPage: resultsPerPage, page: currentPage });
    };

    return (
        <div>
            {/* Display an empty page if results and total are not initialized */}
            {results === undefined || total === undefined ? (
                <></>
            ) : (
                <>
                    {/* Add pagination on top of the results */}
                    <PaginationComponent
                        currentPage={args.page}
                        onChange={onChange}
                        resultsPerPage={args.perPage}
                        total={total}
                        extend={header}
                    />
                    {/* Display the results with the React component given in parameter or display no data if the total is equals to 0 */}
                    <div>
                        {total !== 0 ? (
                            results.map((result: any, index: number) => (
                                <DisplayElement
                                    key={index}
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

export default Table;
