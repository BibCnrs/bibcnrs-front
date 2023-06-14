import TableSkeleton from './TableSkeleton';
import { memo } from 'react';

const SearchSkeleton = ({ order }: { order?: boolean }) => {
    return (
        <div id="search-content" style={{ width: '100%' }}>
            <TableSkeleton order={order} />
        </div>
    );
};

export default memo(SearchSkeleton);
