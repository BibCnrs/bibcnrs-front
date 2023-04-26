import './News.scss';
import { getLanguageKey, translator } from '../../../shared/locales/I18N';
import { TestNewDataType, TestsNewsDataType } from '../../../shared/types/data.types';
import { news } from '../../../services/user/TestsNews';
import PageTitle from '../../../components/utils/PageTitle';
import { getDomains, getFavoriteDomain } from '../../../services/user/Session';
import { getInstituteColor } from '../../../components/provider/LocalizedThemeProvider';
import OpenablePaper from '../../../components/paper/openable/OpenablePaper';
import PageDate from '../../../components/utils/PageDate';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const News = () => {
    const t = translator();
    const language = getLanguageKey();
    const favoriteDomain = getFavoriteDomain();
    const domains = getDomains().filter((domain) => domain !== favoriteDomain);
    const [selectedDomain, setSelectedDomain] = useState(favoriteDomain || domains[0]);

    const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
        queryKey: ['news'],
        queryFn: news,
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    const handleDomainChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDomain(event.target.value);
    };

    const navigationControlProps = (domain: string) => ({
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

    if (!data) {
        return null;
    }

    const getData = () => {
        return data.filter((value) => {
            if (!value.domains) {
                return true;
            }
            if (value.domains.length === 0) {
                return true;
            }
            if (favoriteDomain && value.domains.includes(favoriteDomain)) {
                return true;
            }
            for (const domain of domains) {
                const includes = value.domains.includes(domain);
                if (includes) {
                    return true;
                }
            }
            return false;
        });
    };

    const getColor = (value: TestNewDataType) => {
        if (!value.domains || value.domains.length === 0) {
            return undefined;
        }
        return getInstituteColor(value.domains[0]);
    };

    const getLabel = (value: TestNewDataType) => {
        if (!value.domains || value.domains.length === 0) {
            return t('pages.news.common');
        }
        return value.domains?.join(', ');
    };

    return (
        <div id="app">
            <PageTitle page="news" t={t} />
            <h1>{t('pages.news.title')}</h1>
            <div id="news">
                <div id="news-nav">
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
                <div id="news-content">
                    {getData().map((value) => (
                        <OpenablePaper
                            Title={<>{language === 'en' ? value.name_en : value.name_fr}</>}
                            SmallBody={
                                <div>
                                    <PageDate date={value.from} />
                                    {' • '}
                                    <i>{getLabel(value)}</i>
                                </div>
                            }
                            FullBody={
                                <div>
                                    <div
                                        className="cms-content"
                                        dangerouslySetInnerHTML={{
                                            __html: language === 'en' ? value.content_en : value.content_fr,
                                        }}
                                    ></div>
                                    <div>
                                        <PageDate date={value.from} />
                                        {' • '}
                                        <i>{getLabel(value)}</i>
                                    </div>
                                </div>
                            }
                            color={getColor(value)}
                            border
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
