import createSxProps from '../../../shared/createSxProps';
import { ColoredPaperProps } from '../../../shared/types/props.types';
import Paper from '@mui/material/Paper';
import { Property } from 'csstype';
import { hexToRgb, decomposeColor } from '@mui/system/colorManipulator';

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
    const processShadow = [];
    processShadow.push(`${shadow[0]} rgba(${color},0.2)`);
    processShadow.push(`${shadow[1]} rgba(${color},0.14)`);
    processShadow.push(`${shadow[2]} rgba(${color},0.12)`);
    return processShadow.join(',');
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
    let sx;
    if (border) {
        sx = createSxProps({
            borderColor: `rgba(${convertedColor},0.5)`,
            borderStyle: 'solid',
            borderWidth: '1px',
            boxShadow: getBoxShadow(elevation, convertedColor),
        });
    } else {
        sx = createSxProps({
            boxShadow: getBoxShadow(elevation, convertedColor),
        });
    }
    return (
        <Paper
            id={id}
            className={className ? `colored-paper ${className}` : 'colored-paper'}
            elevation={elevation}
            sx={sx}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {children}
        </Paper>
    );
};

export default ColoredPaper;
