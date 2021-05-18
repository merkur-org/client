import theme from '../styles/theme'
import { AuthProvider } from '@/hooks/auth'
import { BagProvider } from './bag'
import { OrdersProvider } from './orders'
import { ThemeProvider } from 'styled-components'

const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BagProvider>
          <OrdersProvider>{children}</OrdersProvider>
        </BagProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default Providers
