export const environment = {
    host: import.meta.env.VITE_BIBAPI_HOST,
    get: {
        metadore: '/ebsco/metadore/search',
        cms: '/ebsco/cms',
        database: '/ebsco/databases',
        resources: '/ebsco/resources',
        account: {
            janus: '/ebsco/login_renater',
            licences: '/ebsco/licenses',
            testsNews: '/ebsco/news',
            history: '/ebsco/history',
        },
    },
    post: {
        account: {
            legacy: '/ebsco/login',
            user: '/ebsco/getLogin',
            logout: '/ebsco/logout',
        },
    },
};

export const createQuery = (uri: string, param?: any | undefined): URL => {
    const url = new URL(uri, environment.host);
    if (param !== undefined) {
        const query = new URLSearchParams(param);
        url.search = query.toString();
    }
    return url;
};

export const json = <T>(response: Response): Promise<T> => {
    return response.json() as Promise<T>;
};
