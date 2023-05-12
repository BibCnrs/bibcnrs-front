import './Facet.scss';
import FacetFacets from './FacetFacets';
import FacetLimiter from './FacetLimiter';
import { useTranslator } from '../../shared/locales/I18N';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import type { FacetProps } from '../../shared/types/props.types';

const Facet = ({ available }: FacetProps) => {
    const t = useTranslator();
    return (
        <Paper id="facet">
            <h3 id="facet-title" className="title">
                {t('components.facet.title')}
            </h3>
            <Divider className="facet-divider" />
            {/* Limiter */}
            <FacetLimiter
                available={available.limiters}
                onChange={(value) => {
                    console.log(value);
                }}
            />
            <Divider className="facet-divider" />
            {/* Facet */}
            <FacetFacets
                available={available.facets}
                onChange={(value) => {
                    console.log(value);
                }}
            />
        </Paper>
    );
};

export default Facet;
