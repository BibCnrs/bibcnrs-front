import { HistoryContext } from '../../../pages/user/history/History';
import { disableSearchAlert } from '../../../services/user/SearchAlert';
import { updateSearchAlert } from '../../../services/user/Session';
import { useTranslator } from '../../../shared/locales/I18N';
import CustomButton from '../button/CustomButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext, useState } from 'react';
import type { AlertModificationProps } from '../../../shared/types/props.types';
import type { SelectChangeEvent } from '@mui/material/Select';

const AlertModification = ({ data, open, onClose }: AlertModificationProps) => {
    const t = useTranslator();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { requestUpdate } = useContext(HistoryContext);

    const [value, setValue] = useState<string>(data.active ? data.frequence : 'disable');
    // TODO: Enlevais le backdrop
    const [backdropLoading, setBackdropLoading] = useState(false);

    const handleCancel = () => {
        setBackdropLoading(false);
        onClose();
    };

    const handleSave = () => {
        setBackdropLoading(true);
        switch (value) {
            case 'disable': {
                // TODO: Utilisé des await
                disableSearchAlert(data.id).then(() => {
                    setBackdropLoading(false);
                    onClose();
                    requestUpdate();
                });
                break;
            }
            case 'day':
            case 'week':
            case 'month': {
                if (!data.active) {
                    // TODO: Utilisé des await
                    disableSearchAlert(data.id).then(() => {
                        updateSearchAlert(data.id, value).then(() => {
                            setBackdropLoading(false);
                            onClose();
                            requestUpdate();
                        });
                    });
                    break;
                }
                // TODO: Utilisé des await
                updateSearchAlert(data.id, value).then(() => {
                    setBackdropLoading(false);
                    onClose();
                    requestUpdate();
                });
                break;
            }
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Dialog fullScreen={fullScreen} open={open}>
                <DialogTitle>{t('components.dialog.title.alert')}</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, minWidth: 240 }}>
                        <Select value={value} onChange={handleChange} displayEmpty>
                            <MenuItem value="day">{t('components.table.content.alert.active.day')}</MenuItem>
                            <MenuItem value="week">{t('components.table.content.alert.active.week')}</MenuItem>
                            <MenuItem value="month">{t('components.table.content.alert.active.month')}</MenuItem>
                            <MenuItem value="disable">{t('components.table.content.alert.disable')}</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={handleCancel}>{t('components.dialog.cancel')}</CustomButton>
                    <CustomButton onClick={handleSave}>{t('components.dialog.save')}</CustomButton>
                </DialogActions>
            </Dialog>
            <Backdrop open={backdropLoading} sx={{ zIndex: (p) => p.zIndex.drawer + 1000 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default AlertModification;
