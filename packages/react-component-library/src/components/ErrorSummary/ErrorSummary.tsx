import React from 'react'
import styled from 'styled-components'

import { ComponentWithClass } from '../../common/ComponentWithClass'

export interface ComponentNameProps extends ComponentWithClass {
  prop?: boolean
}

const StyledErrorSummary = styled.div`
  border-left: 3px solid red;
  color: red;
  margin: 10px;
`

export const ErrorSummary: React.FC<ComponentNameProps> = ({
  children,
  prop,
}) => (
  <StyledErrorSummary>
    <p>There is {React.Children.count(children)} error</p>
    <ul>{children}</ul>
  </StyledErrorSummary>
)

ErrorSummary.displayName = 'ErrorSummary'
