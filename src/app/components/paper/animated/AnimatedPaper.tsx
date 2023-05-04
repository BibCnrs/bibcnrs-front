import ColoredPaper from '../colored/ColoredPaper';
import { useState } from 'react';
import type { AnimatedPaperProps } from '../../../shared/types/props.types';

/**
 * Paper component who change is elevation when the cursor is overing it
 * @param children - Paper content
 * @param props - Other paper props pass to the generic paper component
 */
const AnimatedPaper = ({ children, ...props }: AnimatedPaperProps) => {
    const [elevation, setElevation] = useState<number>(1);
    return (
        <ColoredPaper
            {...props}
            onMouseOver={() => {
                setElevation(4);
            }}
            onMouseOut={() => {
                setElevation(1);
            }}
            elevation={elevation}
        >
            {children}
        </ColoredPaper>
    );
};

export default AnimatedPaper;
