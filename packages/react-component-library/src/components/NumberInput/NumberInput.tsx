import React from 'react'
import uuid from 'uuid'
import classNames from 'classnames'

import { Input } from './Input'
import { StartAdornment } from './StartAdornment'
import { useFocus } from './useFocus'

export interface NumberInputProps {
  autoFocus?: boolean
  className?: string
  isDisabled?: boolean
  footnote?: string
  id?: string
  label?: string
  max?: number
  min?: number
  name: string
  onBlur?: (event: React.FormEvent<Element>) => void
  onChange: (event: any) => void
  placeholder?: string
  step?: number
  value?: number
  startAdornment?: React.ReactNode | string
}

interface CalculateNewValue {
  currentValue?: number
  newInputValue: string
  max?: number
  min?: number
}

export function calculateNewValue({
  currentValue,
  newInputValue = '',
  max,
  min,
}: CalculateNewValue): number {
  const newValue = newInputValue.length > 0 ? parseInt(newInputValue, 10) : null

  if (
    Number.isNaN(newValue) ||
    (min && newValue < min) ||
    (max && newValue > max)
  ) {
    return currentValue
  }

  return newValue
}

export const NumberInput: React.FC<NumberInputProps> = ({
  className,
  isDisabled = false,
  footnote,
  id = uuid(),
  label,
  max,
  min,
  name,
  onBlur,
  onChange,
  placeholder = '',
  step = 1,
  value,
  startAdornment,
  ...rest
}) => {
  const { hasFocus, onInputBlur, onInputFocus } = useFocus(onBlur)

  const mutateValue = (newValue: number) => {
    onChange({
      target: {
        name,
        value: newValue,
      },
    })
  }

  const clickIncrease = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget
    target.blur()

    const newValue = value ? value + step : step
    if (!max || newValue <= max) {
      mutateValue(newValue)
    }
  }

  const clickDecrease = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget
    target.blur()

    const newValue = value ? value - step : -step
    if (!min || newValue >= min) mutateValue(newValue)
  }

  const EndAdornment = (
    <div className="rn-numberinput__controls">
      <button
        data-testid="number-input-increase"
        type="button"
        className="rn-numberinput__increase"
        onClick={clickIncrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7">
          <path
            fill="#6F798A"
            fillRule="evenodd"
            d="M5.66 4.49L9.19.95a1 1 0 1 1 1.42 1.41L6.36 6.61a1 1 0 0 1-1.41 0L.71 2.36A1 1 0 1 1 2.12.95l3.54 3.54z"
          />
        </svg>
      </button>
      <button
        data-testid="number-input-decrease"
        type="button"
        className="rn-numberinput__decrease"
        onClick={clickDecrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7">
          <path
            fill="#6F798A"
            fillRule="evenodd"
            d="M5.66 4.49L9.19.95a1 1 0 1 1 1.42 1.41L6.36 6.61a1 1 0 0 1-1.41 0L.71 2.36A1 1 0 1 1 2.12.95l3.54 3.54z"
          />
        </svg>
      </button>
    </div>
  )

  const hasContent = value !== null && value !== undefined

  const classes = classNames('rn-numberinput', className, {
    'has-focus': hasFocus,
    'has-content': hasContent,
  })

  return (
    <div className={classes} data-testid="number-input-container">
      <div className="rn-numberinput__outer-wrapper">
        <StartAdornment>{startAdornment}</StartAdornment>

        <Input
          isDisabled={isDisabled}
          id={id}
          label={label}
          max={max}
          min={min}
          name={name}
          onChange={onChange}
          onInputBlur={onInputBlur}
          onInputFocus={onInputFocus}
          placeholder={placeholder}
          value={value}
          {...rest}
        />

        {EndAdornment}
      </div>
      {footnote && (
        <small
          className="rn-numberinput__footnote"
          data-testid="number-input-footnote"
        >
          {footnote}
        </small>
      )}
    </div>
  )
}

NumberInput.displayName = 'NumberInput'
