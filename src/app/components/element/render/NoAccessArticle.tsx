import { useTranslator } from '../../../shared/locales/I18N';
import ExportArticleCheckbox from '../button/ExportArticleCheckbox';
import OpenablePaper from '../paper/openable/OpenablePaper';
import { memo } from 'react';
import type { ArticleContentGetter } from '../../../services/search/Article';

const NoAccessArticle = ({ getter }: { getter: ArticleContentGetter }) => {
    const t = useTranslator();
    const urls = getter.getPublisherURL();
    const languages = getter.getLanguages();
    return (
        <OpenablePaper
            Title={
                <>
                    <ExportArticleCheckbox getter={getter} />
                    <div className="table-list-title link">
                        {getter.getId()}. {getter.getTitle()} [{getter.getType()}]{' '}
                        <i>({t('components.table.content.noAccess')})</i>
                    </div>
                </>
            }
            SmallBody={null}
            FullBody={
                <dl className="table-list-body">
                    {urls && urls.length > 0 ? (
                        <span>
                            <dt>{t('components.table.content.publisherUrl')}</dt>
                            <dd>
                                {urls.map((urlEntry) => (
                                    <a className="link" key={urlEntry} href={urlEntry} target="_blank" rel="noreferrer">
                                        {urlEntry}
                                    </a>
                                ))}
                            </dd>
                        </span>
                    ) : null}
                    {languages ? (
                        <span>
                            <dt>{t('components.table.content.languages')}</dt>
                            <dd>
                                {languages.map((lang) => (
                                    <div key={lang}>{lang}</div>
                                ))}
                            </dd>
                        </span>
                    ) : null}
                    <span>
                        <dt>{t('components.table.content.accessNumber')}</dt>
                        <dd>{getter.getAN()}</dd>
                    </span>
                    <span>
                        <dt>{getter.getDatabase()}</dt>
                        <dd>{getter.getDBID()}</dd>
                    </span>
                </dl>
            }
            small
        />
    );
};

export default memo(NoAccessArticle);
