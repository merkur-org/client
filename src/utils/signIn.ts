import Router from 'next/router'

import TokenService from '@/services/Token.service'
import { useUser } from '@/services/Auth.context'
import api from '@/services/api'

interface loginProps {
  cpfTab: boolean
  emailTab: boolean
  email?: string
  senha?: string
  telefone?: string
  cpf?: string
}

const signIn = async (data: loginProps): Promise<any> => {
  const res = await api.post('/sessions', data)

  if (res && res.data && res.data.token) {
    // armazenar o token JWT gerado
    const tokenService = new TokenService()
    tokenService.saveToken(res.data.token)
  }

  return res
}

export default signIn
