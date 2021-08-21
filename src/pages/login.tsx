import { useCallback, useEffect, useRef, useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import validateLogin from '@/utils/validateLogin'
import phoneInputMask from '@/utils/phoneInputMask'
import { useAuth } from '@/hooks/auth'

import Button from '@/components/Button'
import Input from '@/components/Input'
import TabMenu from '@/components/TabMenu'
import withUserLogged from '@/components/WithUserLogged'
import { Error } from '@/components/ErrorLabel/styles'
import BackButton from '@/components/BackButton'

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
import ModalMessage from '@/components/ModalMessages'
import { SEO } from '@/components'
interface formProps {
  cpfTab: boolean
  emailTab: boolean
  email?: string
  senha?: string
  telefone?: string
  cpf?: string
}

const Login: NextPage = () => {
  const { signIn } = useAuth()
  const router = useRouter()

  const [emailSelected, setEmailSelected] = useState(true)
  const [cpfSelected, setCpfSelected] = useState(false)
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setErrors(undefined)
  }, [emailSelected, cpfSelected])

  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(async (formData: formProps) => {
    try {
      const data = await validateLogin(formData, formRef) // validar o formulário
      if (data) {
        setIsLoading(true)

        await signIn(data)
        router.push('/')
      }
    } catch (err) {
      formRef.current.setErrors(err)
      setErrors(err)

      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <BackButton />
      <Container isLoading={isLoading}>
        <SEO title="Entrar - " image="/banner.png" />
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
                  <Input
                    name="password"
                    type="password"
                    label="Senha"
                    subLabel="esqueceu sua senha"
                  />
                  <LinksContainer>
                    <a href="/recuperar-senha">esqueceu sua senha?</a>
                    <a href="/cadastro">não possui cadastro?</a>
                  </LinksContainer>
                </>
              )}

              {cpfSelected && (
                <>
                  <InputContainer>
                    <Input name="cpf" type="text" label="CPF" />
                  </InputContainer>
                  <Input
                    name="phone"
                    type="string"
                    label="Telefone"
                    mask={phoneInputMask}
                  />
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
      {errors && (
        <ModalMessage
          message="Ocorreu um erro tente novamente"
          type="error"
          open={errors}
          timer={2000}
        />
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  showComponents: boolean
}> = async () => {
  return {
    props: { showComponents: true }
  }
}

export default withUserLogged(Login)
