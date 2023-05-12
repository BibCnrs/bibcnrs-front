import SearchList from './element/SearchList';
import Divider from '@mui/material/Divider';
import type { FacetFacetsProps } from '../../shared/types/props.types';

const FacetFacets = ({ available, active }: FacetFacetsProps) => {
    if (!available) {
        return null;
    }

    let divider = false;
    let source = null;
    if (available.source) {
        source = (
            <SearchList
                name="source"
                facets={available.source}
                initial={active?.source}
                onChange={(value) => {
                    console.log(value);
                }}
            />
        );
        divider = true;
    }

    let subject = null;
    if (available.subject) {
        subject = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="subject"
                    facets={available.subject}
                    initial={active?.subject}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
        divider = true;
    }

    let journal = null;
    if (available.journal) {
        journal = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="journal"
                    facets={available.journal}
                    initial={active?.journal}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
        divider = true;
    }

    let language = null;
    if (available.language) {
        language = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="language"
                    facets={available.language}
                    initial={active?.language}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
        divider = true;
    }

    let lexile = null;
    if (available.lexile) {
        lexile = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="lexile"
                    facets={available.lexile}
                    initial={active?.lexile}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
        divider = true;
    }

    let collection = null;
    if (available.collection) {
        collection = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="collection"
                    facets={available.collection}
                    initial={active?.collection}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
        divider = true;
    }

    let publisher = null;
    if (available.publisher) {
        publisher = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="publisher"
                    facets={available.publisher}
                    initial={active?.publisher}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
        divider = true;
    }

    let provider = null;
    if (available.provider) {
        provider = (
            <>
                {divider ? <Divider className="facet-divider" /> : null}
                <SearchList
                    name="provider"
                    facets={available.provider}
                    initial={active?.provider}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            </>
        );
    }

    return (
        <div>
            {source}
            {subject}
            {journal}
            {language}
            {lexile}
            {collection}
            {publisher}
            {provider}
        </div>
    );
};

export default FacetFacets;
