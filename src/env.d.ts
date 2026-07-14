type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare namespace App {
  type Locals = Runtime
}

declare namespace Cloudflare {
  interface Env {
    SESSION: KVNamespace
    IMAGES: import('@astrojs/cloudflare').ImageBinding
  }
}

declare module '@docsearch/css'
