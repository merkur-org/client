import { AppProps } from 'next/app'

import GlobalStyle from '../styles/global'
import { Header, Footer } from '@/components'
import Providers from '@/hooks'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      {!pageProps.showComponents && <Header />}
      <Component {...pageProps} />
      <GlobalStyle />
      <Footer />
    </Providers>
  )
}

export default MyApp
