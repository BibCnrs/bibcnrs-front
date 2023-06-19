import SearchList from './SearchList';
import Divider from '@mui/material/Divider';
import { Fragment } from 'react';
import type { FacetFacetsProps, FacetRequired } from '../../../shared/types/props.types';
import type { FacetEntry } from '../../../shared/types/types';
import type { ReactNode } from 'react';

const FacetFacets = ({ available, active, onChange }: FacetFacetsProps<FacetRequired>) => {
    if (!available) {
        return null;
    }

    const keys = new Set<string>(Object.keys(available));
    if (active) {
        Object.keys(active).forEach((key) => {
            keys.add(key);
        });
    }

    const handleFacet = (values: FacetEntry[], key: string) => {
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

    let divider = false;
    const facets: ReactNode[] = [];
    keys.forEach((key) => {
        const facet: FacetEntry[] | undefined = available[key] ?? [];
        if (facet) {
            const component = (
                <Fragment key={key}>
                    {divider ? <Divider className="facet-divider" /> : null}
                    <SearchList
                        name={key}
                        facets={facet}
                        initial={active ? active[key] : undefined}
                        onChange={(values) => {
                            handleFacet(values, key);
                        }}
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
