import classNames from 'classnames'
import React from 'react'
import styled from 'styled-components'
import theme from 'styled-theming'
import * as tokens from '@royal-navy/css-framework'

import { AVATAR_VARIANT } from '.'

const AvatarStyles = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: ${tokens.COLOR_SUCCESS_200};
`

export interface AvatarProps {
  className?: string
  initials: string
  variant?: typeof AVATAR_VARIANT.DARK | typeof AVATAR_VARIANT.LIGHT
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  initials,
  variant,
}) => {
  const classes = classNames('rn-avatar', className, `rn-avatar--${variant}`)

  return <AvatarStyles className={classes}>{initials}</AvatarStyles>
}

Avatar.displayName = 'Avatar'
