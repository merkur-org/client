import { useCallback, useEffect, useRef, useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '@/hooks/auth'

import Button from '@/components/Button'
import Input from '@/components/Input'
import withUserLogged from '@/components/WithUserLogged'
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

interface forgotPasswordData {
  email: string
}

const Login: NextPage = () => {
  const { passwordRecover } = useAuth()
  const router = useRouter()

  const [emailSelected, setEmailSelected] = useState(true)
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setErrors(undefined)
  }, [emailSelected])

  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(async (formData: forgotPasswordData) => {
    try {
      setIsLoading(true)

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Informe um email válido')
          .required('E-mail é obrigatório')
      })

      await schema.validate(formData, {
        abortEarly: false
      })

      await passwordRecover(formData)
      router.push('/')
    } catch (err) {
      formRef.current.setErrors(err)
      setErrors(err)

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <BackButton />
      <Container isLoading={isLoading}>
        <SEO title="Recuperar senha - " image="/banner.png" />
        <BackgroundWhiteRectangle>
          <WelcomeContainer>
            <h1>Esqueceu sua senha?</h1>
            <h2>
              Informe o seu e-mail cadastrado abaixo e receba instruções para
              recuperar seu acesso
            </h2>
          </WelcomeContainer>
          <FormContainer>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                email: ''
              }}
            >
              <InputContainer>
                <Input name="email" type="email" label="Email" />
              </InputContainer>
              <LinksContainer>
                <a href="/cadastro">não possui cadastro?</a>
              </LinksContainer>
              <ButtonContainer>
                <Button text="Continuar" icon={FaCheck} type="submit" />
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
