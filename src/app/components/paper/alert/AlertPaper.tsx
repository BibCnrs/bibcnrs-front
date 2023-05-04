import './AlertPaper.scss';
import ColoredPaper from '../colored/ColoredPaper';
import type { AlertPaperProps } from '../../../shared/types/props.types';

/**
 * Paper component use to display alert
 * @param children - Alert content
 */
const AlertPaper = ({ children }: AlertPaperProps) => {
    return (
        <ColoredPaper id="alert" color="#f00" border>
            {children}
        </ColoredPaper>
    );
};

export default AlertPaper;
