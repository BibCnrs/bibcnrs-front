import './scss/TableList.scss';
import { retrieve as retrieveFn } from '../../../services/search/Publication';
import { useServicesCatch } from '../../../shared/hook';
import { useTranslator } from '../../../shared/locales/I18N';
import parseFullTextHoldings from '../../../shared/parseFullTextHoldings';
import Diamond from '../../icon/Diamond';
import OpenAccess from '../../icon/OpenAccess';
import OpenablePaper from '../../paper/openable/OpenablePaper';
import { BibContext } from '../../provider/ContextProvider';
import SkeletonEntry from '../../skeleton/SkeletonEntry';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { PublicationCoverageDataType } from '../../../shared/types/data.types';
import type { PublicationHolding } from '../../../shared/types/data.types';
import type { PublicationResultDataType, PublicationRetrieveDataType } from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

const TablePublication = ({ data: dataIn }: TableDisplayElementProps<PublicationResultDataType>) => {
    const {
        fullTextHoldings,
        id,
        title,
        type,
        isDiamond,
        issnOnline,
        issnPrint,
        isbnOnline,
        isbnPrint,
        publicationId,
    } = dataIn;

    const reconciledFullTextHoldings = parseFullTextHoldings(fullTextHoldings) as PublicationHolding[];

    const t = useTranslator();
    const serviceCatch = useServicesCatch();
    const { search } = useContext(BibContext);
    const { login, setAskLogin } = useContext(BibContext);
    const [open, setOpen] = useState(false);

    const {
        data: dataRetrieve,
        isFetching,
        isLoading,
        isError,
        error,
    } = useQuery<PublicationRetrieveDataType, any, PublicationRetrieveDataType, any>({
        queryKey: ['publication_retrieve', open, search.domain, publicationId],
        queryFn: async () => {
            if (open && search.domain) {
                return retrieveFn(search.domain, publicationId);
            }
            return null;
        },
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    useEffect(() => {
        if (isError) {
            serviceCatch(error);
        }
    }, [error, isError, serviceCatch]);

    const handleChange = (isOpen: boolean) => {
        if (isOpen && !login) {
            setAskLogin(true);
        }
        setOpen(isOpen);
    };

    const getCoverage = (coverage: PublicationCoverageDataType) => {
        let coverageString = '';
        coverage.forEach((value) => {
            const start = new Date(
                parseInt(value.start.year, 10),
                parseInt(value.start.month, 10) - 1,
                parseInt(value.start.day, 10),
            );
            const end = new Date(
                parseInt(value.end.year, 10),
                parseInt(value.end.month, 10) - 1,
                parseInt(value.end.day, 10),
            );
            if (coverageString !== '') {
                coverageString += ', ';
            }
            coverageString += `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        });
        return coverageString;
    };

    if (reconciledFullTextHoldings.length === 0) {
        return null;
    }

    const href = reconciledFullTextHoldings[0].url;
    const isOpenAccess = reconciledFullTextHoldings[0].name.toLowerCase().includes('open access');
    return (
        <OpenablePaper
            onOpen={handleChange}
            Title={
                <>
                    <a className="table-list-title link" href={href} target="_blank" rel="noreferrer noopener nofollow">
                        {id}. {title} [{type}]
                    </a>
                    {isOpenAccess ? <OpenAccess className="table-icon table-icon-oa" /> : null}
                    {isDiamond ? <Diamond className="table-icon" /> : null}
                </>
            }
            SmallBody={
                <div className="table-list-body">
                    {issnOnline && issnOnline.length > 0 ? (
                        <div>
                            {t('components.table.content.issnOnline') /* eISSN */}
                            {issnOnline.join(', ')}
                        </div>
                    ) : null}
                    {issnPrint && issnPrint.length > 0 ? (
                        <div>
                            {t('components.table.content.issnPrint') /* pISSN */}
                            {issnPrint.join(', ')}
                        </div>
                    ) : null}
                    {isbnOnline && isbnOnline.length > 0 ? (
                        <div>
                            {t('components.table.content.isbnOnline') /* eISBN */}
                            {isbnOnline.join(', ')}
                        </div>
                    ) : null}
                    {isbnPrint && isbnPrint.length > 0 ? (
                        <div>
                            {t('components.table.content.isbnPrint') /* pISBN */}
                            {isbnPrint.join(', ')}
                        </div>
                    ) : null}
                </div>
            }
            /* eslint-disable-next-line react/jsx-no-useless-fragment */
            FullBody={
                !dataRetrieve || isLoading || isFetching ? (
                    <SkeletonEntry animation="pulse" height={450} />
                ) : (
                    <dl className="table-list-body">
                        {dataRetrieve.items.map((item) => {
                            if (item.name.toLowerCase() === 'title') {
                                return null;
                            }
                            return (
                                <span key={item.name}>
                                    <dt>{item.label}</dt>
                                    <dd>
                                        {item.value.map((value) => (
                                            <div key={value}>{value}</div>
                                        ))}
                                    </dd>
                                </span>
                            );
                        })}
                        <span>
                            <dt>Accès à l&apos;article</dt>
                            <dd>
                                {reconciledFullTextHoldings.map((value) => (
                                    <div key={value.name}>
                                        <a
                                            className="link"
                                            href={value.url}
                                            target="_blank"
                                            rel="noreferrer nofollow noopener"
                                        >
                                            {value.name}
                                        </a>{' '}
                                        {getCoverage(value.coverage)}
                                    </div>
                                ))}
                            </dd>
                        </span>
                    </dl>
                )
            }
        />
    );
};

export default TablePublication;
