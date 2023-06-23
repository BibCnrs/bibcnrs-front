import DatabaseIcons from '../icon/DatabaseIcons';
import AnimatedPaper from '../paper/animated/AnimatedPaper';
import Tooltip from '@mui/material/Tooltip';
import { memo } from 'react';
import type { DatabaseEntryDataType } from '../../../shared/types/data.types';

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

const DatabaseDisplay = ({ entry, language }: { entry: DatabaseEntryDataType; language: string }) => {
    return (
        <li>
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
                        </div>
                    </AnimatedPaper>
                </a>
            </Tooltip>
            <div className="database-icon">
                <DatabaseIcons title={getName(entry, language)} url={getUrl(entry, language)} oa={entry.oa} />
            </div>
        </li>
    );
};

export default memo(DatabaseDisplay);
