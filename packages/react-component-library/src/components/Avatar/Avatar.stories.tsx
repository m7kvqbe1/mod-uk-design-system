import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'
import { ThemeProvider } from 'styled-components'

import { Avatar, AVATAR_VARIANT } from '.'

const stories = storiesOf('Avatar', module)
const examples = storiesOf('Avatar/Examples', module)

stories.addDecorator(withKnobs)

const INITIALS = 'AT'

stories.add('Default', () => (
  <ThemeProvider theme={{ mode: 'default' }}>
    <div style={{ background: '#A0A0A0', padding: 20 }}>
      <Avatar
        initials={text('Initials', INITIALS)}
        variant={AVATAR_VARIANT.LIGHT}
      />
    </div>
  </ThemeProvider>
))

examples.add('Dark', () => (
  <div style={{ background: '#A0A0A0', padding: 20 }}>
    <Avatar initials={INITIALS} variant={AVATAR_VARIANT.DARK} />
  </div>
))
