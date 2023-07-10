import BookmarkButton from '../button/BookmarkButton';
import { useMemo } from 'react';
import type { ArticleContentGetter } from '../../../services/search/Article';
import type { Url } from '../../../shared/types/types';

const ArticleLinks = ({
    links,
    title,
    proxify,
    domain,
}: {
    links: Url[];
    title?: string | null;
    proxify: ArticleContentGetter['proxify'];
    domain?: string;
}) => {
    const proxyLinks = useMemo(() => {
        return links.map((link): Url => {
            const proxyUrl = proxify(link, domain);
            if (proxyUrl) {
                link.url = proxyUrl;
            }
            return link;
        });
    }, [domain, links, proxify]);

    return (
        <dd>
            {proxyLinks.map((value) => (
                <div
                    key={value.name}
                    style={{
                        display: 'flex',
                    }}
                >
                    <a className="link" href={value.url} target="_blank" rel="nofollow noreferrer noopener">
                        {value.name}
                    </a>
                    <span
                        style={{
                            marginLeft: '4px',
                        }}
                    >
                        <BookmarkButton title={`${title} - ${value.name}`} url={value.url} />
                    </span>
                </div>
            ))}
        </dd>
    );
};

export default ArticleLinks;
