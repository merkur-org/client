import { useCallback, useEffect, useState, useRef } from 'react'
import { useField } from '@unform/core'

import { Container } from './styles'

interface CheckBoxProps {
  name: string
  id: string
  label: string
  linkLabel?: string
  link?: string
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  id,
  label,
  linkLabel,
  link
}) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container htmlFor={id}>
      <label htmlFor={id}>{label}</label>
      <input type="checkbox" id={id} />
      <span></span>
      {(link || linkLabel) && <a href={link}>{linkLabel}</a>}
    </Container>
  )
}

export default CheckBox
