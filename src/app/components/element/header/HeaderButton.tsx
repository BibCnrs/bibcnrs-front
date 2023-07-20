import { useTranslator } from '../../../shared/locales/I18N';
import { useClickHandler, useIsMatching } from '../../../shared/Routes';
import { headerButtonStyle } from '../../page/header/Header';
import Button from '@mui/material/Button';
import { memo } from 'react';
import type { RoutesType } from '../../../shared/Routes';

/**
 * Button used to go to Faq page
 */
const HeaderButton = ({ name, route }: { name: string; route: RoutesType }) => {
    const t = useTranslator();
    const action = useClickHandler(route);
    const active = !!useIsMatching(route);
    return (
        <div className="header-nav">
            <Button
                id={active ? 'header-button-active' : undefined}
                className="header-button"
                sx={headerButtonStyle}
                onClick={action.handler}
                href={action.href}
            >
                {t(`components.header.${name}`)}
            </Button>
        </div>
    );
};

export default memo(HeaderButton);
