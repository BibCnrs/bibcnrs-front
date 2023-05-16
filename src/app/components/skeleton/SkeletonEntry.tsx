import Skeleton from '@mui/material/Skeleton';
import type { SkeletonProps } from '@mui/material/Skeleton';

const SkeletonEntry = ({ animation = 'wave' }: Pick<SkeletonProps, 'animation'>) => {
    return <Skeleton variant="rounded" animation={animation} height={75} style={{ margin: '0 15px 20px' }} />;
};

export default SkeletonEntry;
