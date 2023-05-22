import SearchList from './element/SearchList';
import Divider from '@mui/material/Divider';
import { Fragment } from 'react';
import type { FacetFacetsProps } from '../../shared/types/props.types';
import type { FacetEntry } from '../../shared/types/types';
import type { ReactNode } from 'react';

const FacetFacets = ({ available, active, onChange }: FacetFacetsProps) => {
    if (!available) {
        return null;
    }

    const keys = new Set<string>();
    Object.keys(available).forEach((key) => {
        if (!keys.has(key)) {
            keys.add(key);
        }
    });
    if (active) {
        Object.keys(active).forEach((key) => {
            if (!keys.has(key)) {
                keys.add(key);
            }
        });
    }

    let divider = false;
    const facets: ReactNode[] = [];
    keys.forEach((key) => {
        let component = null;
        const facet: FacetEntry[] | undefined = available[key] ?? [];
        if (facet) {
            const handleFacet = (values: FacetEntry[]) => {
                if (active) {
                    onChange({
                        ...active,
                        [key]: values,
                    });
                    return;
                }
                onChange({
                    [key]: values,
                });
            };
            component = (
                <Fragment key={key}>
                    {divider ? <Divider className="facet-divider" /> : null}
                    <SearchList
                        name={key}
                        facets={facet}
                        initial={active ? active[key] : undefined}
                        onChange={handleFacet}
                    />
                </Fragment>
            );
            divider = true;
            facets.push(component);
        }
    });

    return <div>{facets}</div>;
};

export default FacetFacets;
