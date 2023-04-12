import { LocalButtonProps } from '../../../shared/types/props.types';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useState } from 'react';

/**
 * Local Button component used by the header.
 * This element is used to change the application language
 * @param i18n Element properties containing the i18n system
 */
const LocalButton = ({ i18n }: LocalButtonProps) => {
    // Anchor use to display or not the drop-down menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Handle drop-down menu action, like close or click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Change lang if a language was chosen and close the drop-down menu
    const handleClose = (key: 'fr' | 'en') => {
        if (key === 'fr' || key === 'en') {
            i18n.changeLanguage(key).then();
        }
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
                <TranslateIcon />
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
};

export default LocalButton;
