import './scss/TableList.scss';
import { retrieve as retrieveFn } from '../../../services/search/Article';
import { ArticleContentGetter } from '../../../services/search/Article';
import { BibContext } from '../../internal/provider/ContextProvider';
import Article from '../render/Article';
import NoAccessArticle from '../render/NoAccessArticle';
import SkeletonEntry from '../skeleton/SkeletonEntry';
import { useQuery } from '@tanstack/react-query';
import { memo, useContext, useEffect, useState } from 'react';
import type { ArticleResultDataType } from '../../../shared/types/data.types';
import type { ArticleRetrieveDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const TableArticle = ({ data: dataIn }: TableDisplayElementProps<ArticleResultDataType>) => {
    const { search } = useContext(BibContext);
    const [retrieve, setRetrieve] = useState(false);
    const [missing, setMissing] = useState(false);
    const [first, setFirst] = useState(true);
    const [getter, setGetter] = useState(new ArticleContentGetter(dataIn, null));
    const [open, setOpen] = useState(false);

    const {
        data: dataRetrieve,
        isFetching,
        isLoading,
        isSuccess,
    } = useQuery<ArticleRetrieveDataType, any, ArticleRetrieveDataType, any>({
        queryKey: ['article_retrieve', missing, search.domain, dataIn.dbId, dataIn.an],
        queryFn: async () => {
            if (missing && search.domain) {
                return retrieveFn(search.domain, dataIn.dbId, dataIn.an);
            }
            return null;
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    const handleOpen = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen && !missing) {
            setMissing(true);
        }
    };

    useEffect(() => {
        if (first && (!dataIn.authors || !dataIn.source || !getter.getHref())) {
            setMissing(true);
        }
        setFirst(false);
    }, [dataIn, getter]);

    useEffect(() => {
        if (isSuccess) {
            setRetrieve(true);
            setGetter(new ArticleContentGetter(dataIn, dataRetrieve));
        }
    }, [dataIn, dataRetrieve, isSuccess]);

    if (((missing && !retrieve) || first || isFetching || isLoading || !getter) && !open) {
        return <SkeletonEntry animation="pulse" />;
    }

    if (!getter.getAuthors() || !getter.getSource()) {
        return <NoAccessArticle getter={getter} />;
    }

    return <Article onChange={handleOpen} open={open} getter={getter} isWaiting={isFetching || isLoading} />;
};

export default memo(TableArticle);
