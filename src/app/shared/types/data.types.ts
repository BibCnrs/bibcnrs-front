import type { Url } from './types';
import type { Institute } from './types';

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
    page: 'faq' | 'home' | 'legal';
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
    domains: Institute[]; // Make a type
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

export type SessionUserDataType = {
    id?: number;
    username: string;
    domains: Institute[];
    favorite_domain?: Institute;
    favouriteResources?: any[]; // TODO add type
    origin?: string;
    token: string;
    fetch: false;
    legacy: boolean;
};

export type LicenceDataType = {
    id: number;
    name_fr: string;
    name_en: string;
    content_fr: string;
    content_en: string;
    pdf?: {
        src: string;
        title: string;
    };
    enable: boolean;
    common: boolean;
};

export type LicencesDataType = LicenceDataType[];

export type TestNewUrlDataType = Url & {
    proxy: true;
};

export type TestNewDataType = {
    id: string;
    name_fr: string;
    name_en: string;
    content_fr: string;
    content_en: string;
    page: string;
    from: string;
    to: string;
    urls: TestNewUrlDataType[];
    domains: string[];
    enable: boolean;
};

export type TestsNewsDataType = TestNewDataType[];

export type HistoryQueriesDataType = {
    boolean: 'AND' | 'OR';
    term: string;
    suggestedTerms: any[];
    field: any | number;
    key: string;
};

export type ArticleFacetsKeyDataType =
    | 'CollectionLibrary'
    | 'ContentProvider'
    | 'Journal'
    | 'Language'
    | 'Publisher'
    | 'RangeLexile'
    | 'SourceType'
    | 'SubjectEDS';

export type PublicationFacetsKeyDataType = 'PublisherPubDb' | 'SubjectPubDb' | 'TypePublicationPubD';

export type HistoryEntryFacetsDataType = Record<ArticleFacetsKeyDataType, string[]>;

export type HistoryEntryLimiterDataType = {
    fullText: boolean;
    openAccess: boolean;
    publicationDate: {
        from: string | null;
        to: string | null;
    };
    peerReviewed: boolean;
    peerReviewedArticle: boolean;
    publicationId: number | null;
};

export type HistoryEntryDataType = {
    id: number;
    totalCount: number;
    hasAlert: false;
    frequence: 'day' | 'month' | 'week';
    active: boolean;
    event: {
        queries: HistoryQueriesDataType[];
        limiters: HistoryEntryLimiterDataType;
        activeFacets: HistoryEntryFacetsDataType;
        sort: 'relevance';
        resultPerPage: number;
        domain: Institute;
        totalHits: number;
    };
};

export type HistoryDataType = HistoryEntryDataType[];

export type ArticleLinksDataType = {
    fullTextLinks: Url[];
    pdfLinks: Url[];
    html?: Url[] | null;
    urls: Url[];
};

export type RetrieveItemValueObjectDataType = {
    term: string;
    field: string;
    value: RetrieveItemValueObjectDataType[] | string[] | string;
};

export type RetrieveItemValueDataType = Array<
    RetrieveItemValueObjectDataType | RetrieveItemValueObjectDataType[] | string[] | string
>;

export type RetrieveItemDataType<V> = {
    name: string;
    label: string;
    value: V[];
};

export type ArticleRetrieveDataType = {
    items: Array<RetrieveItemDataType<RetrieveItemValueDataType>>;
    dbLabel: string;
    dbId: string;
    articleLinks: ArticleLinksDataType;
};

export type ArticleResultDataType = {
    id: number;
    an: string;
    dbId: string;
    articleLinks?: ArticleLinksDataType | null;
    exportLinks?: {
        ris: string;
        bibtex: string;
    } | null;
    doi?: string | null;
    title?: string | null;
    source?: string | null;
    authors?: string[] | null;
    publicationDate?: string | null;
    languages?: string[] | null;
    database: string;
    subjects?: string[] | null;
    publicationType: string;
    abstract?: string | null;
    copyright?: string | null;
    affiliationAuthor?: string[] | null;
    issn?: string[] | null;
};

export type FacetValueDataType = {
    Value: string;
    Count: number;
    AddAction: string;
};

export type FacetDataType<T extends string> = {
    Id: T;
    Label: string;
    AvailableFacetValues: FacetValueDataType[];
};

export type ArticleDataType = {
    results: ArticleResultDataType[];
    totalHits: number;
    currentPage: 1;
    maxPage: number;
    facets: Array<FacetDataType<ArticleFacetsKeyDataType>>;
    activeFacets: any;
    dateRange: {
        min: number;
        max: number;
    };
    unparsed: any;
};

export type PublicationCoverageDataType = Array<{
    start: {
        month: string;
        day: string;
        year: string;
    };
    end: {
        month: string;
        day: string;
        year: string;
    };
}>;

export type PublicationResultDataType = {
    id: number;
    publicationId: string;
    issnOnline: string[] | null;
    issnPrint: string[] | null;
    isbnOnline: string[] | null;
    isbnPrint: string[] | null;
    type: string;
    title: string;
    isDiamond: boolean;
    fullTextHoldings: Array<
        Url & {
            isCurrent: boolean;
            coverage: PublicationCoverageDataType;
        }
    >;
};

export type PublicationDataType = {
    results: PublicationResultDataType[];
    totalHits: number;
    currentPage: number;
    maxPage: number;
    facets: Array<FacetDataType<PublicationFacetsKeyDataType>>;
    activeFacets: any;
    dateRange: {
        min: number;
        max: number;
    };
    unparsed: any;
};

export type PublicationRetrieveDataType = {
    items: Array<RetrieveItemDataType<string>>;
};
