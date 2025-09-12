interface ImportMetaEnv {
  readonly VITE_FUNCTION_ENV: string
  // add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}