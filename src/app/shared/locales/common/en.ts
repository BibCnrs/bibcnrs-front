import { Common } from '../I18N';

/**
 * English translation
 */
const en: Common = {
    components: {
        header: {
            login: 'Sign in',
            title: 'CNRS documents access',
        },
        nav: {
            article: 'Article',
            database: 'Database',
            journal: 'Journal, book',
            researchData: 'Research data',
        },
        table: {
            noData: 'No result found.',
            content: {
                doi: 'DOI',
                doiColon: 'DOI: ',
                type: 'Type',
                publicationYear: 'Publication year',
                description: 'Description',
                subjects: 'Keys words',
            },
        },
        pageDate: {
            updateAt: 'updated on',
        },
        footer: {
            about: 'About',
            contact: 'Contact',
            legal: 'Legal notice',
        },
    },
    pages: {
        root: {
            title: 'Home',
        },
        about: {
            title: 'About',
        },
        article: {
            title: 'Article',
            searchBar: 'Search articles, book chapters, DOIs, authors, words from the title abstract, ISSN, ISBN.',
        },
        contact: {
            title: 'Contact',
        },
        database: {
            title: 'Database',
        },
        journal: {
            title: 'Journal, book',
            searchBar: 'Search journal titles, book titles...',
        },
        legal: {
            title: 'Legal notice',
        },
        researchData: {
            title: 'Research data',
            search: {
                bar: 'Search',
                chips: {
                    by: 'By',
                    title: 'Title',
                    description: 'Description',
                    subject: 'Subject',
                    doi: 'DOI',
                },
            },
        },
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
