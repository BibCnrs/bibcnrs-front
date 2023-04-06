/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BIBAPI_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
