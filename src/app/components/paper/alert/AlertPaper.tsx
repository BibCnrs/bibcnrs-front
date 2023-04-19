import './AlertPaper.scss';
import { AlertPaperProps } from '../../../shared/types/props.types';
import Paper from '@mui/material/Paper';

const AlertPaper = ({ children }: AlertPaperProps) => {
    return <Paper id="alert">{children}</Paper>;
};

export default AlertPaper;
