import './Facet.scss';
import FacetFacets from './FacetFacets';
import FacetLimiter from './FacetLimiter';
import { useTranslator } from '../../shared/locales/I18N';
import CustomButton from '../custom/button/CustomButton';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import type { FacetProps } from '../../shared/types/props.types';

const Facet = ({ available, active, onChange, onReset }: FacetProps) => {
    const t = useTranslator();

    const handleLimiter = (limiters: FacetProps['active']['limiters']) => {
        onChange({
            facets: active.facets,
            limiters,
        });
    };

    const handleFacet = (facets: FacetProps['active']['facets']) => {
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

export default Facet;
