import { AnimatedPaperProps } from '../../../shared/types/props.types';
import ColoredPaper from '../colored/ColoredPaper';
import { useState } from 'react';

const AnimatedPaper = ({ className, onClick, children, color, border }: AnimatedPaperProps) => {
    const [elevation, setElevation] = useState<number>(1);
    return (
        <ColoredPaper
            className={className}
            onMouseOver={() => setElevation(4)}
            onMouseOut={() => setElevation(1)}
            elevation={elevation}
            onClick={onClick}
            color={color}
            border={border}
        >
            {children}
        </ColoredPaper>
    );
};

export default AnimatedPaper;
