import './Database.scss';
import AnimatedPaper from '../../../components/paper/animated/AnimatedPaper';
import { BibContext } from '../../../components/provider/ContextProvider';
import PageTitle from '../../../components/utils/PageTitle';
import { database } from '../../../services/common/Database';
import { useLanguageKey, useTranslator } from '../../../shared/locales/I18N';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import type { DatabaseDataType, DatabaseEntryDataType } from '../../../shared/types/data.types';
import type { DatabaseDisplayGroupProps } from '../../../shared/types/props.types';

const getName = (entry: DatabaseEntryDataType, language: string) => {
    if (language === 'en') {
        return entry.name_en;
    }
    return entry.name_fr;
};

const getText = (entry: DatabaseEntryDataType, language: string) => {
    if (language === 'en') {
        return entry.text_en;
    }
    return entry.text_fr;
};

const getUrl = (entry: DatabaseEntryDataType, language: string) => {
    if (language === 'en') {
        return entry.url_en;
    }
    return entry.url_fr;
};

const getImage = (entry: DatabaseEntryDataType) => {
    if (entry.image) {
        return {
            backgroundImage: `url("${entry.image}")`,
        };
    }
    return undefined;
};

const DatabaseDisplayGroup = ({ letter, data, language }: DatabaseDisplayGroupProps) => {
    const filteredData = data.filter((value) => {
        if (language === 'en') {
            return value.name_en.toUpperCase().startsWith(letter);
        }
        return value.name_fr.toUpperCase().startsWith(letter);
    });

    return (
        <ul>
            {filteredData.map((entry) => (
                <li key={entry.id}>
                    <Tooltip title={getText(entry, language)} arrow>
                        <a
                            href={getUrl(entry, language)}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            aria-label={getName(entry, language)}
                            className="database-entry"
                        >
                            <AnimatedPaper className="database-entry-content">
                                <div className="database-entry-content-inner" style={getImage(entry)}>
                                    <span className="database-entry-text">{getName(entry, language)}</span>
                                    {entry.oa ? (
                                        <img
                                            className="database-entry-oa"
                                            src="/icons/open_access.svg"
                                            alt="Open access icon"
                                        />
                                    ) : null}
                                </div>
                            </AnimatedPaper>
                        </a>
                    </Tooltip>
                </li>
            ))}
        </ul>
    );
};

const Database = () => {
    const { login } = useContext(BibContext);
    const [oa, setOa] = useState(!login);
    const t = useTranslator();
    const language = useLanguageKey();

    const { data } = useQuery<DatabaseDataType, any, DatabaseDataType, any>({
        queryKey: ['database', oa],
        queryFn: () => database(language, oa),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

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
        <div id="app">
            <PageTitle page={'database'} t={t} />
            {login ? (
                <FormControlLabel
                    id="database-oa"
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
            ) : null}

            <ul id="database">
                {letters.map((letter) => (
                    <li key={letter} className="database-letter">
                        <span className="database-letter-header">{letter}</span>
                        <DatabaseDisplayGroup letter={letter} data={data} language={language} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Database;
