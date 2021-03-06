import {
  Container,
  BackgroundOrange,
  BackgroundWhiteRectangle,
  OrangeLine,
  SeparationLine,
  InputContainer1,
  InputContainer2
} from './styles'
import { FaCheck } from 'react-icons/fa'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '@/utils/getValidationErrors'
function Login() {
  const formRef = useRef<FormHandles>(null)

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
  return (
    <Container>
      <BackgroundOrange />
      <BackgroundWhiteRectangle>
        <OrangeLine />
        <SeparationLine />
        <h1>BEM VINDO</h1>
        <h2>Informe seus dados para iniciar a sessão</h2>
        <h3>email e senha</h3>
        <h4>cpf e telefone</h4>
        <h5>
          <a href="forgotPassword">esqueceu sua senha?</a>
        </h5>
        <h6>
          <a href="noRegister">não possui cadastro?</a>
        </h6>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputContainer1>
            <Input name="Email" placeholder="Email" />
          </InputContainer1>
          <InputContainer2>
            <Input name="Senha" type="password" placeholder="Senha" />
          </InputContainer2>

          <Button text="Iniciar sessão" icon={FaCheck} type="submit" />
        </Form>
      </BackgroundWhiteRectangle>
    </Container>
  )
}

export default Login
