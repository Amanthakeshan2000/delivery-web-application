/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly TOKEN_KEY: string;
  readonly ORGANIZATION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
