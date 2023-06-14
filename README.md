# BibCNRS Front


## Installation and development

Install required dependencies: `npm install`

To run the development server use : `npm run dev`

To run the preview server use: `npm run build` and `npm run preview`

## Comment faire les branch pour les Pulls requests

Structure :

`<préfixe>/<nom-de-la-fonctionnalités>`

Liste des préfixes :

| préfixe       | description                                                                                       |
|---------------|---------------------------------------------------------------------------------------------------|
| **feat**      | Ajoute de fonctionnalités                                                                         |
| **fix**       | Correction d'un bug                                                                               |
| **refactor**  | Change des element structure du code sans forcément changé le fonctionnement final                |
| **style**     | Correction de typos, formatage du code et autre element ne changent pas le fonctionnement du code |
| **build**     | Modification du système lié au build et dependence de l'application                               |
| **ci**        | Modification de la ci / cd                                                                        |
| **prototype** | Branch experimental qui a pour vocation de testé des fonctionnalités                              |


Exemple :

- Valide
  - `feat/history`
  - `feat/article-page`
  - `prototype/new-table-rendering`
- Non valide
  - `article-page` - Doit avoir un préfixe
  - `feat/ajoute-historique` - Doit être en anglais et contenir uniquement l'essentiel
