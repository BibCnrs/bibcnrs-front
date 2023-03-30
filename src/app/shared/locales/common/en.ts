import { Common } from '../I18N';

/**
 * English translation
 */
const en: Common = {
    pages: {
        about: {
            title: 'About',
        },
        article: {
            searchBar: 'Search articles, book chapters, DOIs, authors, words from the title abstract, ISSN, ISBN.',
            title: 'Article',
        },
        contact: {
            title: 'Contact',
        },
        database: {
            title: 'Database',
        },
        journal: {
            searchBar: 'Search journal titles, book titles...',
            title: 'Journal, book',
        },
        legal: {
            title: 'Legal notice',
        },
        researchData: {
            searchBar: 'Search',
            title: 'Research data',
            content: {
                doi: 'DOI',
                doiColon: 'DOI: ',
                type: 'Type',
                publicationYear: 'Publication year',
                description: 'Description',
                subjects: 'Keys words',
            },
        },
    },
    nav: {
        article: 'Article',
        database: 'Database',
        journal: 'Journal, book',
        researchData: 'Research data',
    },
    header: {
        login: 'Sign in',
        title: 'CNRS documents access',
    },
    footer: {
        about: 'About',
        contact: 'Contact',
        legal: 'Legal notice',
    },
    error: {
        '404': {
            title: '404 - Page not found',
            message: 'The current page as not been found.',
        },
        return: 'Go back to home',
        component: 'The component {{name}} have encountered an error',
    },
};

export default en;
