import SkeletonEntry from './SkeletonEntry';
import Skeleton from '@mui/material/Skeleton';

const TableSkeleton = () => {
    return (
        <>
            <Skeleton variant="rounded" animation="wave" width={300} height={40} style={{ marginBottom: 25 }} />
            <div>
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
                <SkeletonEntry />
            </div>
            <Skeleton variant="rounded" animation="wave" width={300} height={40} style={{ marginBottom: 25 }} />
        </>
    );
};

export default TableSkeleton;
