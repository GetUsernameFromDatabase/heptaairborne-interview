/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** client perspective -- World Wide Web */
  readonly VITE_API_HOST: string;
  /** client perspective -- World Wide Web */
  readonly VITE_API_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
