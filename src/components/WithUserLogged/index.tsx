import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import Cookie from 'js-cookie'

// impedir que o usuário entre em páginas caso ele esteja logado
// EX: página de login e cadastro
const WithUserLogged = (Component: ElementType) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const token = Cookie.get('token')

      if (token) {
        router.replace('/')
      }
    }, [])

    return <Component {...props} />
  }

  return Wrapper
}

export default WithUserLogged
