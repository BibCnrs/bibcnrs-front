import './scss/News.scss';
import { useLanguageKey } from '../../../shared/locales/I18N';
import OpenablePaper from '../../element/paper/openable/OpenablePaper';
import TestsNewsFooter from '../../element/render/TestsNewsFooter';
import { getInstituteColor } from '../../internal/provider/LocalizedThemeProvider';
import { memo, useMemo } from 'react';
import type { TestNewUrlDataType } from '../../../shared/types/data.types';
import type { TestNewDataType } from '../../../shared/types/data.types';
import type { TestsNewsProps } from '../../../shared/types/props.types';

/**
 * Component used to display news and tests article
 * @param data - Array of Articles
 * @param domain
 */
const RenderNews = ({ data, domain }: TestsNewsProps) => {
    const language = useLanguageKey();

    const filteredData = useMemo(() => {
        if (!data) {
            return [];
        }
        return data.filter((value) => {
            if (!Array.isArray(value.domains)) {
                return true;
            }
            if (value.domains.length === 0) {
                return true;
            }
            const domainsSet = new Set(value.domains);
            return domainsSet.has(domain);
        });
    }, [data, domain]);

    /**
     * Function used to get paper color
     * @param value - Article used to get the color
     * @returns - HTML color used by the paper
     */
    const getColor = (value: TestNewDataType) => {
        if (!Array.isArray(value.domains) || value.domains.length === 0) {
            return undefined;
        }
        return getInstituteColor(value.domains[0]);
    };

    const getUrl = (url: TestNewUrlDataType): string => {
        return url.proxy ? `https://${domain}.bib.cnrs.fr/login?url=${url.url}` : url.url;
    };

    return (
        <div id="tests-news-content">
            {filteredData.map((value) => (
                <OpenablePaper
                    key={value.id}
                    Title={
                        value.urls.length === 1 ? (
                            <a
                                className="tests-news-title link"
                                href={getUrl(value.urls[0])}
                                rel="noopener noreferrer nofollow"
                            >
                                {language === 'en' ? value.name_en : value.name_fr}
                            </a>
                        ) : (
                            <div className="tests-news-title">{language === 'en' ? value.name_en : value.name_fr}</div>
                        )
                    }
                    SmallBody={
                        <TestsNewsFooter
                            id={value.id}
                            page={value.page}
                            from={value.from}
                            to={value.to}
                            domains={value.domains}
                            showOpenButton
                        />
                    }
                    FullBody={
                        <div>
                            <div
                                className="tests-news-content cms-content"
                                dangerouslySetInnerHTML={{
                                    __html: language === 'en' ? value.content_en : value.content_fr,
                                }}
                            ></div>
                            {Array.isArray(value.urls) && value.urls.length > 0 ? (
                                <div key={`${value.id}-urls`}>
                                    <ul>
                                        {value.urls.map((url) => (
                                            <li key={url.name}>
                                                <a
                                                    className="link"
                                                    href={getUrl(url)}
                                                    rel="noreferrer noopener nofollow"
                                                >
                                                    {url.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                            <TestsNewsFooter
                                id={value.id}
                                page={value.page}
                                from={value.from}
                                to={value.to}
                                domains={value.domains}
                                showOpenButton
                            />
                        </div>
                    }
                    color={getColor(value)}
                    border
                />
            ))}
        </div>
    );
};

export default memo(RenderNews);
