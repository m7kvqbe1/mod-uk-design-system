import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { differenceInDays, endOfWeek, max, min } from 'date-fns'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import { TimelineNoData } from './TimelineNoData'
import { TimelineRowProps } from '.'
import { TimelineContext } from './context'
import { withKey } from '../../helpers'
import { formatPx, isOdd } from './helpers'

import {
  WEEK_START,
  TIMELINE_BG_COLOR,
  TIMELINE_ALT_BG_COLOR,
} from './constants'
import { TimelineDropContainer } from './TimelineDropContainer'
import { TimelineMain } from './TimelineMain'

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

interface StyledTimelineRowWeekProps {
  isOddNumber: boolean
  marginLeft: string
  width: string
}

const StyledTimelineRowWeek = styled.div<StyledTimelineRowWeekProps>`
  display: inline-block;
  height: 100vh;
  background-color: ${({ isOddNumber }) =>
    isOddNumber ? TIMELINE_ALT_BG_COLOR : TIMELINE_BG_COLOR};
  margin-left: ${({ marginLeft }) => marginLeft};
  width: ${({ width }) => width};
`

function renderDefaultColumns(
  index: number,
  isOddNumber: boolean,
  offsetPx: string,
  widthPx: string
) {
  return (
    <StyledTimelineRowWeek
      isOddNumber={isOddNumber}
      marginLeft={offsetPx}
      width={widthPx}
    />
  )
}

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

const StyledTimelineRowWeeksWrapper = styled.div`
  position: relative;
`

const StyledTimelineRowWeeks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
`

export const TimelineRows: React.FC<TimelineRowsProps> = ({
  children,
  className,
  renderColumns,
}) => {
  const hasChildren = React.Children.count(children) > 0
  const mainClasses = classNames('timeline__main', className)

  return (
    <DndProvider backend={HTML5Backend}>
      <TimelineMain renderColumns={renderColumns}>{children}</TimelineMain>
    </DndProvider>
  )
}

TimelineRows.displayName = 'TimelineRows'
