import type { Url, Url2 } from './types/types';

export const url2ToUrl = (url2: Url2): Url => {
    return {
        name: url2.value,
        url: url2.url,
    };
};
