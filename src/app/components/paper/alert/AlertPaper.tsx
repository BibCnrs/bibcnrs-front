import './AlertPaper.scss';
import { AlertPaperProps } from '../../../shared/types/props.types';
import ColoredPaper from '../colored/ColoredPaper';

const AlertPaper = ({ children }: AlertPaperProps) => {
    return (
        <ColoredPaper id="alert" color="#f00" border>
            {children}
        </ColoredPaper>
    );
};

export default AlertPaper;
