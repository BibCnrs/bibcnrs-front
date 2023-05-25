import TableSkeleton from './TableSkeleton';
import { memo } from 'react';

const ResearchDataSkeleton = () => {
    return (
        <div>
            <TableSkeleton />
        </div>
    );
};

export default memo(ResearchDataSkeleton);
