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

export type DatabaseEntryDataType = {
    id: number;
    name_fr: string;
    name_en: string;
    text_fr: string;
    text_en: string;
    url_fr: string;
    url_en: string;
    image: string; // Make a type for Base64 images
    active: boolean;
    oa: boolean;
    use_proxy: boolean;
    communities: number[]; // Make a type
    domains: string[]; // Make a type
};

export type DatabaseDataType = DatabaseEntryDataType[];

export type ResourceDataType = {
    id: number;
    name_fr: string;
    name_en: string;
    href: string;
    community: string;
    enable: boolean;
};

export type ResourcesDataType = ResourceDataType[];
