import { NextPageContext } from 'next'
import Cookies from 'universal-cookie'

class TokenService {
  public saveToken(token: string): Promise<void> {
    const cookies = new Cookies()
    cookies.set('token', token, { path: '/' })
    return Promise.resolve()
  }

  public async authenticateTokenSsr(ctx: NextPageContext): Promise<boolean> {
    const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null)
    const token = cookies.get('token')

    if (token) {
      return true
    }

    return false
  }
}

export default TokenService
