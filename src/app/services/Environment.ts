export const environment = {
    host: import.meta.env.VITE_BIBAPI_HOST,
    get: {
        metadore: '/ebsco/metadore/search',
        cms: '/ebsco/cms',
        database: '/ebsco/databases',
        resources: '/ebsco/resources',
    },
};

export const createQuery = (uri: string, param?: any | undefined): string => {
    if (param === undefined) {
        return `${environment.host}${uri}`;
    }
    const query = new URLSearchParams(param);
    return `${environment.host}${uri}?${query.toString()}`;
};
