import TableSkeleton from './TableSkeleton';
import { memo } from 'react';

const ArticleSkeleton = () => {
    return (
        <div id="articles-content" style={{ width: '100%' }}>
            <TableSkeleton />
        </div>
    );
};

export default memo(ArticleSkeleton);
