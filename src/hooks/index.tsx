import theme from '../styles/theme'
import { AuthProvider } from '@/hooks/auth'
import { BagProvider } from './bag'
import { ProductsProvider } from './products'
import { ThemeProvider } from 'styled-components'

const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ProductsProvider>
          <BagProvider>{children}</BagProvider>
        </ProductsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default Providers
