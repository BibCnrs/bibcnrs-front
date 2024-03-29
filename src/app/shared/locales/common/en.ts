import type { Common } from '../I18N';

/**
 * English translation
 */
const en: Common = {
    ebsco: {
        facets: {
            SubjectEDS: 'Subject',
            SourceType: 'Source Type',
            Journal: 'Publication',
            Language: 'Language',
            RangeLexile: 'Lexile Range',
            CollectionLibrary: 'Collection',
            Publisher: 'Publisher',
            ContentProvider: 'Content Provider',
        },
        limiters: {
            fullText: 'Full Text',
            openAccess: 'Open Access',
            publicationDate: 'Publication Date',
            peerReviewedArticle: 'Peer reviewed',
        },
    },
    components: {
        header: {
            login: 'Sign in',
            logout: 'Logout',
            title: 'CNRS documents access',
            questions: 'Q&A',
            resources: 'Lists of resources',
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
                ask: 'Request a janus account',
            },
            legacy: {
                button: 'Via your unit access code',
                username: 'Username',
                password: 'Password',
                login: 'Connection',
                error: 'The username/password entered did not allow you to connect to the portal.',
            },
            contact: 'Contact us',
        },
        dialog: {
            title: {
                alert: 'Alert settings',
                bookmark: 'Personal Resource',
            },
            fields: {
                title: 'Title',
                url: 'URL',
            },
            cancel: 'Cancel',
            save: 'Save',
        },
        nav: {
            article: 'Article',
            database: 'Database',
            publication: 'Journal, book',
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
                term: 'Searched terms',
                domain: 'Discipline',
                limiters: 'Limits',
                facets: 'Facets',
                actions: 'Actions',
                nbResult: 'Results count:',
                accessNumber: 'Accession number',
                dbId: 'D&B Key Business Ratios',
                languages: 'Language',
                publisherUrl: 'Publisher URL',
                noAccess: 'No access for this article',
                issnOnline: 'eISSN: ',
                issnPrint: 'pISSN: ',
                isbnOnline: 'eISBN: ',
                isbnPrint: 'pISBN: ',
                present: 'Present',
                links: 'Article access',
                pdf: 'Pdf access',
                alert: {
                    active: {
                        day: 'Daily',
                        week: 'Weekly',
                        month: 'Monthly',
                    },
                    disable: 'Disable/enable the alert',
                },
            },
        },
        facet: {
            title: '',
            text: 'Documents type',
            reviewed: 'Peer reviewed',
            fullText: 'Full Text',
            openAccess: 'Open Access',
            date: 'Publication Date',
            source: 'Source Type',
            subject: 'Subject',
            journal: 'Publication',
            language: 'Language',
            lexile: 'Lexile Range',
            collection: 'Collection',
            publisher: 'Publisher',
            provider: 'Content Provider',
            reset: 'Reset your filters',
            type: 'Type of publication',
            chips: {
                title: 'Title',
                description: 'Description',
                subject: 'Subject',
                doi: 'DOI',
            },
        },
        icon: {
            openAccess: "Free access to the journal's content",
            diamond: 'Open Access publication, free of charge for authors and readers',
        },
        button: {
            favourite: {
                tooltip: 'Add to favourites',
            },
        },
        dnd: {
            favourite: {
                open: 'Access',
                delete: 'Delete',
            },
        },
        news: {
            from: 'From ',
            to: ' to ',
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
            title: 'Lists of documentaries resources',
        },
        about: {
            title: 'About',
        },
        article: {
            title: 'Article',
            searchBar: 'Search articles, book chapters, DOIs, authors, words from the title abstract, ISSN, ISBN.',
            selectAll: 'Select all',
            order: {
                dateAsc: 'newest',
                dateDesc: 'oldest',
                relevance: 'relevance',
            },
        },
        contact: {
            title: 'Contact',
        },
        database: {
            title: 'Database',
            oa: 'Open Access',
            anonymousMessage: 'Sign in to access all databases',
        },
        publication: {
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
        news: {
            title: 'News',
        },
        tests: {
            title: 'Tests',
        },
        history: {
            title: 'History',
            buttons: {
                delete: 'Delete history',
                disable: 'Enable/disable all alert',
            },
            confirm: {
                delete: 'Do you really want to delete all the history (excluding alerts)?',
            },
        },
        alert: {
            title: 'Alert',
        },
        favourite: {
            title: 'My Favourites',
            add: 'Add a personal resource',
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
