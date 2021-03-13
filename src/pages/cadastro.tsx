import { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FaCheck } from 'react-icons/fa'

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
  BottomContainer,
  ButtonContainer,
  InputsColumn
} from '@/styles/pages/cadastro'

import getValidationErrors from '@/utils/getValidationErrors'
import { formMessages } from '@/styles/constants'

const Cadastro: React.FC = () => {
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
    cpfSelected ? setFormInputs(formTypes[0]) : setFormInputs(formTypes[1])
  }, [cnpjSelected, cpfSelected])

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async formData => {
    formRef.current?.setErrors({})
    try {
      const schema = Yup.object().shape({
        pessoal: Yup.boolean(),
        empresarial: Yup.boolean(),
        name: Yup.string().required(formMessages.required),
        email: Yup.string().email().required(formMessages.required),
        phone: Yup.string().required(formMessages.required),
        cpf: Yup.string().when('pessoal', {
          is: true,
          then: Yup.string().required(formMessages.required)
        }),
        cnpj: Yup.string().when('empresarial', {
          is: false,
          then: Yup.string().required(formMessages.required)
        }),
        password: Yup.string().required(formMessages.required),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], formMessages.samePassword)
          .required(formMessages.required),
        conditionTerms: Yup.boolean().oneOf([true], formMessages.terms)
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
                <InputContainer>
                  <Input
                    name={formInputs.name}
                    type={formInputs.type}
                    label={formInputs.placeholder}
                  />
                </InputContainer>
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

export default Cadastro
