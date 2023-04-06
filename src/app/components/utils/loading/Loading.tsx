import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loading.scss';

export default function Loading() {
    return (
        <Box className="loading">
            <div></div>
            <CircularProgress />
            <div></div>
        </Box>
    );
}