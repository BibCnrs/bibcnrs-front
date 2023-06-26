import SkeletonEntry from './SkeletonEntry';
import Skeleton from '@mui/material/Skeleton';
import { memo } from 'react';

const TableSkeleton = ({ order }: { order?: boolean }) => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Skeleton variant="rounded" animation="wave" width={400} height={40} style={{ marginBottom: 25 }} />
                {order ? (
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={150}
                        height={40}
                        style={{ marginBottom: 25, marginLeft: 'auto', marginRight: '16px' }}
                    />
                ) : null}
            </div>
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
            <Skeleton variant="rounded" animation="wave" width={400} height={40} style={{ marginBottom: 25 }} />
        </>
    );
};

export default memo(TableSkeleton);
