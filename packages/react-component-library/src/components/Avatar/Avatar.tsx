import classNames from 'classnames'
import React from 'react'
import styled from 'styled-components'
import theme from 'styled-theming'
import { AVATAR_VARIANT } from '.'

// import {
//   COLOR_NEUTRAL_WHITE,
//   COLOR_NEUTRAL_600,
//   TYPOGRAPHY_S,
// } from '@royalnavy/css-framework'

export const backgroundColor = theme.variants('mode', 'variant', {
  light: {
    default: 'red',
    dark: 'darkgray',
  },
  dark: {
    default: 'red',
    dark: 'darkgray',
  },
})

// const AvatarStyles = styled.span`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 30px;
//   width: 30px;
//   border-radius: 15px;
//   background-color: ${COLOR_NEUTRAL_WHITE};
//   color: ${COLOR_NEUTRAL_600};
//   font-size: ${TYPOGRAPHY_S};
//   font-weight: bold;
// `

const AvatarStyles = styled.span`
  border: 1px solid red;
  background-color: ${backgroundColor};
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
