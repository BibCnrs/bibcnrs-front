/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL_OR_PREFIX: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
