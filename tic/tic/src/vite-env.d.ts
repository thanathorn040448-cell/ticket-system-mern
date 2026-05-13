/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png' {
  const value: string;
  export default value;
  
}

declare module '*.css';