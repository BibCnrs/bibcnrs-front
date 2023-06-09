import { useFullTranslator, supportedLanguages, useLanguageKey } from '../../../shared/locales/I18N';
import { colors } from '../../internal/provider/LocalizedThemeProvider';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { memo, useState } from 'react';
import type { SupportedLanguageKeys } from '../../../shared/types/types';
import type { MouseEvent } from 'react';

/**
 * Local Button component used by the header.
 * This element is used to change the application language
 */
const LocaleButton = () => {
    const { i18n } = useFullTranslator();
    const languageKey = useLanguageKey();

    // Anchor used to display or not the drop-down menu
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    // Handle drop-down menu action, like close or click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Change lang if a language was chosen, and close the drop-down menu
    const handleClose = (key: SupportedLanguageKeys) => {
        if (supportedLanguages.find((value) => value.key === key)) {
            i18n.changeLanguage(key).then();
        }
        setAnchorEl(null);
    };

    return (
        <div className="header-nav header-nav-spacer">
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open || undefined}
                onClick={handleClick}
                className="header-button header-button-icon"
            >
                <div
                    style={{
                        height: '20px',
                        marginRight: '4px',
                    }}
                >
                    <TranslateIcon fontSize="small" />
                </div>
                <div
                    style={{
                        color: colors.white,
                    }}
                >
                    {languageKey.split('-', 2)[0].toUpperCase()}
                </div>
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
                {supportedLanguages.map((lang) => (
                    <MenuItem
                        key={lang.key}
                        onClick={() => {
                            handleClose(lang.key);
                        }}
                        sx={{
                            borderLeftStyle: 'solid',
                            borderLeftWidth: '4px',
                            borderLeftColor: i18n.language.includes(lang.key) ? 'var(--text)' : '#00000000',
                        }}
                    >
                        {i18n.language.includes(lang.key) ? <b>{lang.label}</b> : lang.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default memo(LocaleButton);
