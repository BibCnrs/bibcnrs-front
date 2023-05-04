import './scss/TableMetadore.scss';
import { getLanguageKey, translator } from '../../../shared/locales/I18N';
import OpenablePaper from '../../paper/openable/OpenablePaper';
import type {
    MetadoreResultDescriptionType,
    MetadoreResultTitleType,
    MetadoreResultType,
} from '../../../shared/types/data.types';
import type { TableDisplayElementProps } from '../../../shared/types/props.types';

/**
 * Function used to get the translated title if available
 * @param titles Array of titles
 * @param langKey Language key
 * @return Translated title if found, or first if not found
 */
const getTitle = (titles: MetadoreResultTitleType[], langKey: string): string => {
    for (const title of titles) {
        if (title.lang === langKey) {
            return title.title;
        }
    }
    return titles[0].title;
};

/**
 * Function used to get the translated description if available
 * @param descriptions Array of descriptions
 * @param langKey Language key
 * @return Translated description if found, first if not found, or undefined as fallback if descriptions are empty
 */
const getDescription = (descriptions: MetadoreResultDescriptionType[], langKey: string): string | undefined => {
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
};

/**
 * Table Metadore display component, this component is used to display Metadore results
 * @param data Component parameter containing the data to display
 * @see TableDisplayElementProps
 */
const TableMetadore = ({ data }: TableDisplayElementProps<MetadoreResultType>) => {
    // Get translation function and language key
    const t = translator();
    const languageKey = getLanguageKey();

    // Get translated title and description if available
    const title = getTitle(data.titles, languageKey);
    const description = getDescription(data.descriptions, languageKey);

    return (
        <OpenablePaper
            Title={
                <a
                    className="table-metadore-title link"
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                >
                    {data.id}. {title} [{data.type}]
                </a>
            }
            SmallBody={
                <div className="table-metadore-body">
                    {t('components.table.content.doiColon')}
                    {data.doi}
                </div>
            }
            FullBody={
                <dl className="table-metadore-body">
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
                    ) : null}
                    {/* Show subjects if available */}
                    {data.subjects.length !== 0 ? (
                        <span>
                            <dt>{t('components.table.content.subjects')}</dt>
                            <dd>{data.subjects.join(', ')}</dd>
                        </span>
                    ) : null}
                </dl>
            }
        />
    );
};

export default TableMetadore;
