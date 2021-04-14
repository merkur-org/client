import { useEffect, useRef, useCallback, useState } from 'react'
import { useField } from '@unform/core'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'

import FieldText from '../FieldText'

import { BodySelect, selectStyles } from './styles'

interface Props extends SelectProps<OptionTypeBase> {
  name: string
  label: string
  onChange?(option: any): void
}
/**
 * This component receives text in your field
 *
 * @component
 * @param {string} name is the name on the form data
 * @param {string} label is the title that is displayed above the component
 * @param {string} subLabel is a link for redirecting to the pathSubLabel
 * @param {string} pathSubLabel is the url of link subLabel
 * @example
 * return (
 *   <Input name="senha" type="password" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="/alterar-senha" />
 * )
 */
const Select: React.FC<Props> = ({
  name,
  label,
  onChange,
  children,
  ...rest
}) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      }
    })
  }, [fieldName, registerField])

  const [selectIsEmpty, setSelectIsEmpty] = useState(!rest.defaultValue)

  const handleChange = useCallback(
    (option: any) => {
      if (onChange) {
        onChange(option)
      } else {
        if (option.value !== '') {
          setSelectIsEmpty(false)
        } else {
          setSelectIsEmpty(true)
        }
      }
    },
    [onChange]
  )

  return (
    <BodySelect>
      <FieldText
        name={name}
        label={label}
        error={error && error}
        isEmpty={selectIsEmpty}
      >
        <ReactSelect
          inputId={fieldName}
          ref={selectRef}
          closeMenuOnSelect={true}
          className="react-select-container"
          onChange={handleChange}
          options={rest.options}
          defaultValue={rest.defaultValue}
          placeholder=""
          styles={selectStyles}
        />
      </FieldText>
    </BodySelect>
  )
}

export default Select
