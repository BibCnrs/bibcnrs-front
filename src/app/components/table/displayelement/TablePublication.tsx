import './scss/TableList.scss';
import { useTranslator } from '../../../shared/locales/I18N';
import Diamond from '../../icon/Diamond';
import OpenAccess from '../../icon/OpenAccess';
import OpenablePaper from '../../paper/openable/OpenablePaper';
import { BibContext } from '../../provider/ContextProvider';
import { useContext } from 'react';
import type { PublicationResultDataType } from '../../../shared/types/data.types';
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
        // publicationId,
    } = dataIn;

    const t = useTranslator();
    const { login, setAskLogin } = useContext(BibContext);

    const handleChange = (isOpen: boolean) => {
        if (isOpen && !login) {
            setAskLogin(true);
        }
    };

    const href = fullTextHoldings[0].url;
    const isOpenAccess = fullTextHoldings[0].name.toLowerCase().includes('open access');
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
            FullBody={<>TODO</>}
        />
    );
};

export default TablePublication;
