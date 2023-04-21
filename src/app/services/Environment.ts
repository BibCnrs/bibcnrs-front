export const environment = {
    host: import.meta.env.VITE_BIBAPI_HOST,
    get: {
        metadore: '/ebsco/metadore/search',
        cms: '/ebsco/cms',
        database: '/ebsco/databases',
        resources: '/ebsco/resources',
        account: {
            janus: '/ebsco/login_renater',
        },
    },
    post: {
        account: {
            user: '/ebsco/getLogin',
            logout: '/ebsco/logout',
        },
    },
};

export const createQuery = (uri: string, param?: any | undefined): string => {
    if (param === undefined) {
        return `${environment.host}${uri}`;
    }
    const query = new URLSearchParams(param);
    return `${environment.host}${uri}?${query.toString()}`;
};
