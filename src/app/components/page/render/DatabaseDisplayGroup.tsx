import DatabaseDisplay from '../../element/render/DatabaseDisplay';
import { memo } from 'react';
import type { DatabaseDisplayGroupProps } from '../../../shared/types/props.types';

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
                <DatabaseDisplay key={entry.id} entry={entry} language={language} />
            ))}
        </ul>
    );
};

export default memo(DatabaseDisplayGroup);
