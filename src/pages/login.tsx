import { useCallback, useEffect, useRef, useState } from 'react'
import { NextPageContext, NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import TokenService from '@/services/Token.service'
import { useUser } from '@/services/Auth.context'

import validateLogin from '@/utils/validateLogin'
import signIn from '@/utils/signIn'

import Button from '@/components/Button'
import Input from '@/components/Input'
import TabMenu from '@/components/TabMenu'

import { FaCheck } from 'react-icons/fa'
import {
  Container,
  BackgroundOrange,
  BackgroundWhiteRectangle,
  WelcomeContainer,
  FormContainer,
  InputContainer,
  ButtonContainer,
  LinksContainer
} from '@/styles/pages/login'
interface pageProps {
  userLogged: boolean
}

interface formProps {
  cpfTab: boolean
  emailTab: boolean
  email?: string
  senha?: string
  telefone?: string
  cpf?: string
}

const Login: NextPage<pageProps> = userLogged => {
  const [user, setUser] = useUser()
  const router = useRouter()

  // enviar o usuário para a home caso ele tente acessar a página de login e já esteja logado
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [])

  const [emailSelected, setEmailSelected] = useState(true)
  const [cpfSelected, setCpfSelected] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (formData: formProps) => {
    try {
      const data = await validateLogin(formData, formRef) // validar o formulário

      if (data) {
        const res = await signIn(data) // logar

        if (res) {
          setUser({
            type: 'setAuthDetails',
            payload: { email: res.data.user.email, name: res.data.user.name }
          })

          router.push('/') // redirecionar o usuário para home
        }
      }
    } catch (err) {
      formRef.current.setErrors(err)
    }
  }, [])

  return (
    <Container>
      <BackgroundWhiteRectangle>
        <WelcomeContainer>
          <h1>BEM VINDO</h1>
          <h2>Informe seus dados para iniciar a sessão</h2>
        </WelcomeContainer>
        <FormContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              emailTab: true,
              cpfTab: false,
              email: '',
              senha: '',
              cpf: '',
              telefone: ''
            }}
          >
            <TabMenu
              buttons={[
                {
                  name: 'emailTab',
                  label: 'email e senha',
                  isSelected: emailSelected,
                  setIsSelected: setEmailSelected
                },
                {
                  name: 'cpfTab',
                  label: 'cpf e telefone',
                  isSelected: cpfSelected,
                  setIsSelected: setCpfSelected
                }
              ]}
            />
            {emailSelected && (
              <>
                <InputContainer>
                  <Input name="email" type="email" label="Email" />
                </InputContainer>
                <Input name="senha" type="password" label="Senha" />
                <LinksContainer>
                  <a href="forgotPassword">esqueceu sua senha?</a>
                  <a href="noRegister">não possui cadastro?</a>
                </LinksContainer>
              </>
            )}

            {cpfSelected && (
              <>
                <InputContainer>
                  <Input name="cpf" type="text" label="CPF" />
                </InputContainer>
                <Input name="telefone" type="string" label="Telefone" />
              </>
            )}
            <ButtonContainer>
              <Button text="Iniciar sessão" icon={FaCheck} type="submit" />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BackgroundWhiteRectangle>
      <BackgroundOrange />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  showComponents: boolean
}> = async () => {
  return {
    props: { showComponents: true }
  }
}

export default Login
