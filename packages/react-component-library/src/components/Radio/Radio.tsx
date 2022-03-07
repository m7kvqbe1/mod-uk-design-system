import React from 'react'

import { CheckboxRadioBase, CheckboxRadioBaseProps } from '../CheckboxRadioBase'
import { StyledRadio } from './partials/StyledRadio'
import { StyledCheckmark } from './partials/StyledCheckmark'

export type RadioProps = Omit<CheckboxRadioBaseProps, 'type' | 'partials'>

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    return (
      <CheckboxRadioBase
        type="radio"
        ref={ref}
        partials={{
          root: <StyledRadio />,
          checkmark: <StyledCheckmark />,
        }}
        {...props}
      />
    )
  }
)

Radio.displayName = 'Radio'
