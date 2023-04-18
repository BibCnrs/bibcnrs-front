import './OpenablePaper.scss';
import { OpenablePaperProps } from '../../shared/types/props.types';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OpenablePaper = ({ Title, SmallBody, FullBody, small = false }: OpenablePaperProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [elevation, setElevation] = useState<number>(1);

    return (
        <Paper
            className={small ? 'openable-paper openable-paper-small' : 'openable-paper'}
            onMouseOver={() => setElevation(4)}
            onMouseOut={() => setElevation(1)}
            elevation={elevation}
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
        </Paper>
    );
};

export default OpenablePaper;
