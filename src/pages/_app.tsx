import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { AuthProvider } from '@/hooks/auth'
import { Header, Footer } from '@/components'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {!pageProps.showComponents && <Header />}
        <Component {...pageProps} />
        <GlobalStyle />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
