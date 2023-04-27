import './OpenablePaper.scss';
import AnimatedPaper from '../animated/AnimatedPaper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import type { OpenablePaperProps } from '../../../shared/types/props.types';

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
                    onClick={() => setOpen(!open)}
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
