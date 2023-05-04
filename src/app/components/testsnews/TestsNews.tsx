import './TestsNews.scss';
import { getDomains, getFavoriteDomain } from '../../services/user/Session';
import { getLanguageKey, translator } from '../../shared/locales/I18N';
import OpenablePaper from '../paper/openable/OpenablePaper';
import { getInstituteColor } from '../provider/LocalizedThemeProvider';
import PageDate from '../utils/PageDate';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import type { TestNewDataType } from '../../shared/types/data.types';
import type { TestsNewsProps } from '../../shared/types/props.types';
import type { RadioProps } from '@mui/material/Radio/Radio';
import type { ChangeEvent } from 'react';

/**
 * Component use to display news and tests article
 * @param data - Array of Articles
 */
const TestsNews = ({ data }: TestsNewsProps) => {
    const t = translator();
    const language = getLanguageKey();
    const favoriteDomain = getFavoriteDomain();
    const domains = getDomains().filter((domain) => domain !== favoriteDomain);
    const [selectedDomain, setSelectedDomain] = useState(favoriteDomain || domains[0]);

    /**
     * Function use to handle domain change
     * @param event - Radio button event
     */
    const handleDomainChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDomain(event.target.value);
    };

    /**
     * Function use to create navigation controls properties
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
     * Function use to filter the data by domain
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
            if (favoriteDomain && domainsSet.has(favoriteDomain)) {
                return true;
            }
            return domains.some((d) => domainsSet.has(d));
        });
    };

    /**
     * Function use to get paper color
     * @param value - Article use to get the color
     * @returns - HTML color use by the paper
     */
    const getColor = (value: TestNewDataType) => {
        if (!Array.isArray(value.domains) || value.domains.length === 0) {
            return undefined;
        }
        return getInstituteColor(value.domains[0]);
    };

    /**
     * Function use to get the article domain label
     * @param value - Article
     * @returns - Join labels
     */
    const getLabel = (value: TestNewDataType) => {
        if (!Array.isArray(value.domains) || value.domains.length === 0) {
            return t('components.testsnews.common');
        }
        return value.domains?.join(', ');
    };

    /**
     * Function use to create article footer
     * @param value - Article
     */
    const TestsNewsFooter = ({ value }: { value: TestNewDataType }) => {
        return (
            <div>
                <i>
                    {value.to ? t('components.testsnews.from') : null}
                    <PageDate date={value.from} />
                    {value.to ? (
                        <>
                            {t('components.testsnews.to')}
                            <PageDate date={value.to} />
                        </>
                    ) : null}
                    {' • '}
                    {getLabel(value)}
                </i>
            </div>
        );
    };

    return (
        <div id="tests-news">
            {/* Domain nav bar, use to select a domain */}
            <div id="tests-news-nav">
                {favoriteDomain ? (
                    <FormControlLabel
                        control={<Radio {...navigationControlProps(favoriteDomain)} />}
                        label={favoriteDomain}
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
            {/* list of articles associated to the selected domain */}
            <div id="tests-news-content">
                {getData().map((value, index) => (
                    <OpenablePaper
                        key={index}
                        Title={<>{language === 'en' ? value.name_en : value.name_fr}</>}
                        SmallBody={<TestsNewsFooter value={value} />}
                        FullBody={
                            <div>
                                <div
                                    className="tests-news-content"
                                    dangerouslySetInnerHTML={{
                                        __html: language === 'en' ? value.content_en : value.content_fr,
                                    }}
                                ></div>
                                {Array.isArray(value.urls) && value.urls.length > 0 ? (
                                    <div>
                                        <ul>
                                            {value.urls.map((url, indexUrl) => (
                                                <li key={indexUrl}>
                                                    <a
                                                        className="link"
                                                        href={url.url}
                                                        rel="noreferrer noopener nofollow"
                                                    >
                                                        {url.name}
                                                    </a>
                                                    {url.proxy ? <i> (URL PROXY)</i> : null}
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

export default TestsNews;
