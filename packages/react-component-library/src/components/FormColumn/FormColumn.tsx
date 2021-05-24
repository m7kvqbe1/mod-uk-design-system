import React from 'react'
import styled from 'styled-components'

import { ComponentWithClass } from '../../common/ComponentWithClass'

export interface ComponentNameProps extends ComponentWithClass {
  prop?: boolean
}

const StyledFormColumn = styled.div`
  flex-grow: 1;
  padding: 0 10px;
`

export const FormColumn: React.FC<ComponentNameProps> = ({
  children,
  prop,
}) => <StyledFormColumn>{children}</StyledFormColumn>

FormColumn.displayName = 'FormColumn'
