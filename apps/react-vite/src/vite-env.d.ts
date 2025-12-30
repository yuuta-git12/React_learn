/// <reference types="vite/client" />

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react'
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
  const src: string
  export { ReactComponent }
  export default src
}

declare module '*.svg?url' {
  const src: string
  export default src
}

