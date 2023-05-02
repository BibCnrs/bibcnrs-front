/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
    readonly VITE_BIBAPI_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
