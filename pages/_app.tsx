import { Analytics } from '@vercel/analytics/react'
import { ContextProvider } from 'components/Context'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
      <Analytics />
    </ContextProvider>
  )
}
