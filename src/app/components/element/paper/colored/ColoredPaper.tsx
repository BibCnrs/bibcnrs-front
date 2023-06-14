import Paper from '@mui/material/Paper';
import { hexToRgb, decomposeColor } from '@mui/system/colorManipulator';
import type { ColoredPaperProps } from '../../../../shared/types/props.types';
import type { Theme } from '@mui/material/styles/createTheme';
import type { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import type { Property } from 'csstype';

/**
 * Array of box-shadow sizes used to create a colored elevation
 */
const elevations = [
    ['0 2px 1px -1px', '0 1px 1px 0', '0 1px 3px 0'],
    ['0 3px 1px -2px', '0 2px 2px 0', '0 1px 5px 0'],
    ['0 3px 3px -2px', '0 3px 4px 0', '0 1px 8px 0'],
    ['0 2px 4px -1px', '0 4px 5px 0', '0 1px 10px 0'],
];

/**
 * Function used to create the box color
 * @param elevation - Paper elevation value
 * @param color     - Paper box shadow color
 */
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

/**
 * Extension of the Paper from Material UI, which serves as a generic component to any other paper component
 * @param elevation   - Paper elevation
 *                      - Default: 1
 * @param color       - Paper box shadow and border color if applicable
 *                      - Default: #000 (black)
 * @param border      - Add colored border
 *                      - Default: false
 * @param id          - HTML ID of the Paper component
 * @param className   - HTML Class of the paper component
 * @param onClick     - Event call when a click in perform anywhere on the paper component
 * @param onMouseOver - Event call when the cursor is hover the paper component
 * @param onMouseOut  - Event call when the cursor is going out of the paper component
 * @param children    - Paper content
 */
const ColoredPaper = ({
    elevation = 1,
    color = '#000',
    border = false,
    id,
    className,
    onClick,
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
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {children}
        </Paper>
    );
};

export default ColoredPaper;
