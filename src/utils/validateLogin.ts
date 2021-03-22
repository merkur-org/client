import { MutableRefObject } from 'react'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '@/utils/getValidationErrors'
import formMessages from '@/styles/constants/formMessages'

interface loginProps {
  cpfTab: boolean
  emailTab: boolean
  email?: string
  senha?: string
  telefone?: string
  cpf?: string
}

const validateLogin = async (
  formData: loginProps,
  formRef: MutableRefObject<FormHandles>
): Promise<loginProps> => {
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

    let data
    if (formData.emailTab) {
      data = {
        email: formData.email || '',
        password: formData.senha || ''
      }
    } else {
      data = {
        phone: formData.telefone || '',
        cpf: formData.cpf || ''
      }
    }

    return data
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = getValidationErrors(error)

      formRef.current?.setErrors(errors)
    }
    return null
  }
}

export default validateLogin
