import TableSkeleton from './TableSkeleton';
import { memo } from 'react';

const SearchSkeleton = () => {
    return (
        <div id="search-content" style={{ width: '100%' }}>
            <TableSkeleton />
        </div>
    );
};

export default memo(SearchSkeleton);
