import React from 'react'

export type ErrorsType = {
  [key: string]: string | null
}

interface FormContextProps {
  errors: ErrorsType
  setErrors?: (errors: ErrorsType) => void
}

const FormContext: React.Context<FormContextProps> = React.createContext(
  {} as FormContextProps
)

export default FormContext
