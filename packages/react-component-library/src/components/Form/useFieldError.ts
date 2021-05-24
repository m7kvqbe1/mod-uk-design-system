import { useContext } from 'react'
import FormContext from './FormContext'
import { omit } from 'lodash'

export function useFieldError(): {
  addFieldError: (name: string, message: string) => void
  removeFieldError: (name: string) => void
} {
  const { errors, setErrors } = useContext(FormContext)

  function addFieldError(name: string, message: string) {
    setErrors({
      ...errors,
      [name]: message,
    })
  }

  function removeFieldError(name: string) {
    setErrors(omit(errors, [name]))
  }

  return {
    addFieldError,
    removeFieldError,
  }
}
