import theme from '../styles/theme'
import { AuthProvider } from '@/hooks/auth'
import { BagProvider } from './bag'
import { ThemeProvider } from 'styled-components'

const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BagProvider>{children}</BagProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default Providers
