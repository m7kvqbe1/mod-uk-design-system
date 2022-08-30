import React, { useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import styled from 'styled-components'

import { IconEdit, IconDelete, IconAdd } from '@defencedigital/icon-library'

import { ContextMenu, ContextMenuItem, ContextMenuDivider } from '.'
import { Link } from '../Link'

export default {
  component: ContextMenu,
  subcomponents: { ContextMenuItem, ContextMenuDivider },
  title: 'Context Menu',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as ComponentMeta<typeof ContextMenu>

const ClickArea = styled.div`
  display: inline-block;
  padding: 1rem;
  background-color: #c9c9c9;
`

export const Default: ComponentStory<typeof ContextMenu> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <ClickArea ref={ref} data-testid="storybook-context-menu-target">
        {props.clickType === 'left' ? 'Click on me' : 'Right click on me'}
      </ClickArea>
      <ContextMenu {...props} attachedToRef={ref}>
        <ContextMenuItem link={<Link href="/edit">Edit</Link>} />
        <ContextMenuItem link={<Link href="/delete">Delete</Link>} />
        <ContextMenuItem link={<Link href="/delete">Action</Link>} />
        <ContextMenuDivider />
        <ContextMenuItem link={<Link href="/add">Add</Link>} />
        <ContextMenuDivider />
        <ContextMenuItem
          link={<Link href="/something-else">Do something else</Link>}
        />
        <ContextMenuDivider />
        <ContextMenuItem
          link={
            <Link href="/something-else">
              This is too much text to put into a context menu item
            </Link>
          }
        />
      </ContextMenu>
    </>
  )
}

Default.storyName = 'Default'

export const WithIcons: ComponentStory<typeof ContextMenu> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <ClickArea ref={ref} data-testid="storybook-context-menu-target">
        {props.clickType === 'left' ? 'Click on me' : 'Right click on me'}
      </ClickArea>
      <ContextMenu {...props} attachedToRef={ref}>
        <ContextMenuItem
          icon={<IconEdit />}
          link={<Link href="/edit">Edit</Link>}
        />
        <ContextMenuItem
          icon={<IconDelete />}
          link={<Link href="/delete">Delete</Link>}
        />
        <ContextMenuItem link={<Link href="/delete">Action</Link>} />
        <ContextMenuDivider />
        <ContextMenuItem
          icon={<IconAdd />}
          link={<Link href="/add">Add</Link>}
        />
        <ContextMenuDivider />
        <ContextMenuItem
          link={<Link href="/something-else">Do something else</Link>}
        />
        <ContextMenuDivider />
        <ContextMenuItem
          link={
            <Link href="/something-else">
              This is too much text to put into a context menu item
            </Link>
          }
        />
      </ContextMenu>
    </>
  )
}

WithIcons.storyName = 'With icons'

export const Open: ComponentStory<typeof ContextMenu> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <ClickArea ref={ref} data-testid="storybook-context-menu-target">
        Click on me
      </ClickArea>
      <ContextMenu {...props} attachedToRef={ref} clickType="left">
        <ContextMenuItem
          icon={<IconEdit />}
          link={<Link href="/edit">Edit</Link>}
        />
        <ContextMenuItem
          icon={<IconDelete />}
          link={<Link href="/delete">Delete</Link>}
        />
        <ContextMenuItem link={<Link href="/delete">Action</Link>} />
        <ContextMenuDivider />
        <ContextMenuItem
          icon={<IconAdd />}
          link={<Link href="/add">Add</Link>}
        />
        <ContextMenuDivider />
        <ContextMenuItem
          link={<Link href="/something-else">Do something else</Link>}
        />
        <ContextMenuDivider />
        <ContextMenuItem
          link={
            <Link href="/something-else">
              This is too much text to put into a context menu item
            </Link>
          }
        />
      </ContextMenu>
    </>
  )
}

Open.storyName = 'Open'
Open.play = async ({ canvasElement }) => {
  // Starts querying the component from its root
  const canvas = within(canvasElement)

  // Looks up the input and fills it.
  const clickArea = canvas.getByText('Click on me')
  await userEvent.click(clickArea)
  await canvas.findByRole('menu')

  // await waitFor(async () => {
  //   await userEvent.hover(canvas.getByLabelText('Email error'))
  // })
}
Open.parameters = {
  docs: { disable: true },
}
