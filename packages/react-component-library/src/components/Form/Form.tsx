import React, { useState } from 'react'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import FormContext, { ErrorsType } from './FormContext'

export interface ComponentNameProps extends ComponentWithClass {
  onSubmit: () => void
}

export const Form: React.FC<ComponentNameProps> = ({ children, onSubmit }) => {
  const [errors, setErrors] = useState<ErrorsType>({})
  const value = { errors, setErrors }

  return (
    <FormContext.Provider value={value}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'
