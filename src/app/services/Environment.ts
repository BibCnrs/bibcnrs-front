export const environment = {
    host: import.meta.env.VITE_BIBAPI_HOST,
    get: {
        cms: '/ebsco/cms',
        resources: '/ebsco/resources',
        search: {
            article: '/ebsco/{domain}/article/search',
            publication: '/ebsco/{domain}/publication/search',
            database: '/ebsco/databases',
            metadore: '/ebsco/metadore/search',
        },
        retrieve: {
            article: '/ebsco/{domain}/article/retrieve',
            publication: '/ebsco/{domain}/publication/retrieve',
        },
        account: {
            janus: '/ebsco/login_renater/',
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
            history: '/ebsco/history',
        },
    },
    delete: {
        account: {
            history: '/ebsco/history',
            histories: '/ebsco/histories',
        },
    },
} as const;

export const createQuery = (uri: string, param?: any | undefined): URL => {
    const url = new URL(environment.host + uri);
    if (param !== undefined) {
        const query = new URLSearchParams(param);
        url.search = query.toString();
    }
    return url;
};

export const throwIfNotOk = (response: Response) => {
    if (response.ok) {
        return;
    }
    // User input error
    if (response.status === 400) {
        throw new Error('400', { cause: '400' });
    }
    if (response.status === 401) {
        throw new Error('401', { cause: '401' });
    }
    if (response.status === 403) {
        throw new Error('403', { cause: '403' });
    }
    if (response.status === 404) {
        throw new Error('404', { cause: '404' });
    }

    // Server error
    if (response.status === 500) {
        throw new Error('500', { cause: '500' });
    }

    // Reverse proxy error
    if (response.status === 502) {
        throw new Error('502', { cause: '502' });
    }
    if (response.status === 503) {
        throw new Error('503', { cause: '503' });
    }

    throw new Error(`${response.status} - The server return an expected error`, { cause: null });
};

export const json = <T>(response: Response): Promise<T> => {
    return response.json() as Promise<T>;
};
