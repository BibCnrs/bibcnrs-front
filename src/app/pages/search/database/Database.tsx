import './Database.scss';
import { getLanguageKey, translator } from '../../../shared/locales/I18N';
import PageTitle from '../../../components/utils/PageTitle';
import { DatabaseDataType, DatabaseEntryDataType } from '../../../shared/types/data.types';
import { database } from '../../../services/common/Database';
import { DatabaseDisplayGroupProps } from '../../../shared/types/props.types';
import AnimatedPaper from '../../../components/paper/animated/AnimatedPaper';
import { BibContext } from '../../../components/utils/ContextProvider';
import { useQuery } from '@tanstack/react-query';
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';

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
            {filteredData.map((entry, index) => (
                <li key={index}>
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
                                        <img className="database-entry-oa" src="/icons/oa.png" alt="Open access icon" />
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
    const t = translator();
    const language = getLanguageKey();

    const { data } = useQuery<DatabaseDataType, any, DatabaseDataType, any>({
        queryKey: ['database', login],
        queryFn: () => database(language, login),
        keepPreviousData: true,
        staleTime: 3600000, // 1 hour of cache
        cacheTime: 3600000, // 1000 * 60 * 60
    });

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
