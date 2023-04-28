import { getUsername, isLegacy, logout } from '../../../services/user/Session';
import { translator } from '../../../shared/locales/I18N';
import { buildLinkClickHandler, RouteHistory } from '../../../shared/Routes';
import { BibContext } from '../../provider/ContextProvider';
import { colors } from '../../provider/LocalizedThemeProvider';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ErrorIcon from '@mui/icons-material/Error';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import type { MouseEvent, ReactElement } from 'react';

const UserButton = () => {
    const t = translator();
    const { setLogin } = useContext(BibContext);
    // Anchor use to display or not the drop-down menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = buildLinkClickHandler(RouteHistory);

    let username = getUsername();

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

    if (username === null) {
        username = 'null';
    }

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
            <MenuItem key="history" onClick={history.handler} href={history.href}>
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
