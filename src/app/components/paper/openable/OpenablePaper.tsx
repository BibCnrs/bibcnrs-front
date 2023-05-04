import './OpenablePaper.scss';
import AnimatedPaper from '../animated/AnimatedPaper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import type { OpenablePaperProps } from '../../../shared/types/props.types';

/**
 * Paper which contains a hidden content which needs a click to be displayed
 * @param Title     - Openable paper title
 * @param SmallBody - Openable paper body when not opened
 * @param FullBody  - Openable paper body when opened
 * @param small     - Remove padding to make it smaller
 *                    - Default: false
 * @param color     - Paper border and shadow color
 * @param border    - Add colored border
 */
const OpenablePaper = ({ Title, SmallBody, FullBody, small = false, color, border }: OpenablePaperProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <AnimatedPaper
            className={small ? 'openable-paper openable-paper-small' : 'openable-paper'}
            color={color}
            border={border}
            onClick={() => {
                if (!open) {
                    setOpen(true);
                }
            }}
        >
            <h4
                className="openable-paper-title"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <IconButton
                    onClick={() => {
                        setOpen(!open);
                    }}
                    size="small"
                    color="primary"
                    className={
                        small
                            ? 'openable-paper-button-position openable-paper-button-small'
                            : 'openable-paper-button-position'
                    }
                >
                    <ArrowForwardIosIcon
                        className={open ? 'openable-paper-button openable-paper-button-open' : 'openable-paper-button'}
                    />
                </IconButton>
                {Title}
            </h4>
            <div className="openable-paper-body">{open ? FullBody : SmallBody}</div>
        </AnimatedPaper>
    );
};

export default OpenablePaper;
