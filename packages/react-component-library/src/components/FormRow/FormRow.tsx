import React from 'react'
import styled from 'styled-components'

import { ComponentWithClass } from '../../common/ComponentWithClass'

export interface ComponentNameProps extends ComponentWithClass {
  prop?: boolean
}

const StyledFormRow = styled.div`
  display: flex;
  padding: 10px 0;
`

export const FormRow: React.FC<ComponentNameProps> = ({ children, prop }) => (
  <StyledFormRow>{children}</StyledFormRow>
)

FormRow.displayName = 'FormRow'
