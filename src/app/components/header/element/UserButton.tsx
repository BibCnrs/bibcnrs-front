import { BibContext } from '../../provider/ContextProvider';
import { translator } from '../../../shared/locales/I18N';
import { getUsername, isLegacy, logout } from '../../../services/user/Session';
import { colors } from '../../provider/LocalizedThemeProvider';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MouseEvent, ReactElement, useContext, useState } from 'react';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorIcon from '@mui/icons-material/Error';

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

    const getAvatarButtonClass = () => {
        return open ? ' user-button-active-legacy' : ' user-button-legacy';
    };

    const options: ReactElement[] = [];
    options.push(
        <MenuItem key="username">
            <ListItemIcon>
                <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            {username}
        </MenuItem>,
        <Divider key="divider-1" />,
    );
    if (isLegacy()) {
        options.push(
            <MenuItem key="legacy">
                <ListItemIcon>
                    <ErrorIcon fontSize="small" sx={{ color: '#a00' }} />
                </ListItemIcon>
                {t('components.header.user.legacy')}
            </MenuItem>,
        );
    } else {
        options.push(
            <MenuItem key="history">
                <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                </ListItemIcon>
                {t('components.header.user.history')}
            </MenuItem>,
            <MenuItem key="bookmark">
                <ListItemIcon>
                    <BookmarkIcon fontSize="small" />
                </ListItemIcon>
                {t('components.header.user.bookmark')}
            </MenuItem>,
            <MenuItem key="notfications">
                <ListItemIcon>
                    <NotificationsIcon fontSize="small" />
                </ListItemIcon>
                {t('components.header.user.notifications')}
            </MenuItem>,
        );
    }
    options.push(
        <Divider key="divider-2" />,
        <MenuItem
            key="logout"
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
        </MenuItem>,
    );

    return (
        <div className="header-nav">
            <button
                id={open ? 'user-button-active' : 'user-button'}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={`header-button-icon${isLegacy() ? getAvatarButtonClass() : ''}`}
            >
                <Avatar
                    sx={{
                        bgcolor: isLegacy() ? colors.other.legacy : colors.cnrs.secondary.lightBlue,
                        color: colors.text.light,
                    }}
                >
                    {username.slice(0, 1)}
                </Avatar>
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
                {options}
            </Menu>
        </div>
    );
};

export default UserButton;
