import { PaginationComponentProps, TableProps } from '../../shared/types/props.types';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import './Table.scss';

function PaginationComponent(props: PaginationComponentProps) {
    const { total, resultParPage, currentPage, onChange } = props;

    return (
        <div className="pagination">
            <span className="current-page">
                {1 + (currentPage - 1) * resultParPage}-{Math.min(1 + currentPage * resultParPage, total)} / {total}
            </span>
            <Pagination
                onChange={(event, page) => {
                    onChange(page, resultParPage);
                }}
                color="primary"
                className="page-selector"
                count={Math.ceil(total / resultParPage)}
                page={currentPage}
            />
            <FormControl size="small">
                <Select
                    onChange={(event: SelectChangeEvent<number>) => {
                        onChange(1, event.target.value as number);
                    }}
                    autoWidth
                    value={resultParPage}
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
}

export default function Table(props: TableProps) {
    const { results, DisplayElement, total, args, setArgs, t } = props;
    const realTotal = total ? total : 0;
    const onChange = (currentPage: number, resultParPage: number) =>
        setArgs({ ...args, perPage: resultParPage, page: currentPage });
    return (
        <div>
            <PaginationComponent
                currentPage={args.page}
                onChange={onChange}
                resultParPage={args.perPage}
                total={realTotal}
            />
            <div>
                {results ? (
                    results.map((result: any, index: number) => <DisplayElement key={index} data={result} />)
                ) : (
                    <p>{t('')}</p>
                )}
            </div>
            <PaginationComponent
                currentPage={args.page}
                onChange={onChange}
                resultParPage={args.perPage}
                total={realTotal}
            />
        </div>
    );
}
