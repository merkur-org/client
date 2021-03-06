import {
  Container,
  BackgroundOrange,
  BackgroundWhiteRectangle,
  TabContainer,
  FormContainer,
  LinksContainer,
  TabButton
} from './styles'
import { FaCheck } from 'react-icons/fa'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '@/utils/getValidationErrors'
function Login() {
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
      type: 'number',
      placeholder: 'CPF'
    },
    {
      name: 'telefone',
      type: 'number',
      placeholder: 'Telefone'
    }
  ]

  const [formInputs, setFormInputs] = useState([formTypes[0], formTypes[1]])
  const formRef = useRef<FormHandles>(null)

  const [emailSelected, setEmailSelected] = useState(true)
  const [cpfSelected, setCpfSelected] = useState(false)

  const handleSubmit = useCallback(async formData => {
    formRef.current?.setErrors({})
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail ou usuário obrigatório')
          .email('Insira um email válido')
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

  const handleChangeEmailTab = () => {
    setFormInputs([formTypes[0], formTypes[1]])
    setEmailSelected(true)
    setCpfSelected(false)
  }
  const handleChangeCpfTab = () => {
    setFormInputs([formTypes[2], formTypes[3]])
    setEmailSelected(false)
    setCpfSelected(true)
  }

  return (
    <Container>
      <BackgroundWhiteRectangle>
        <h1>BEM VINDO</h1>
        <h2>Informe seus dados para iniciar a sessão</h2>
        <FormContainer>
          <TabContainer>
            <TabButton
              isSelected={emailSelected}
              onClick={handleChangeEmailTab}
            >
              email e senha
            </TabButton>
            <TabButton isSelected={cpfSelected} onClick={handleChangeCpfTab}>
              cpf e telefone
            </TabButton>
          </TabContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name={formInputs[0].name}
              type={formInputs[0].type}
              placeholder={formInputs[0].placeholder}
            />

            <Input
              name={formInputs[1].name}
              type={formInputs[1].type}
              placeholder={formInputs[1].placeholder}
            />

            <LinksContainer>
              <a href="forgotPassword">esqueceu sua senha?</a>

              <a href="noRegister">não possui cadastro?</a>
            </LinksContainer>
            <Button text="Iniciar sessão" icon={FaCheck} type="submit" />
          </Form>
        </FormContainer>
      </BackgroundWhiteRectangle>
      <BackgroundOrange />
    </Container>
  )
}

export default Login
