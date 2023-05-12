import { ResearchDataSkeleton } from './ResearchDataSkeleton';
import Skeleton from '@mui/material/Skeleton';

const ArticleSkeleton = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 10 }}>
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    style={{ marginLeft: '-2rem' }}
                    width={300}
                    height={1055}
                />
            </div>
            <div style={{ width: '100%' }}>
                <ResearchDataSkeleton />
            </div>
        </div>
    );
};

export default ArticleSkeleton;
