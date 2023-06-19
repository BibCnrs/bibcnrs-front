import ColoredPaper from '../colored/ColoredPaper';
import { useState } from 'react';
import type { AnimatedPaperProps } from '../../../../shared/types/props.types';

/**
 * Paper component which changes its elevation when the cursor is hovering it
 * @param children - Paper content
 * @param props - Other paper props passed to the generic paper component
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
