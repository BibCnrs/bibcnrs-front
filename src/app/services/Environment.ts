export const environment = {
    host: import.meta.env.VITE_API_URL_OR_PREFIX,
    get: {
        metadore: '/ebsco/metadore/search',
    },
};

export function createQuery(uri: string, param: any): string {
    const query = new URLSearchParams(param);
    return `${environment.host}${uri}?${query.toString()}`;
}
