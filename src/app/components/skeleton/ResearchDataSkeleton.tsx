import Skeleton from '@mui/material/Skeleton';

export const ResearchDataSkeleton = () => {
    return (
        <div>
            <Skeleton variant="rounded" animation="wave" width={300} height={40} style={{ marginBottom: 25 }} />
            <div>
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
                <Skeleton variant="rounded" animation="wave" height={75} style={{ margin: '0 15px 20px' }} />
            </div>
            <Skeleton variant="rounded" animation="wave" width={300} height={40} style={{ marginBottom: 25 }} />
        </div>
    );
};
