import React, { useContext } from 'react'
import styled from 'styled-components'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import FormContext, { ErrorsType } from '../Form/FormContext'
import { ErrorSummaryItem } from './ErrorSummaryItem'

export interface ComponentNameProps extends ComponentWithClass {
  prop?: boolean
}

const StyledErrorSummary = styled.div`
  border-left: 3px solid red;
  color: red;
  margin: 10px;
`

function getErrorSummaryItems(errors: ErrorsType) {
  const errorSummaryItems = Object.keys(errors || {}).map((key) => {
    return <ErrorSummaryItem>{key} has an error</ErrorSummaryItem>
  })

  return errorSummaryItems.length ? errorSummaryItems : []
}

export const ErrorSummary: React.FC<ComponentNameProps> = ({
  children,
  prop,
}) => {
  const { errors } = useContext(FormContext)

  const errorSummary = [...[children], ...getErrorSummaryItems(errors)]

  return (
    <StyledErrorSummary>
      <p>There is {React.Children.count(errorSummary)} error</p>
      <ul>{errorSummary}</ul>
    </StyledErrorSummary>
  )
}

ErrorSummary.displayName = 'ErrorSummary'
