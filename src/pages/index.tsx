import { useRef, useCallback } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Container } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

import Input from '@/components/Input'
import Button from '@/components/Button'

import getValidationErrors from '@/utils/getValidationErrors'

const Home: React.FC = () => {
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
      <SEO title="HOME" image="/banner.png" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" label="Email" type="email" />
      </Form>
    </Container>
  )
}

export default Home
