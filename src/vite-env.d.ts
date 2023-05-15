/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
    readonly VITE_BIBAPI_HOST: string;
    readonly VITE_ENV: string | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
