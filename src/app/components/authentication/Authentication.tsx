import './Authentication.scss';
import { translator } from '../../shared/locales/I18N';
import { AuthenticationProps } from '../../shared/types/props.types';
import { loginToJanus } from '../../services/user/session';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} children={props.children} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
    },
});

const Authentication = ({ open, onClose }: AuthenticationProps) => {
    const t = translator();
    const [legacy, setLegacy] = useState(false);
    const handleClose = () => {
        setLegacy(false);
        onClose();
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            id="authentication"
            aria-labelledby="authentication-header"
            aria-describedby="authentication-body"
            closeAfterTransition
        >
            <Slide direction="down" in={open} timeout={400}>
                <Paper elevation={15}>
                    <div id="authentication-header">
                        <Typography>{t('components.authentication.title')}</Typography>
                        <IconButton id="authentication-close" size="small" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <Divider />
                    <div id="authentication-body">
                        <div>
                            <p>
                                <small>{t('components.authentication.info')}</small>
                            </p>
                            <p>{t('components.authentication.mode')}</p>
                        </div>
                        <div>
                            <NoMaxWidthTooltip
                                id="authentication-tooltip"
                                title={t('components.authentication.janus.tooltip')}
                                placement="top"
                                arrow
                            >
                                <Button className="authentication-button" onClick={loginToJanus}>
                                    <LoginIcon className="authentication-button-icon" />
                                    {t('components.authentication.janus.button')}
                                </Button>
                            </NoMaxWidthTooltip>
                            <p id="authentication-janus">
                                <a
                                    className="link"
                                    href="https://sesame.cnrs.fr"
                                    target="blank"
                                    rel="noopener noreferrer nofollow"
                                >
                                    {t('components.authentication.janus.ask')}
                                </a>
                            </p>
                            <Button
                                id="authentication-legacy-button"
                                className="authentication-button"
                                onClick={() => setLegacy(!legacy)}
                                style={
                                    legacy
                                        ? {
                                              borderBottomRightRadius: 0,
                                              borderBottomLeftRadius: 0,
                                          }
                                        : undefined
                                }
                            >
                                <LoginIcon className="authentication-button-icon" />
                                {t('components.authentication.legacy.button')}
                            </Button>
                            <TransitionGroup>
                                {legacy ? (
                                    <Collapse>
                                        <div id="authentication-legacy">
                                            <TextField
                                                className="authentication-legacy-form-input"
                                                label={t('components.authentication.legacy.username')}
                                                size="small"
                                            />
                                            <TextField
                                                className="authentication-legacy-form-input"
                                                label={t('components.authentication.legacy.password')}
                                                size="small"
                                            />
                                            <Button className="authentication-button authentication-legacy-form-input">
                                                {t('components.authentication.legacy.login')}
                                            </Button>
                                        </div>
                                    </Collapse>
                                ) : null}
                            </TransitionGroup>
                        </div>
                    </div>
                    <Divider />
                    <div id="authentication-footer">
                        <a className="link" href="mailto:assistance-portail@inist.fr">
                            {t('components.authentication.contact')}
                        </a>
                    </div>
                </Paper>
            </Slide>
        </Modal>
    );
};

export default Authentication;
