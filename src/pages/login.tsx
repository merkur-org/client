import { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FaCheck } from 'react-icons/fa'

import Button from '@/components/Button'
import Input from '@/components/Input'
import TabMenu from '@/components/TabMenu'

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

import getValidationErrors from '@/utils/getValidationErrors'

import { formMessages } from '@/styles/constants'

import { GetStaticProps } from 'next'

const Login: React.FC = () => {
  const formTypes = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email'
    },
    {
      name: 'senha',
      type: 'password',
      placeholder: 'Senha'
    },
    {
      name: 'cpf',
      type: 'text',
      placeholder: 'CPF'
    },
    {
      name: 'telefone',
      type: 'text',
      placeholder: 'Telefone'
    }
  ]

  const [formInputs, setFormInputs] = useState([formTypes[0], formTypes[1]])
  const [emailSelected, setEmailSelected] = useState(true)
  const [cpfSelected, setCpfSelected] = useState(false)

  useEffect(() => {
    emailSelected
      ? setFormInputs([formTypes[0], formTypes[1]])
      : setFormInputs([formTypes[2], formTypes[3]])
  }, [emailSelected, cpfSelected])

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async formData => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        emailTab: Yup.boolean(),
        cpfTab: Yup.boolean(),
        email: Yup.string()
          .email(formMessages.validEmail)
          .when('emailTab', {
            is: true,
            then: Yup.string().required(formMessages.required)
          }),
        senha: Yup.string().when('emailTab', {
          is: true,
          then: Yup.string().required(formMessages.required)
        }),
        cpf: Yup.string().when('cpfTab', {
          is: true,
          then: Yup.string().required(formMessages.required)
        }),
        telefone: Yup.string().when('cpfTab', {
          is: true,
          then: Yup.string().required(formMessages.required)
        })
      })
      await schema.validate(formData, {
        abortEarly: false
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)
      }
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
          <Form ref={formRef} onSubmit={handleSubmit}>
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
                  <Input
                    name={formInputs[0].name}
                    type={formInputs[0].type}
                    label={formInputs[0].placeholder}
                  />
                </InputContainer>
                <Input
                  name={formInputs[1].name}
                  type={formInputs[1].type}
                  label={formInputs[1].placeholder}
                />
                <LinksContainer>
                  <a href="forgotPassword">esqueceu sua senha?</a>
                  <a href="noRegister">não possui cadastro?</a>
                </LinksContainer>
              </>
            )}

            {cpfSelected && (
              <>
                <InputContainer>
                  <Input
                    name={formInputs[0].name}
                    type={formInputs[0].type}
                    label={formInputs[0].placeholder}
                  />
                </InputContainer>
                <Input
                  name={formInputs[1].name}
                  type={formInputs[1].type}
                  label={formInputs[1].placeholder}
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
