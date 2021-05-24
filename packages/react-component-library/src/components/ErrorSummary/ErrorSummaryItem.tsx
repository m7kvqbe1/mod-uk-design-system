import React from 'react'

import { ComponentWithClass } from '../../common/ComponentWithClass'

export interface ComponentNameProps extends ComponentWithClass {
  prop?: boolean
}

export const ErrorSummaryItem: React.FC<ComponentNameProps> = ({
  children,
  prop,
}) => <li>{children}</li>

ErrorSummaryItem.displayName = 'ErrorSummaryItem'
