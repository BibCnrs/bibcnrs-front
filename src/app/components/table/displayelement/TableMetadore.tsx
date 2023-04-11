import { TableDisplayElementProps } from '../../../shared/types/props.types';
import { MetadoreResultDescriptionType, MetadoreResultTitleType } from '../../../shared/types/data.types';
import { getLanguageKey, translator } from '../../../shared/locales/I18N';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import './DisplayElement.scss';

/**
 * Function use to get the translated title if available
 * @param titles Array of titles
 * @param langKey Language key
 * @return Translated title if found, or first if not found
 */
function getTitle(titles: MetadoreResultTitleType[], langKey: string): string {
    for (const title of titles) {
        if (title.lang === langKey) {
            return title.title;
        }
    }
    return titles[0].title;
}

/**
 * Function use to get the translated description if available
 * @param descriptions Array of descriptions
 * @param langKey Language key
 * @return Translated description if found, first if not found, or undefined as fallback if descriptions is empty
 */
function getDescription(descriptions: MetadoreResultDescriptionType[], langKey: string): string | undefined {
    if (descriptions.length === 0) {
        return undefined;
    }
    for (const description of descriptions) {
        if (description.lang === langKey && description.descriptionType === 'Abstract') {
            return description.description;
        }
    }
    for (const description of descriptions) {
        if (description.descriptionType === 'Abstract') {
            return description.description;
        }
    }
    return descriptions[0].description;
}

/**
 * Table Metadore display component, this component is used to display Metadore results
 * @param props Component parameter containing the data to display
 * @see TableDisplayElementProps
 */
export default function TableMetadore(props: TableDisplayElementProps) {
    const { data } = props;

    // Get translation function and langague key
    const t = translator();
    const languageKey = getLanguageKey();

    // Metadore display stats
    const [open, setOpen] = useState<boolean>(false);
    const [elevation, setElevation] = useState<number>(1);

    // Get translated title and description if available
    const title = getTitle(data.titles, languageKey);
    const description = getDescription(data.descriptions, languageKey);

    return (
        <Paper
            className="table-element"
            onMouseOver={() => setElevation(4)}
            onMouseOut={() => setElevation(1)}
            elevation={elevation}
        >
            {/* Display title with result link and the button the show everything */}
            <h4>
                <IconButton
                    onClick={() => setOpen(!open)}
                    size="small"
                    color="primary"
                    className="table-button-position"
                >
                    <ArrowForwardIosIcon className={open ? 'table-button table-button-open' : 'table-button'} />
                </IconButton>
                <a href={data.url} target="_blank">
                    {data.id}. {title} [{data.type}]
                </a>
            </h4>
            {/* Show everything if open or juste show the doi */}
            {open ? (
                <dl>
                    <span>
                        <dt>{t('components.table.content.doi')}</dt>
                        <dd>{data.doi}</dd>
                    </span>
                    <span>
                        <dt>{t('components.table.content.type')}</dt>
                        <dd>{data.type}</dd>
                    </span>
                    <span>
                        <dt>{t('components.table.content.publicationYear')}</dt>
                        <dd>{data.publicationYear}</dd>
                    </span>
                    {/* Show description if available */}
                    {description ? (
                        <span>
                            <dt>{t('components.table.content.description')}</dt>
                            <dd>{description}</dd>
                        </span>
                    ) : (
                        <></>
                    )}
                    {/* Show subjects if available */}
                    {data.subjects.length !== 0 ? (
                        <span>
                            <dt>{t('components.table.content.subjects')}</dt>
                            <dd>{data.subjects.join(', ')}</dd>
                        </span>
                    ) : (
                        <></>
                    )}
                </dl>
            ) : (
                <div>
                    {t('components.table.content.doiColon')}
                    {data.doi}
                </div>
            )}
        </Paper>
    );
}
