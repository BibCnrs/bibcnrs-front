import './OpenablePaper.scss';
import AnimatedPaper from '../animated/AnimatedPaper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { memo, useEffect, useState } from 'react';
import type { OpenablePaperProps } from '../../../../shared/types/props.types';

/**
 * Paper which contains a hidden content which needs a click to be displayed
 * @param Title     - Openable paper title
 * @param SmallBody - Openable paper body when not opened
 * @param FullBody  - Openable paper body when opened
 * @param small     - Remove padding to make it smaller
 *                    - Default: false
 * @param color     - Paper border and shadow color
 * @param border    - Add colored border
 * @param isOpen
 * @param onChange  - Event call when the paper is opened
 */
const OpenablePaper = ({
    Title,
    SmallBody,
    FullBody,
    small = false,
    color,
    border,
    defaultOpenState = false,
    onChange,
    onOpen,
}: OpenablePaperProps) => {
    const [open, setOpen] = useState<boolean>(defaultOpenState);

    useEffect(() => {
        if (onChange) {
            onChange(open);
        }
    }, [onChange, open]);

    const handlePaperClick = () => {
        if (!open) {
            setOpen(true);
            if (onOpen) {
                onOpen(true);
            }
        }
    };

    const handleOpen = () => {
        setOpen(!open);
        if (onOpen) {
            onOpen(!open);
        }
    };

    return (
        <AnimatedPaper
            className={small ? 'openable-paper openable-paper-small' : 'openable-paper'}
            color={color}
            border={border}
            onClick={handlePaperClick}
        >
            {/* ESLint rule note: A button is available inside this element,
                this action is to enchant the navigation */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <h4 className="openable-paper-title" onClick={handleOpen}>
                <IconButton
                    onClick={handleOpen}
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

export default memo(OpenablePaper);
