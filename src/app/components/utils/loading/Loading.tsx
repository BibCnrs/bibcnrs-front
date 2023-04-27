import './Loading.scss';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

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
