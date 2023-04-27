import Paper from '@mui/material/Paper';
import { hexToRgb, decomposeColor } from '@mui/system/colorManipulator';
import type { ColoredPaperProps } from '../../../shared/types/props.types';
import type { Theme } from '@mui/material/styles/createTheme';
import type { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import type { Property } from 'csstype';

const elevations = [
    ['0 2px 1px -1px', '0 1px 1px 0', '0 1px 3px 0'],
    ['0 3px 1px -2px', '0 2px 2px 0', '0 1px 5px 0'],
    ['0 3px 3px -2px', '0 3px 4px 0', '0 1px 8px 0'],
    ['0 2px 4px -1px', '0 4px 5px 0', '0 1px 10px 0'],
];

const getBoxShadow = (elevation: number, color: string): Property.BoxShadow => {
    if (elevation === 0) {
        return 'none';
    }
    const shadow = elevations[elevation - 1];
    if (!shadow) {
        return 'none';
    }
    return [
        `${shadow[0]} rgba(${color},0.2)`,
        `${shadow[1]} rgba(${color},0.14)`,
        `${shadow[2]} rgba(${color},0.12)`,
    ].join(',');
};

const ColoredPaper = ({
    elevation = 1,
    color = '#000',
    border = false,
    id,
    className,
    onMouseOver,
    onMouseOut,
    children,
}: ColoredPaperProps) => {
    const convertedColor = decomposeColor(hexToRgb(color)).values.join(',');
    let sx: SxProps<Theme> = {};
    if (border) {
        sx = {
            borderColor: `rgba(${convertedColor},0.5)`,
            borderStyle: 'solid',
            borderWidth: '1px',
        };
    }
    return (
        <Paper
            id={id}
            className={`colored-paper ${className}`}
            elevation={elevation}
            sx={{
                boxShadow: getBoxShadow(elevation, convertedColor),
                ...sx,
            }}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {children}
        </Paper>
    );
};

export default ColoredPaper;
