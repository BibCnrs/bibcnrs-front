import { BibContext } from '../../utils/ContextProvider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MouseEvent, useContext, useState } from 'react';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

const UserButton = () => {
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
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="header-button-icon"
            >
                <Avatar>P</Avatar>
            </Button>
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
                    Place Holder
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() =>
                        handleClose(() => {
                            setLogin(false);
                        })
                    }
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserButton;
