import { Common } from '../I18N';

/**
 * English translation
 */
const en: Common = {
    components: {
        header: {
            login: 'Sign in',
            logout: 'Logout',
            title: 'CNRS documents access',
            questions: 'Q&A',
            resources: 'Resources',
            licences: 'Licences',
            tests: 'Tests',
            news: 'News',
            user: {
                history: 'My History',
                bookmark: 'My Bookmark',
                notifications: 'My Alerts',
                legacy: 'You are not logged on at the individual level',
            },
        },
        authentication: {
            title: 'Identify yourself',
            info: 'This resource or service is reserved for CNRS rights holders. Please sign in.',
            mode: 'Please select your signing-in mode:',
            janus: {
                button: 'Via Janus identity manager',
                tooltip: 'Personal account for all CNRS services Agate, Simbad ...',
                ask: 'request a janus account',
            },
            legacy: {
                button: 'Via your old portal access code',
                username: 'username',
                password: 'password',
                login: 'Connection',
                error: 'The username/password entered did not allow you to connect to the portal.',
            },
            contact: 'contact us',
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
            mail: {
                subject: 'Request for assistance',
                body: `Hello,
In order to best answer your request, we would be grateful if you could specify your :

 • Name, First name:
 • Unit code (e.g.: UMR 12344):
 • Request, question or problem encountered, suggestion of resource...

Sincerely`,
            },
        },
    },
    pages: {
        root: {
            title: 'Home',
        },
        resources: {
            title: 'Resources',
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
        faq: {
            title: 'Q&A',
        },
        licences: {
            title: 'Licences',
            empty: 'No licences was founds.',
            pdf: 'PDF link:',
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
