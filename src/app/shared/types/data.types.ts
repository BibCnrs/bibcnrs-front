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
    results: MetadoreResultType[];
    totalHits: number;
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
