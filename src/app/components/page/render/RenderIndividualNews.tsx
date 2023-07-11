import './scss/News.scss';
import { getDomains, getFavouriteDomain } from '../../../services/user/Session';
import { useLanguageKey } from '../../../shared/locales/I18N';
import ColoredPaper from '../../element/paper/colored/ColoredPaper';
import TestsNewsFooter from '../../element/render/TestsNewsFooter';
import { getInstituteColor } from '../../internal/provider/LocalizedThemeProvider';
import { useMemo } from 'react';
import type { TestNewUrlDataType } from '../../../shared/types/data.types';
import type { TestNewDataType } from '../../../shared/types/data.types';

/* eslint-disable camelcase */
const RenderIndividualNews = ({ id, page, urls, content_fr, content_en, from, to, domains }: TestNewDataType) => {
    const language = useLanguageKey();

    const favouriteDomain = getFavouriteDomain();
    const userDomains = getDomains();

    const selectedDomain = useMemo(() => {
        const filteredUserDomain = userDomains.filter((domain) => domain !== favouriteDomain);
        return favouriteDomain || filteredUserDomain[0];
    }, [favouriteDomain, userDomains]);

    const getUrl = (url: TestNewUrlDataType): string => {
        return url.proxy ? `https://${selectedDomain}.bib.cnrs.fr/login?url=${url.url}` : url.url;
    };

    return (
        <ColoredPaper className="individual-news" color={getInstituteColor(selectedDomain)} elevation={4} border>
            <div
                dangerouslySetInnerHTML={{
                    __html: language === 'en' ? content_en : content_fr,
                }}
            ></div>
            {Array.isArray(urls) && urls.length > 0 ? (
                <div key={`${id}-urls`}>
                    <ul>
                        {urls.map((url) => (
                            <li key={url.name}>
                                <a className="link" href={getUrl(url)} rel="noreferrer noopener nofollow">
                                    {url.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
            <TestsNewsFooter id={id} page={page} from={from} to={to} domains={domains} />
        </ColoredPaper>
    );
};

export default RenderIndividualNews;
