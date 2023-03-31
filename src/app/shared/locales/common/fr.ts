import { Common } from '../I18N';

/**
 * French translation
 */
const fr: Common = {
    components: {
        table: {
            noData: 'Aucun résultat trouvé.',
        },
    },
    pages: {
        about: {
            title: 'A propos',
        },
        article: {
            searchBar:
                'Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.',
            title: 'Article',
        },
        contact: {
            title: 'Contact',
        },
        database: {
            title: 'Base de données',
        },
        journal: {
            searchBar: 'Rechercher des titres de revues, de livres...',
            title: 'Revue, ouvrage',
        },
        legal: {
            title: 'Politique de confidentialité',
        },
        researchData: {
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
            title: 'Données de recherche',
            content: {
                doi: 'DOI',
                doiColon: 'DOI : ',
                type: 'Type',
                publicationYear: 'Année de publication',
                description: 'Description',
                subjects: 'Mots clés',
            },
        },
    },
    nav: {
        article: 'Article',
        database: 'Base de données',
        journal: 'Revue, ouvrage',
        researchData: 'Données de recherche',
    },
    header: {
        login: 'Connexion',
        title: 'Accès aux ressources documentaires du CNRS',
    },
    footer: {
        about: 'A propos',
        contact: 'Contact',
        legal: 'Politique de confidentialité',
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
