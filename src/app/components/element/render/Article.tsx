import ArticleLinks from './ArticleLinks';
import { useTranslator } from '../../../shared/locales/I18N';
import { BibContext } from '../../internal/provider/ContextProvider';
import BookmarkButton from '../button/BookmarkButton';
import ExportArticleCheckbox from '../button/ExportArticleCheckbox';
import OpenAccess from '../icon/OpenAccess';
import OpenablePaper from '../paper/openable/OpenablePaper';
import SkeletonEntry from '../skeleton/SkeletonEntry';
import Link from '@mui/material/Link';
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
    const { search, login } = useContext(BibContext);
    const authors = getter.getAuthors();
    const doi = getter.getDOI();
    const source = getter.getSource();
    const href = getter.proxify(getter.getHref(), search.domain);
    const openAccess = getter.isOpenAccess();
    const articlesLinks = getter.getArticleLinks();
    const title = getter.getTitle();

    return (
        <div className={login ? 'table-bookmark-size' : undefined}>
            <OpenablePaper
                onChange={onChange}
                defaultOpenState={open}
                Title={
                    <>
                        <ExportArticleCheckbox getter={getter} />
                        <Link
                            className="table-list-title link"
                            underline={href ? 'hover' : 'none'}
                            href={href ?? undefined}
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            aria-label={
                                href ? t('components.table.content.links') : t('components.table.content.noAccess')
                            }
                        >
                            {getter.getId()}. {title} {getter.getType() ? `[${getter.getType()}]` : null}
                            {!href ? <i> ({t('components.table.content.noAccess')})</i> : null}
                        </Link>
                        {openAccess && href ? <OpenAccess className="table-icon table-icon-oa" /> : null}
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
                                                    const link = getter.proxify(
                                                        { url: value, name: value },
                                                        search.domain,
                                                    );
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
                            {articlesLinks.fullTextLinks.length > 0 ? (
                                <span>
                                    <dt>{t('components.table.content.links')}</dt>
                                    <ArticleLinks
                                        links={articlesLinks.fullTextLinks}
                                        title={title}
                                        domain={search.domain}
                                        proxify={getter.proxify}
                                    />
                                </span>
                            ) : null}
                            {articlesLinks.pdfLinks.length > 0 ? (
                                <span>
                                    <dt>{t('components.table.content.pdf')}</dt>
                                    <ArticleLinks
                                        links={articlesLinks.pdfLinks}
                                        title={title}
                                        domain={search.domain}
                                        proxify={getter.proxify}
                                    />
                                </span>
                            ) : null}
                        </dl>
                    )
                }
            />
            <div className="table-bookmark">
                {login && title && href ? (
                    <BookmarkButton className="table-bookmark-button" title={title} url={href} />
                ) : null}
            </div>
        </div>
    );
};

export default memo(Article);
