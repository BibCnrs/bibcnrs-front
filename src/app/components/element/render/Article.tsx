import { useTranslator } from '../../../shared/locales/I18N';
import { BibContext } from '../../internal/provider/ContextProvider';
import ExportArticleCheckbox from '../button/ExportArticleCheckbox';
import OpenAccess from '../icon/OpenAccess';
import OpenablePaper from '../paper/openable/OpenablePaper';
import SkeletonEntry from '../skeleton/SkeletonEntry';
import { memo, useContext } from 'react';
import type { ArticleContentGetter } from '../../../services/search/Article';

const Article = ({
    getter,
    open,
    isWaiting,
    onChange,
}: {
    getter: ArticleContentGetter;
    open: boolean;
    isWaiting: boolean;
    onChange: (isOpen: boolean) => void;
}) => {
    const t = useTranslator();
    const { search } = useContext(BibContext);
    const authors = getter.getAuthors();
    const doi = getter.getDOI();
    const source = getter.getSource();
    const href = getter.proxify(getter.getHref(), search.domain);
    const openAccess = getter.isOpenAccess();

    return (
        <OpenablePaper
            onChange={onChange}
            defaultOpenState={open}
            Title={
                <>
                    <ExportArticleCheckbox getter={getter} />
                    <a
                        className="table-list-title link"
                        href={href ? href : '#'}
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                    >
                        {getter.getId()}. {getter.getTitle()} [{getter.getType()}]
                    </a>
                    {openAccess ? <OpenAccess className="table-icon table-icon-oa" /> : null}
                </>
            }
            SmallBody={
                <div className="table-list-body">
                    {authors ? <div>{authors.join(', ')}</div> : null}
                    {source ? <div>{source}</div> : null}
                    {doi ? (
                        <div>
                            {t('components.table.content.doiColon')} {doi}
                        </div>
                    ) : null}
                </div>
            }
            FullBody={
                isWaiting ? (
                    <SkeletonEntry animation="pulse" height={450} />
                ) : (
                    <dl className="table-list-body">
                        {getter.getAllItems().map((entry) => {
                            if (entry.label === 'Access URL') {
                                return (
                                    <span key={entry.label}>
                                        <dt>{entry.label}</dt>
                                        <dd>
                                            {entry.content.map((value) => {
                                                const link = getter.proxify({ url: value, name: value }, search.domain);
                                                if (!link) {
                                                    return null;
                                                }
                                                return (
                                                    <div key={value}>
                                                        <a className="link" href={link}>
                                                            {value}
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </dd>
                                    </span>
                                );
                            }
                            return (
                                <span key={entry.label}>
                                    <dt>{entry.label}</dt>
                                    <dd>
                                        {entry.content.map((value) => (
                                            <div key={value}>{value}</div>
                                        ))}
                                    </dd>
                                </span>
                            );
                        })}
                    </dl>
                )
            }
        />
    );
};

export default memo(Article);
