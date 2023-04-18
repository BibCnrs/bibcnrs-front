import { AnimatedPaperProps } from '../../shared/types/props.types';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const AnimatedPaper = ({ className, sx, onClick, children }: AnimatedPaperProps) => {
    const [elevation, setElevation] = useState<number>(1);
    return (
        <Paper
            className={className}
            sx={sx}
            onMouseOver={() => setElevation(4)}
            onMouseOut={() => setElevation(1)}
            elevation={elevation}
            onClick={onClick}
        >
            {children}
        </Paper>
    );
};

export default AnimatedPaper;
