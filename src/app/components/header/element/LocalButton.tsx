import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { useState, MouseEvent } from 'react';
import { i18n } from 'i18next';

/**
 * React element use by the healer.
 * This element is used to change the application language
 * @param props Element properties containing the i18n system
 */
export default function LocalButton(props: { i18n: i18n }) {
    const i18n = props.i18n;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (key: 'fr' | 'en') => {
        i18n.changeLanguage(key).then();
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <LanguageIcon />
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
                <MenuItem onClick={() => handleClose('fr')}>
                    {i18n.language === 'fr' ? (
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                    ) : (
                        <></>
                    )}
                    Français
                </MenuItem>
                <MenuItem onClick={() => handleClose('en')}>
                    {i18n.language === 'en' ? (
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                    ) : (
                        <></>
                    )}
                    Anglais
                </MenuItem>
            </Menu>
        </div>
    );
}
