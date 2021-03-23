import { useContext, createContext, useCallback, useState } from 'react'
import api from '@/services/api'

interface SignInCredentials {
  email?: string
  senha?: string
  cpf?: string
  telefone?: string
}

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

interface AuthData {
  token: string
  user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('@Projeto:token')
      const user = window.localStorage.getItem('@Projeto:user')

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`

        return { token, user: JSON.parse(user) }
      }
    }
    return {} as AuthData
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password })

    const { token, user } = response.data

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('@Projeto:token', token)
      window.localStorage.setItem('@Projeto:user', JSON.stringify(user))
    }

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('@Projeto:token')
      window.localStorage.removeItem('@Projeto:user')
    }

    setData({} as AuthData)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthPovider')
  }
  return context
}
