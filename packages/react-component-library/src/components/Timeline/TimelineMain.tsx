import React, { useContext } from 'react'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'

import { TimelineNoData } from './TimelineNoData'
import { ComponentWithClass } from '../../common/ComponentWithClass'
import { TimelineRowProps } from './TimelineRow'
import { useTimelineGrid } from './hooks/useTimelineGrid'
import { TimelineContext } from './context'
import { TIMELINE_ACTIONS } from './context/types'

interface DefaultStyles {
  defaultStyles: boolean
}

const StyledTimelineMain = styled.div<DefaultStyles>`
  ${({ defaultStyles }) =>
    defaultStyles &&
    `
      width: auto;
      height: auto;
      min-height: 4rem;
    `}
`

type TimelineRowsChildrenType =
  | React.ReactElement<TimelineRowProps>
  | React.ReactElement<TimelineRowProps>[]

export interface TimelineRowsProps extends ComponentWithClass {
  children: TimelineRowsChildrenType
  renderColumns?: (
    index: number,
    isOddNumber: boolean,
    offsetPx: string,
    widthPx: string
  ) => React.ReactElement
}

export const TimelineMain: React.FC<TimelineRowsProps> = ({
  children,
  renderColumns,
}) => {
  const hasChildren = React.Children.count(children) > 0
  const { dispatch } = useContext(TimelineContext)

  const [, drop] = useDrop({
    accept: 'EVENT',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)

      dispatch({
        type: TIMELINE_ACTIONS.SET_EVENT_POSITION,
        payload: { id: item.id, left },
      })
    },
  })

  return (
    <StyledTimelineMain
      defaultStyles={!renderColumns}
      role="rowgroup"
      data-testid="timeline-rows"
      ref={drop}
    >
      {hasChildren ? children : <TimelineNoData />}
    </StyledTimelineMain>
  )
}
