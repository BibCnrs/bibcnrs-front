import { useTranslator } from '../../../shared/locales/I18N';
import Tooltip from '@mui/material/Tooltip';
import { memo } from 'react';

const Diamond = ({ className }: { className?: string }) => {
    const t = useTranslator();
    return (
        <Tooltip title={t('components.icon.diamond')} placement="top" arrow>
            <img className={className} style={{ height: '19px' }} src="/icons/diamond.svg" alt="Diamond icon" />
        </Tooltip>
    );
};

export default memo(Diamond);
