import React, { useEffect, useRef } from 'react'

import { VirtualElement } from '@popperjs/core'
import { useOpenClose } from './useOpenClose'
import { useFloatingElement } from './useFloatingElement'

export const CLICK_BUTTON = {
  LEFT: 'left',
  RIGHT: 'right',
} as const

export type ClickType = typeof CLICK_BUTTON[keyof typeof CLICK_BUTTON]

interface UseClickMenuParams {
  attachedToRef: React.RefObject<HTMLElement>
  clickType: ClickType
  initialIsOpen: boolean
  onHide?: (e: MouseEvent) => void
  onShow?: (e: MouseEvent) => void
}

type UseClickMenuReturnType = {
  isOpen: boolean
} & ReturnType<typeof useFloatingElement>

function generateVirtualReference({
  clientY,
  clientX,
}: MouseEvent): VirtualElement {
  return {
    getBoundingClientRect() {
      return {
        top: clientY,
        right: clientX,
        bottom: clientY,
        left: clientX,
        width: 0,
        height: 0,
      } as DOMRect
    },
  }
}

export const useClickMenu = ({
  attachedToRef,
  clickType,
  initialIsOpen,
  onHide,
  onShow,
}: UseClickMenuParams): UseClickMenuReturnType => {
  const { open, setOpen } = useOpenClose<boolean>(initialIsOpen)
  const mousePointer = useRef<VirtualElement | undefined>()
  const {
    targetElementRef,
    floatingElement,
    floatingElementRef,
    arrowElementRef,
    styles,
    attributes,
  } = useFloatingElement('auto-end', 'fixed', mousePointer.current)

  const displayMenu = (e: MouseEvent): void => {
    if (
      !(e.target instanceof Node) ||
      !attachedToRef.current?.contains(e.target)
    ) {
      return
    }

    // Click was within bounds of target area
    e.preventDefault()
    e.stopPropagation()

    mousePointer.current = generateVirtualReference(e)
    setOpen(true)

    if (onShow) {
      onShow(e)
    }
  }

  const hideMenu = (e: MouseEvent): void => {
    if (!open || !floatingElement) {
      return
    }

    if (e.target instanceof Node && floatingElement.contains(e.target)) {
      return
    }

    setOpen(false)

    if (onHide) {
      onHide(e)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', hideMenu, { capture: true })

    if (clickType === 'left') {
      document.addEventListener('click', displayMenu)
    }

    if (clickType === 'right') {
      document.addEventListener('contextmenu', displayMenu)
    }

    return () => {
      document.removeEventListener('contextmenu', displayMenu)
      document.removeEventListener('click', displayMenu)
      document.removeEventListener('mousedown', hideMenu, { capture: true })
    }
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  return {
    isOpen: open,
    targetElementRef,
    floatingElement,
    floatingElementRef,
    arrowElementRef,
    styles,
    attributes,
  }
}
