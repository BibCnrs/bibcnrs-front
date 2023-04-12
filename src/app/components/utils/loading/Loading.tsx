import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loading.scss';

/**
 * Center circular progress bar
 */
const Loading = () => {
    return (
        <Box className="loading">
            <div></div>
            <CircularProgress />
            <div></div>
        </Box>
    );
};

export default Loading;
