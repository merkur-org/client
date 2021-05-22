import { useCallback, useRef, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Button from '@/components/Button'
import Input from '@/components/Input'
import TabMenu from '@/components/TabMenu'
import CheckBox from '@/components/Checkbox'
import BackButton from '@/components/BackButton'
import { Error } from '@/components/ErrorLabel/styles'
import WithUserLogged from '@/components/WithUserLogged'

import validateRegister from '@/utils/validateRegister'
import phoneInputMask from '@/utils/phoneInputMask'
import { useAuth } from '@/hooks/auth'

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
import { FaCheck } from 'react-icons/fa'
import ModalMessage from '@/components/ModalMessages'

interface formProps {
  pessoal: boolean
  empresarial: boolean
  name: string
  email: string
  password: string
  phone: string
  cpf?: string
  cnpj?: string
  passwordConfirmation: string
  conditionTerms: boolean
}

const Cadastro: React.FC = () => {
  const { signUp } = useAuth()
  const router = useRouter()

  const [cpfSelected, setCpfSelected] = useState(true)
  const [cnpjSelected, setCnpjSelected] = useState(false)
  const [errors, setErrors] = useState()
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    setErrors(undefined)
  }, [cpfSelected, cnpjSelected])

  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(async (formData: formProps) => {
    try {
      const data = await validateRegister(formData, formRef)

      if (data) {
        setisLoading(true)

        await signUp(data)
        router.push('/')
      }
    } catch (err) {
      formRef.current.setErrors(err)
      setErrors(err)
      setisLoading(false)
    }
  }, [])

  return (
    <>
      <BackButton />
      <Container isLoading={isLoading}>
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
                    <Input
                      name="phone"
                      type="text"
                      label="Telefone"
                      mask={phoneInputMask}
                    />
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
                      <p>- Pelo menos 8 caractéres</p>
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
      {errors && (
        <ModalMessage
          message="Ocorreu um erro, tente novamente"
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

export default WithUserLogged(Cadastro)
