import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/material/styles/createTheme';

const createSxProps = (sx: SxProps<Theme>): SxProps<Theme> => {
    return sx;
};

export default createSxProps;
