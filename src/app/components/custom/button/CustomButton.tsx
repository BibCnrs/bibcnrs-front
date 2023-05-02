import './CustomButton.scss';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';

const CustomButton = (props: ButtonProps) => {
    return (
        <div className="custom-button-container">
            <Button {...props} className={`custom-button ${props.className ?? ''}`} />
        </div>
    );
};

export default CustomButton;
