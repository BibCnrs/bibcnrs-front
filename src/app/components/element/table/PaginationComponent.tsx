import './scss/PaginationComponent.scss';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import { memo } from 'react';
import type { PaginationComponentProps } from '../../../shared/types/props.types';
import type { SelectChangeEvent } from '@mui/material/Select';

/**
 * Pagination component used by Table.
 * @param total          - Total number of elements
 * @param resultsPerPage - Number of elements per page
 * @param currentPage    - Current page
 * @param onChange       - Event called when the page or number of elements per page is updated
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
    const perPage = resultsPerPage ? resultsPerPage : 20;
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
            {/* Pagination component used to show and change the current page */}
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
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
            {extend}
        </div>
    );
};

export default memo(PaginationComponent);
