import './scss/News.scss';
import { getDomains, getFavouriteDomain } from '../../../services/user/Session';
import { useLanguageKey, useTranslator } from '../../../shared/locales/I18N';
import PageDate from '../../element/PageDate';
import OpenablePaper from '../../element/paper/openable/OpenablePaper';
import { getInstituteColor } from '../../internal/provider/LocalizedThemeProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { memo, useState } from 'react';
import type { TestNewUrlDataType } from '../../../shared/types/data.types';
import type { TestNewDataType } from '../../../shared/types/data.types';
import type { TestsNewsProps } from '../../../shared/types/props.types';
import type { RadioProps } from '@mui/material/Radio/Radio';
import type { ChangeEvent } from 'react';

/**
 * Component used to display news and tests article
 * @param data - Array of Articles
 */
const RenderNews = ({ data }: TestsNewsProps) => {
    const t = useTranslator();
    const language = useLanguageKey();
    const favouriteDomain = getFavouriteDomain();
    const domains = getDomains().filter((domain) => domain !== favouriteDomain);
    const [selectedDomain, setSelectedDomain] = useState(favouriteDomain || domains[0]);

    /**
     * Function used to handle domain change
     * @param event - Radio button event
     */
    const handleDomainChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDomain(event.target.value);
    };

    /**
     * Function used to create navigation controls properties
     * @param domain - Domain of the article
     * @returns - Returns a radio button props who match domain colors
     */
    const navigationControlProps = (domain: string): Partial<RadioProps> => ({
        checked: selectedDomain === domain,
        value: domain,
        onChange: handleDomainChange,
        inputProps: { 'aria-label': domain },
        sx: {
            color: getInstituteColor(domain),
            '&.Mui-checked': {
                color: getInstituteColor(domain),
            },
        },
    });

    /**
     * Display nothing if data is null or undefined
     */
    if (!data) {
        return null;
    }

    /**
     * Function used to filter the data by domain
     * @returns filtered data associated to the selected domain
     */
    const getData = () => {
        return data.filter((value) => {
            if (!Array.isArray(value.domains)) {
                return true;
            }
            if (value.domains.length === 0) {
                return true;
            }
            const domainsSet = new Set(value.domains);
            return domainsSet.has(selectedDomain);
        });
    };

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

    /**
     * Function used to get the article domain label
     * @param value - Article
     * @returns - Join labels
     */
    const getLabel = (value: TestNewDataType) => {
        if (!Array.isArray(value.domains) || value.domains.length === 0) {
            return null;
        }
        return ` • ${value.domains?.join(', ')}`;
    };

    const getUrl = (url: TestNewUrlDataType): string => {
        return url.proxy ? `https://${selectedDomain}.bib.cnrs.fr/login?url=${url.url}` : url.url;
    };

    /**
     * Function used to create article footer
     * @param value - Article
     */
    const TestsNewsFooter = ({ value }: { value: TestNewDataType }) => {
        return (
            <div>
                <i>
                    {value.to ? t('components.news.from') : null}
                    <PageDate date={value.from} />
                    {value.to ? (
                        <>
                            {t('components.news.to')}
                            <PageDate date={value.to} />
                        </>
                    ) : null}
                    {getLabel(value)}
                </i>
            </div>
        );
    };

    return (
        <div id="tests-news">
            {/*------------ Domain nav bar, used to select a domain ------------*/}
            <div id="tests-news-nav">
                {favouriteDomain ? (
                    <FormControlLabel
                        control={<Radio {...navigationControlProps(favouriteDomain)} />}
                        label={favouriteDomain}
                        sx={{
                            color: 'var(--text)',
                        }}
                    />
                ) : null}
                {domains.map((domain) => (
                    <FormControlLabel
                        key={domain}
                        control={<Radio {...navigationControlProps(domain)} />}
                        label={domain}
                        sx={{
                            color: 'var(--text)',
                        }}
                    />
                ))}
            </div>
            {/*------------ list of articles associated to the selected domain ------------*/}
            <div id="tests-news-content">
                {getData().map((value) => (
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
                                <div className="tests-news-title">
                                    {language === 'en' ? value.name_en : value.name_fr}
                                </div>
                            )
                        }
                        SmallBody={<TestsNewsFooter value={value} />}
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
                                <TestsNewsFooter value={value} />
                            </div>
                        }
                        color={getColor(value)}
                        border
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(RenderNews);
