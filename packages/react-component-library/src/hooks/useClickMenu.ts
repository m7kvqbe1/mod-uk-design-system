import { useState, useEffect } from 'react'
import { useOpenClose } from './useOpenClose'

export type Coordinate = {
  x: number
  y: number
}

export type ClickType = 'left' | 'right'

export const useClickMenu = (
  attachedToRef: React.RefObject<HTMLElement>,
  clickType: ClickType
): { position: Coordinate; isOpen: boolean } => {
  const { open, setOpen } = useOpenClose<boolean>(false)
  const [position, setPosition] = useState<Coordinate>({ x: 0, y: 0 })

  function displayMenu(e: MouseEvent) {
    const mousePoint: Coordinate = { x: e.clientX, y: e.clientY }
    setPosition(mousePoint)

    if (e.target === attachedToRef.current) {
      e.preventDefault()
      setOpen(true)
      return
    }

    setOpen(false)
  }

  function hideMenu() {
    setOpen(false)
  }

  useEffect(() => {
    if (clickType === 'left') {
      document.addEventListener('click', displayMenu)
    }

    if (clickType === 'right') {
      document.addEventListener('contextmenu', displayMenu)
      document.addEventListener('click', hideMenu)
    }

    return () => {
      document.removeEventListener('contextmenu', displayMenu)
      document.removeEventListener('click', displayMenu)
      document.removeEventListener('click', hideMenu)
    }
  })

  return {
    position,
    isOpen: open,
  }
}
