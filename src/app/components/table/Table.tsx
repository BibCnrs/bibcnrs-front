import './Table.scss';
import { PaginationComponentProps, TableProps } from '../../shared/types/props.types';
import { translator } from '../../shared/locales/I18N';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';

/**
 * Pagination component use by Table.
 * @param props Component parameters containing the action function and the stats of the Table component.
 * @see PaginationComponentProps
 * @see Table
 */
const PaginationComponent = ({ total, resultsPerPage, currentPage, onChange }: PaginationComponentProps) => {
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
        </div>
    );
};

/**
 * Table component use to display search results.
 * @param results
 * @param DisplayElement
 * @param total
 * @param args
 * @param setArgs
 * @param t
 * @param props Component parameters containing the results to display,
 * the React element uses to display those results and display options.
 * @see TableProps
 */
const Table = ({ results, DisplayElement, total, args, setArgs }: TableProps) => {
    const t = translator();

    // Update args parameters when we change page or results per page
    const onChange = (currentPage: number, resultsPerPage: number) =>
        setArgs({ ...args, perPage: resultsPerPage, page: currentPage });

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
                    />
                    {/* Display the results with the React component given in parameter or display no data if the total is equals to 0 */}
                    <div>
                        {total !== 0 ? (
                            results.map((result: any, index: number) => <DisplayElement key={index} data={result} />)
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
