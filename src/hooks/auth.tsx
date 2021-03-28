import { useContext, createContext, useCallback, useState } from 'react'
import Cookie from 'js-cookie'
import api from '@/services/api'

interface SignInCredentials {
  email?: string
  password?: string
  cpf?: string
  phone?: string
}

interface SignUpCredentials {
  email?: string
  password?: string
  cpf?: string
  phone?: string
  cnpj?: string
  name?: string
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
    const token = Cookie.get('token')
    const user = Cookie.get('user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthData
  })

  const signIn = useCallback(
    async ({ email, password, cpf, phone }: SignInCredentials) => {
      let response

      if (email && password) {
        response = await api.post('/sessions', {
          email: email,
          password: password
        })
      } else {
        response = await api.post('/sessions', { cpf: cpf, phone: phone })
      }

      const { token, user } = response.data

      Cookie.set('token', token)
      Cookie.set('user', JSON.stringify(user))

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({ token, user })
    },
    []
  )

  const signOut = useCallback(() => {
    Cookie.remove('token')
    Cookie.remove('user')

    setData({} as AuthData)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
  const signUp = useCallback(
    async ({ email, password, cpf, phone }: SignInCredentials) => {
      let response

      if (email && password) {
        response = await api.post('/sessions', {
          email: email,
          password: password
        })
      } else {
        response = await api.post('/sessions', { cpf: cpf, phone: phone })
      }

      const { token, user } = response.data

      Cookie.set('token', token)
      Cookie.set('user', JSON.stringify(user))

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({ token, user })
    },
    []
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthPovider')
  }
  return context
}
