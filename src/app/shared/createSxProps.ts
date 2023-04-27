import type { Theme } from '@mui/material/styles/createTheme';
import type { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const createSxProps = (sx: SxProps<Theme>): SxProps<Theme> => {
    return sx;
};

export default createSxProps;
