import './Facet.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import CustomButton from '../../element/button/CustomButton';
import FacetFacets from '../../element/facet/FacetFacets';
import FacetLimiter from '../../element/facet/FacetLimiter';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { memo } from 'react';
import type { FacetProps, FacetRequired } from '../../../shared/types/props.types';

const Facet = ({ available, active, onChange, onReset }: FacetProps<FacetRequired>) => {
    const t = useTranslator();

    const handleLimiter = (limiters: FacetProps<FacetRequired>['active']['limiters']) => {
        onChange({
            facets: active.facets,
            limiters,
        });
    };

    const handleFacet = (facets: FacetProps<FacetRequired>['active']['facets']) => {
        onChange({
            limiters: active.limiters,
            facets,
        });
    };

    return (
        <Paper id="facet">
            <h3 id="facet-title" className="title">
                {t('components.facet.title')}
            </h3>
            <Divider className="facet-divider" />
            <CustomButton sx={{ width: '100%' }} onClick={onReset}>
                {t('components.facet.reset')}
            </CustomButton>
            <Divider className="facet-divider" />
            {/* Limiter */}
            <FacetLimiter available={available.limiters} active={active.limiters} onChange={handleLimiter} />
            <Divider className="facet-divider" />
            {/* Facet */}
            <FacetFacets available={available.facets} active={active.facets} onChange={handleFacet} />
        </Paper>
    );
};

export default memo(Facet);
