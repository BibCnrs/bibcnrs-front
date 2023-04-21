import { BibContext } from '../../provider/ContextProvider';
import { translator } from '../../../shared/locales/I18N';
import { getUsername, logout } from '../../../services/user/session';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MouseEvent, useContext, useState } from 'react';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserButton = () => {
    const t = translator();
    let username = getUsername();
    if (username === null) {
        username = 'null';
    }

    // Anchor use to display or not the drop-down menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { setLogin } = useContext(BibContext);

    // Handle drop-down menu action, like close or click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Run menu action if available and close
    const handleClose = (action: () => void) => {
        if (typeof action === 'function') {
            action();
        }
        setAnchorEl(null);
    };

    return (
        <div className="header-nav">
            <button
                id={open ? 'user-button-active' : 'user-button'}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="header-button-icon"
            >
                <Avatar>{username.slice(0, 1)}</Avatar>
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Avatar sx={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    {username}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <HistoryIcon fontSize="small" />
                    </ListItemIcon>
                    {t('components.header.user.history')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <BookmarkIcon fontSize="small" />
                    </ListItemIcon>
                    {t('components.header.user.bookmark')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <NotificationsIcon fontSize="small" />
                    </ListItemIcon>
                    {t('components.header.user.notifications')}
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() =>
                        handleClose(() => {
                            logout().then(() => {
                                setLogin(false);
                            });
                        })
                    }
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    {t('components.header.logout')}
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserButton;
