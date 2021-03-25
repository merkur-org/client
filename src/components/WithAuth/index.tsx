import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import Cookie from 'js-cookie'

// impedir que o usuário entre em rotas caso ele NÃO esteja logado
// EX: Página de finalização de compra
const WithAuth = (Component: ElementType) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const token = Cookie.get('token')

      if (!token) {
        router.replace('/')
      }
    }, [])

    return <Component {...props} />
  }

  return Wrapper
}

export default WithAuth
