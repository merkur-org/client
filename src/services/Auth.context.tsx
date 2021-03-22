import { useReducer, useContext, createContext } from 'react'

// criar o contexto de autenticação
export const AuthStateContext = createContext({})

// valores iniciais do estado
const initialState = { email: '', name: '' }

const reducer = (state, action) => {
  switch (action.type) {
    case 'setAuthDetails':
      return {
        email: action.payload.email,
        name: action.payload.name
      }
    case 'removeAuthDetails':
      return {
        email: initialState.email,
        name: initialState.name
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// Componente que deve envolver toda a aplicação no _app.tsx
export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useUser: any = () => useContext(AuthStateContext)
