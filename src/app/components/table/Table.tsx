import { PaginationComponentProps, TableProps } from '../../shared/types/props.types';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import './Table.scss';

function PaginationComponent(props: PaginationComponentProps) {
    const { total, resultParPage, currentPage, onChange } = props;
    const page = currentPage ? currentPage : 1;
    const perPage = resultParPage ? resultParPage : 25;
    return (
        <div className="pagination">
            {total === 0 ? (
                <span>0-0 / 0</span>
            ) : (
                <span className="current-page">
                    {1 + (page - 1) * perPage}-{Math.min(1 + page * perPage, total)} / {total}
                </span>
            )}
            <Pagination
                onChange={(event, newPage) => {
                    onChange(newPage, perPage);
                }}
                color="primary"
                className="page-selector"
                count={Math.ceil(total / perPage)}
                page={page}
            />
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
}

export default function Table(props: TableProps) {
    const { results, DisplayElement, total, args, setArgs, t } = props;
    const onChange = (currentPage: number, resultParPage: number) =>
        setArgs({ ...args, perPage: resultParPage, page: currentPage });
    return (
        <div>
            {results === undefined || total === undefined ? (
                <></>
            ) : (
                <>
                    <PaginationComponent
                        currentPage={args.page}
                        onChange={onChange}
                        resultParPage={args.perPage}
                        total={total}
                    />
                    <div>
                        {total !== 0 ? (
                            results.map((result: any, index: number) => <DisplayElement key={index} data={result} />)
                        ) : (
                            <p>{t('components.table.noData')}</p>
                        )}
                    </div>
                    <PaginationComponent
                        currentPage={args.page}
                        onChange={onChange}
                        resultParPage={args.perPage}
                        total={total}
                    />
                </>
            )}
        </div>
    );
}
