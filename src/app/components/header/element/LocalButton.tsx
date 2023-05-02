import { getFullTranslator, supportedLanguages } from '../../../shared/locales/I18N';
import CheckIcon from '@mui/icons-material/Check';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import type { SupportedLanguageKeys } from '../../../shared/types/types';
import type { MouseEvent } from 'react';

/**
 * Local Button component used by the header.
 * This element is used to change the application language
 */
const LocalButton = () => {
    const { i18n } = getFullTranslator();

    // Anchor use to display or not the drop-down menu
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    // Handle drop-down menu action, like close or click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Change lang if a language was chosen and close the drop-down menu
    const handleClose = (key: SupportedLanguageKeys) => {
        if (supportedLanguages.find((value) => value.key === key)) {
            i18n.changeLanguage(key).then();
        }
        setAnchorEl(null);
    };

    return (
        <div className="header-nav header-nav-spacer">
            <Button
                sx={{ width: '36px', minWidth: '36px' }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open || undefined}
                onClick={handleClick}
                className="header-button-icon"
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
                {supportedLanguages.map((lang, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleClose(lang.key);
                        }}
                    >
                        {i18n.language === lang.key ? (
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                        ) : null}
                        {lang.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default LocalButton;
