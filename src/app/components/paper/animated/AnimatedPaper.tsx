import ColoredPaper from '../colored/ColoredPaper';
import { useState } from 'react';
import type { AnimatedPaperProps } from '../../../shared/types/props.types';

const AnimatedPaper = ({ children, ...props }: AnimatedPaperProps) => {
    const [elevation, setElevation] = useState<number>(1);
    return (
        <ColoredPaper
            {...props}
            onMouseOver={() => setElevation(4)}
            onMouseOut={() => setElevation(1)}
            elevation={elevation}
        >
            {children}
        </ColoredPaper>
    );
};

export default AnimatedPaper;
