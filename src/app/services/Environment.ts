export const environment = {
    host: import.meta.env.VITE_BIBAPI_HOST,
    get: {
        metadore: '/ebsco/metadore/search',
        cms: '/ebsco/cms',
    },
};

export function createQuery(uri: string, param: any): string {
    const query = new URLSearchParams(param);
    return `${environment.host}${uri}?${query.toString()}`;
}
