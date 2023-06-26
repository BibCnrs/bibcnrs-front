# Contributing to BibCNRS Front

## How Can I Contribute?

### Creating Issues

Found a bug or suggest an improvement,
[open issues](https://github.com/BibCnrs/bibcnrs-front/issues) or
[create pull requests](https://github.com/BibCnrs/bibcnrs-front/pulls)?
Please create a new issue or submit a pull request, we will be happy to receive it!

### Submitting Pull Requests

Feel free to take any open issue, just make sure that you follow the contribution guidelines.

## Contribution Guidelines

### Language to use

BibCNRS is a project by ***INIST - CNRS*** a French institute, but for any contribution in this repository we require to use
English instead of French.
We also highly recommend (if not required) using *United Kingdom (UK)* variants of English.

*Hint: use [WordReference](https://www.wordreference.com/) to found US/UK variation*

### Creating branch (on this repo)

`<prefix>/<name-of-the-feature>`

List of prefix :

| prefix        | description                                                                          |
|---------------|--------------------------------------------------------------------------------------|
| **feat**      | Adding new feature                                                                   |
| **fix**       | Fixing a bug                                                                         |
| **refactor**  | Change the structure of some element or change a lot of code                         |
| **style**     | Reformatting of code without altering any functionality                              |
| **build**     | Change in build system                                                               |
| **ci**        | Change in ci/cd workflow                                                             |
| **prototype** | Experimental branch use to test any element who wont or will by added to the project |


Exemple :

- Valide
    - `feat/history`
    - `feat/article-page`
    - `prototype/new-table-rendering`
- Not valide
    - `article-page` - Need a prefix
    - `feat/ajoute-historique` - Need to be in english

### React components

When creating or modifying react components, try to use this structure
```typescript jsx
const MyCompoments = ({data}: MyCompomentsProps) => {
    // Hook, Any hook use by this compoments [useHookName()]
    
    // State, only [useState()] hook
    
    // Effect, only [useEffect()] hook
    
    // Memo, only [useMemo()] hook
    
    // Event handler, function use to handle action from jsx html,
    // the function need to start with `handle`
    
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.text}</p>
        </div>
    );
}

// Use memo function to memorized the components
export default memo(MyCompoments);
```

### ESLint and Stylelint

Enable ESLint and Stylelint in your IDE.
Those two module is use to ensure code style guideline and in some cases to avoid possible bug.
