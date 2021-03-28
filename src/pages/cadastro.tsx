import { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/router'

import Button from '@/components/Button'
import Input from '@/components/Input'
import TabMenu from '@/components/TabMenu'
import CheckBox from '@/components/Checkbox'

import {
  Container,
  BackgroundOrange,
  BackgroundWhiteRectangle,
  WelcomeContainer,
  FormContainer,
  InputContainer,
  ButtonContainer,
  InputsColumn,
  BottomContainer
} from '@/styles/pages/cadastro'

import getValidationErrors from '@/utils/getValidationErrors'
import { useAuth } from '@/hooks/auth'

import formMessages from '@/styles/constants/formMessages'

import { GetStaticProps } from 'next'
import validateRegister from '@/utils/validateRegister'
import { sign } from 'crypto'
import WithUserLogged from '@/components/WithUserLogged'

const Cadastro: React.FC = () => {
  const [cpfSelected, setCpfSelected] = useState(true)
  const [cnpjSelected, setCnpjSelected] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async formData => {
    formRef.current?.setErrors({})
    try {
      const data = await validateRegister(formData, formRef)
      if (data) {
        await signUp(data)
        router.push('/')
      }
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
          <h2>Preencha todos os campos com os seus dados</h2>
        </WelcomeContainer>
        <FormContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ conditionTerms: false }}
          >
            <TabMenu
              buttons={[
                {
                  name: 'pessoal',
                  label: 'conta pessoal',
                  isSelected: cpfSelected,
                  setIsSelected: setCpfSelected
                },
                {
                  name: 'empresarial',
                  label: 'conta empresarial',
                  isSelected: cnpjSelected,
                  setIsSelected: setCnpjSelected
                }
              ]}
            />
            <InputsColumn>
              <div className="column1">
                <InputContainer>
                  <Input name="name" type="text" label="Nome Completo" />
                </InputContainer>
                <InputContainer>
                  <Input name="email" type="email" label="Email" />
                </InputContainer>
                <InputContainer>
                  <Input name="phone" type="text" label="Telefone" />
                </InputContainer>
                {cpfSelected && (
                  <InputContainer>
                    <Input name="cpf" type="text" label="Cpf" />
                  </InputContainer>
                )}
                {cnpjSelected && (
                  <InputContainer>
                    <Input name="cnpj" type="text" label="Cnpj" />
                  </InputContainer>
                )}
              </div>
              <div className="column2">
                <InputContainer>
                  <Input name="password" type="password" label="Senha" />
                  <aside>
                    <p>A senha deve conter</p>
                    <p>- Condição 1</p>
                    <p>- Condição 2</p>
                    <p>- Condição 3</p>
                    <p>- Condição 4</p>
                  </aside>
                </InputContainer>
                <InputContainer>
                  <Input
                    name="passwordConfirmation"
                    type="password"
                    label="Confirme sua senha"
                  />
                </InputContainer>
              </div>
            </InputsColumn>

            <BottomContainer>
              <ButtonContainer>
                <Button text="Cadastrar" icon={FaCheck} type="submit" />
              </ButtonContainer>
              <CheckBox
                id="conditionTerms"
                name="conditionTerms"
                label="Aceito os"
                link="/"
                linkLabel="termos de condições"
              />
            </BottomContainer>
          </Form>
        </FormContainer>
      </BackgroundWhiteRectangle>
      <BackgroundOrange />
    </Container>
  )
}

export default WithUserLogged(Cadastro)

export const getStaticProps: GetStaticProps<{
  showComponents: boolean
}> = async () => {
  return {
    props: { showComponents: true }
  }
}
