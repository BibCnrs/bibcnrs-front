import Skeleton from '@mui/material/Skeleton';
import type { SkeletonProps } from '@mui/material/Skeleton';

const SkeletonEntry = ({ animation = 'wave', height = 75 }: Pick<SkeletonProps, 'animation'> & { height?: number }) => {
    return <Skeleton variant="rounded" animation={animation} height={height} style={{ margin: '0 15px 20px' }} />;
};

export default SkeletonEntry;
