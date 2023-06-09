import './Database.scss';
import ColoredPaper from '../../../components/element/paper/colored/ColoredPaper';
import PageTitle from '../../../components/internal/PageTitle';
import { BibContext } from '../../../components/internal/provider/ContextProvider';
import { getHeaderBackgroundColor } from '../../../components/internal/provider/LocalizedThemeProvider';
import ChipFacet from '../../../components/page/facet/ChipFacet';
import DatabaseDisplayGroup from '../../../components/page/render/DatabaseDisplayGroup';
import { database } from '../../../services/search/Database';
import { useDomain, useFacetsDomainHandler, useServicesCatch } from '../../../shared/hook';
import { useLanguageKey, useTranslator } from '../../../shared/locales/I18N';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { DatabaseDataType } from '../../../shared/types/data.types';

const Database = () => {
    const { login, theme, search } = useContext(BibContext);
    const serviceCatch = useServicesCatch();
    const [oa, setOa] = useState(!login);
    const t = useTranslator();
    const language = useLanguageKey();

    const handleDomain = useFacetsDomainHandler();
    const domains = useDomain();

    const { data, isError, error } = useQuery<DatabaseDataType, any, DatabaseDataType, any>({
        queryKey: ['database', oa, search.domain],
        queryFn: () => database(language, oa, search.domain),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

    useEffect(() => {
        if (isError) {
            serviceCatch(error);
        }
    }, [error, isError, serviceCatch]);

    useEffect(() => {
        setOa(!login);
    }, [login]);

    if (data === undefined) {
        return null;
    }

    const letters = [
        ...new Set(
            data
                .map<string | undefined>((value) => {
                    if (language === 'en') {
                        return value.name_en.toUpperCase().at(0);
                    }
                    return value.name_fr.toUpperCase().at(0);
                })
                .filter((value) => value !== undefined) as string[],
        ),
    ];

    return (
        <div>
            <PageTitle page="database" />
            <div className="header-footer">
                <div id="database-chips">
                    <ChipFacet value={search.domain} values={domains} onChange={handleDomain} />
                </div>
            </div>
            <div id="app">
                {login ? (
                    <FormControlLabel
                        id="database-oa"
                        className="text"
                        control={
                            <Switch
                                value={oa}
                                size="small"
                                onClick={() => {
                                    setOa(!oa);
                                }}
                            />
                        }
                        label={t('pages.database.oa')}
                        labelPlacement="end"
                    />
                ) : (
                    <ColoredPaper id="database-anonymous" elevation={4} color={getHeaderBackgroundColor(theme)} border>
                        {t('pages.database.anonymousMessage')}
                    </ColoredPaper>
                )}
                <ul id="database">
                    {letters.map((letter) => (
                        <li key={letter} className="database-letter">
                            <span className="database-letter-header">{letter}</span>
                            <DatabaseDisplayGroup letter={letter} data={data} language={language} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Database;
