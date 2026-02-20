import { useEffect } from 'react'

let lockCount = 0
let previousOverflow = ''

function lockBodyScroll() {
  if (typeof document === 'undefined' || !document.body) {
    return
  }

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  lockCount += 1
}

function unlockBodyScroll() {
  if (typeof document === 'undefined' || !document.body) {
    return
  }

  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow
    previousOverflow = ''
  }
}

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) {
      return undefined
    }

    lockBodyScroll()
    return () => {
      unlockBodyScroll()
    }
  }, [locked])
}

