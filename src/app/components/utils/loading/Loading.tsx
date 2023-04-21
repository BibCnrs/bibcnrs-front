import './Loading.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Center circular progress bar
 */
const Loading = () => {
    return (
        <Box className="loading">
            <CircularProgress />
        </Box>
    );
};

export default Loading;
