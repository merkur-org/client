import {
  Container,
  BackgroundOrange,
  BackgroundWhiteRectangle,
  WelcomeContainer,
  FormContainer,
  InputContainer,
  BottomContainer,
  ButtonContainer,
  InputsColumn
} from '@/styles/pages/cadastro'
import { FaCheck } from 'react-icons/fa'
import Button from '@/components/Button'
import Input from '@/components/Input'
import TabMenu from '@/components/TabMenu'
import CheckBox from '@/components/Checkbox'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '@/utils/getValidationErrors'
const Login: React.FC = () => {
  const formTypes = [
    {
      name: 'cpf',
      type: 'text',
      placeholder: 'CPF'
    },
    {
      name: 'cnpj',
      type: 'text',
      placeholder: 'CNPJ'
    }
  ]

  const [formInputs, setFormInputs] = useState(formTypes[0])
  const [cpfSelected, setCpfSelected] = useState(true)
  const [cnpjSelected, setCnpjSelected] = useState(false)

  useEffect(() => {
    cpfSelected ? setFormInputs(formTypes[1]) : setFormInputs(formTypes[0])
  }, [cnpjSelected, cpfSelected])

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async formData => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Preencha esse campo'),
        email: Yup.string().email().required('Preencha esse campo'),
        phone: Yup.string().required('Preencha esse campo')
      })
      await schema.validate(formData, {
        abortEarly: false
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)
        console.log(error)
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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TabMenu
              buttons={[
                {
                  name: 'pessoal',
                  label: 'conta pessoal',
                  isSelected: cnpjSelected,
                  setIsSelected: setCnpjSelected
                },
                {
                  name: 'empresarial',
                  label: 'conta empresarial',
                  isSelected: cpfSelected,
                  setIsSelected: setCpfSelected
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
                <InputContainer>
                  <Input
                    name={formInputs.name}
                    type={formInputs.type}
                    label={formInputs.placeholder}
                  />
                </InputContainer>
                <ButtonContainer>
                  <Button text="Cadastrar" icon={FaCheck} type="submit" />
                </ButtonContainer>
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
                <CheckBox
                  id="conditionTerms"
                  name="conditionTerms"
                  label="Aceito os"
                  link="/"
                  linkLabel="termos de condições"
                />
              </div>
            </InputsColumn>
          </Form>
        </FormContainer>
      </BackgroundWhiteRectangle>
      <BackgroundOrange />
    </Container>
  )
}

export default Login
