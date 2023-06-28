import { useFavouriteResources } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import CustomButton from '../button/CustomButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import useTheme from '@mui/material/styles/useTheme';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import type { DialogProps } from '../../../shared/types/props.types';
import type { ChangeEvent } from 'react';

const PersonalBookmark = ({ open, onClose }: DialogProps) => {
    const t = useTranslator();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { addFavourite } = useFavouriteResources();

    const [formError, setFormError] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleCancel = () => {
        onClose();
    };

    const handleSave = () => {
        if (!title || title === '') {
            setFormError(true);
            return;
        }

        if (!url || url === '') {
            setFormError(true);
            return;
        }

        try {
            new URL(url);
        } catch (e) {
            setFormError(true);
            return;
        }

        addFavourite({
            title,
            url,
            personal: true,
        });
        onClose();
    };

    const handleFormChange = (name: 'title' | 'url') => {
        if (name === 'title') {
            return (event: ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
            };
        }
        if (name === 'url') {
            return (event: ChangeEvent<HTMLInputElement>) => {
                setUrl(event.target.value);
            };
        }
    };

    return (
        <Dialog fullScreen={fullScreen} open={open}>
            <DialogTitle>{t('components.dialog.title.bookmark')}</DialogTitle>
            <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 240 }}>
                    <TextField
                        value={title}
                        onChange={handleFormChange('title')}
                        error={formError}
                        label={t('components.dialog.fields.title')}
                        size="small"
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        value={url}
                        onChange={handleFormChange('url')}
                        error={formError}
                        label={t('components.dialog.fields.url')}
                        size="small"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <CustomButton onClick={handleCancel}>{t('components.dialog.cancel')}</CustomButton>
                <CustomButton onClick={handleSave}>{t('components.dialog.save')}</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default PersonalBookmark;
