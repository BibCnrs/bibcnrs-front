export type MetadoreResultTitleType = {
    title: string;
    lang?: string;
};

export type MetadoreResultDescriptionType = {
    descriptionType: string;
    description: string;
    lang?: string;
};

export type MetadoreResultType = {
    id: number;
    doi: string;
    type: string;
    titles: MetadoreResultTitleType[];
    descriptions: MetadoreResultDescriptionType[];
    subjects: string[];
    publicationYear: number;
    url: string;
};

export type MetadoreDataType = {
    results?: MetadoreResultType[];
    totalHits?: number;
    maxPage: number;
    currentPage: number;
};

export type AutoCompleteFragmentType = {
    text: string;
    user: boolean;
};

export type AutoCompleteTermType = {
    term: string;
    fragments: AutoCompleteFragmentType[];
    score: number;
    domain: string;
};

export type AutoCompleteDataType = {
    processingTime: number;
    terms: AutoCompleteTermType[];
};

export type CMSDataType = {
    id: number;
    name_fr: string;
    name_en: string;
    content_fr: string;
    content_en: string;
    page: 'home' | 'faq' | 'legal';
    from: string;
    to: string | null;
    enable: boolean;
};

export type CMSResultDataType = CMSDataType[];
