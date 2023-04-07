import { Common } from '../I18N';

/**
 * French translation
 */
const fr: Common = {
    components: {
        header: {
            login: 'Connexion',
            title: 'Accès aux ressources documentaires du CNRS',
        },
        nav: {
            article: 'Article',
            database: 'Base de données',
            journal: 'Revue, ouvrage',
            researchData: 'Données de recherche',
        },
        table: {
            noData: 'Aucun résultat trouvé.',
            content: {
                doi: 'DOI',
                doiColon: 'DOI : ',
                type: 'Type',
                publicationYear: 'Année de publication',
                description: 'Description',
                subjects: 'Mots clés',
            },
        },
        pageDate: {
            updateAt: 'mise à jour le',
        },
        footer: {
            about: 'A propos',
            contact: 'Contact',
            legal: 'Mentions légales',
        },
    },
    pages: {
        root: {
            title: 'Accueil',
        },
        about: {
            title: 'A propos',
        },
        article: {
            title: 'Article',
            searchBar:
                'Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.',
        },
        contact: {
            title: 'Contact',
        },
        database: {
            title: 'Base de données',
        },
        journal: {
            title: 'Revue, ouvrage',
            searchBar: 'Rechercher des titres de revues, de livres...',
        },
        legal: {
            title: 'Mentions légales',
        },
        researchData: {
            title: 'Données de recherche',
            search: {
                bar: 'Recherche',
                chips: {
                    by: 'Par',
                    title: 'Titre',
                    description: 'Description',
                    subject: 'Sujet',
                    doi: 'DOI',
                },
            },
        },
    },
    error: {
        '404': {
            title: '404 - Page non trouvée',
            message: "La page acutelle n'a pas étais trouvé.",
        },
        return: 'Retourner à l’accueil ',
        component: 'Le composant {{name}} a rencontré une erreur',
    },
};

export default fr;
