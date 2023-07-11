import './scss/News.scss';
import { getDomains, getFavouriteDomain } from '../../../services/user/Session';
import { useLanguageKey } from '../../../shared/locales/I18N';
import OpenablePaper from '../../element/paper/openable/OpenablePaper';
import TestsNewsFooter from '../../element/render/TestsNewsFooter';
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

    const getUrl = (url: TestNewUrlDataType): string => {
        return url.proxy ? `https://${selectedDomain}.bib.cnrs.fr/login?url=${url.url}` : url.url;
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
        </div>
    );
};

export default memo(RenderNews);
