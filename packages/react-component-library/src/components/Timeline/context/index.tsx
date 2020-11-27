import React, { createContext, useReducer, useEffect } from 'react'

import { initialState, initialiseState } from './state'
import { reducer } from './reducer'
import { TIMELINE_ACTIONS, TimelineContextDefault, TimelineProviderProps } from './types'

const timelineContextDefaults: TimelineContextDefault = {
  hasSide: false,
  state: initialState,
  dispatch: null,
}

export const TimelineContext = createContext(timelineContextDefaults)

export const TimelineProvider: React.FC<TimelineProviderProps> = ({
  children,
  endDate,
  hasSide,
  options,
  startDate,
  today,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    initialiseState(startDate, endDate, today, options)
  )

  useEffect(() => {
    dispatch({ type: TIMELINE_ACTIONS.LOAD_GRID })
  }, [])

  return (
    <TimelineContext.Provider value={{ hasSide, state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  )
}
