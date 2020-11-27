import { useContext, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { get } from 'lodash'

import { getId } from '../../../helpers'
import { TimelineContext } from '../context'
import { TIMELINE_ACTIONS } from '..'

export function useTimelineEvent(onMove: (eventPosition: any) => void) {
  const [id, setId] = useState<string>()
  const [eventPosition, setEventPosition] = useState()
  const {
    state: { eventPositions },
    dispatch,
  } = useContext(TimelineContext)

  useEffect(() => {
    const newId = getId('draggable-event')
    setId(newId)
  }, [])

  if (!eventPositions[id]) {
    dispatch({
      type: TIMELINE_ACTIONS.SET_EVENT_POSITION,
      payload: { id },
    })
  }

  useEffect(() => {
    if (eventPosition && onMove) {
      onMove(eventPosition)
    }
    setEventPosition(eventPositions[id])
  }, [eventPositions[id]])

  const [{ isDragging }, drag, preview] = useDrag({
    item: { id, type: 'EVENT', left: get(eventPosition, 'value') },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return {
    drag,
    offsetPx: get(eventPosition, 'px'),
  }
}
