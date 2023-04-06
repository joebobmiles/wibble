import { FC } from 'react'
import type { AppProps } from 'next/app'

import '../styles/reset.css'
import '../styles/global.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
