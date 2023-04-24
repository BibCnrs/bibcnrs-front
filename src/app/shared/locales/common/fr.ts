import { Common } from '../I18N';

/**
 * French translation
 */
const fr: Common = {
    components: {
        header: {
            login: 'Connexion',
            logout: 'Déconnexion',
            title: 'Accès aux ressources documentaires du CNRS',
            questions: 'FAQ',
            resources: 'Ressources',
            licences: 'Licences',
            tests: 'Tests',
            news: 'Actualités',
            user: {
                history: 'Mon Historique',
                bookmark: 'Mes Favoris',
                notifications: 'Mes Alertes',
            },
        },
        authentication: {
            title: 'Identifiez-vous',
            info: "La ressource ou le service souhaité est réservé aux ayants droit du CNRS. Pour y accéder il est nécessaire de s'identifier.",
            mode: 'Veuillez sélectionner votre mode de connexion :',
            janus: {
                button: "Via le gestionnaire d'identité janus",
                tooltip: "Compte personnel pour l'ensemble des services du CNRS : Agate, Simbad...",
                ask: 'demander un compte janus',
            },
            legacy: {
                button: "Via votre ancien code d'accès portail",
                username: 'indentifiant',
                password: 'mot de passe',
                login: 'Connexion',
                error: "L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail.",
            },
            contact: 'nous contacter',
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
            mail: {
                subject: 'Demande d’assistance',
                body: `Bonjour,
Afin de répondre au mieux à votre demande, nous vous remercions de bien vouloir préciser votre :

 • Nom, Prénom :
 • Code unité (ex :UMR 12344) :
 • Demande, question ou problème rencontré, suggestion de ressource, …

Cordialement`,
            },
        },
    },
    pages: {
        root: {
            title: 'Accueil',
        },
        resources: {
            title: 'Ressources',
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
        faq: {
            title: 'FAQ',
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
