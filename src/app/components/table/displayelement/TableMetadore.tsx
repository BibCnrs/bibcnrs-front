import { TableDisplayElementProps } from '../../../shared/types/props.types';
import { MetadoreResultDescriptionType, MetadoreResultTitleType } from '../../../shared/types/data.types';
import { useState } from 'react';
import { getLanguageKey, translator } from '../../../shared/locales/I18N';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import './DisplayElement.scss';

function getTitle(titles: MetadoreResultTitleType[], langKey: string): string {
    for (const title of titles) {
        if (title.lang === langKey) return title.title;
    }
    return titles[0].title;
}

function getDescription(descriptions: MetadoreResultDescriptionType[], langKey: string): string | undefined {
    if (descriptions.length === 0) return undefined;
    for (const description of descriptions) {
        if (description.lang === langKey && description.descriptionType === 'Abstract') return description.description;
    }
    for (const description of descriptions) {
        if (description.descriptionType === 'Abstract') return description.description;
    }
    return descriptions[0].description;
}

export default function TableMetadore(props: TableDisplayElementProps) {
    const { data } = props;
    const t = translator();
    const languageKey = getLanguageKey();
    const [open, setOpen] = useState(false);

    const title = getTitle(data.titles, languageKey);
    const description = getDescription(data.descriptions, languageKey);
    return (
        <Paper className="table-element">
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
            {open ? (
                <dl>
                    <span>
                        <dt>{t('pages.researchData.content.doi')}</dt>
                        <dd>{data.doi}</dd>
                    </span>
                    <span>
                        <dt>{t('pages.researchData.content.type')}</dt>
                        <dd>{data.type}</dd>
                    </span>
                    <span>
                        <dt>{t('pages.researchData.content.publicationYear')}</dt>
                        <dd>{data.publicationYear}</dd>
                    </span>
                    {description ? (
                        <span>
                            <dt>{t('pages.researchData.content.description')}</dt>
                            <dd>{description}</dd>
                        </span>
                    ) : (
                        <></>
                    )}
                    {data.subjects.length !== 0 ? (
                        <span>
                            <dt>{t('pages.researchData.content.subjects')}</dt>
                            <dd>{data.subjects.join(', ')}</dd>
                        </span>
                    ) : (
                        <></>
                    )}
                </dl>
            ) : (
                <div>
                    {t('pages.researchData.content.doiColon')}
                    {data.doi}
                </div>
            )}
        </Paper>
    );
}
