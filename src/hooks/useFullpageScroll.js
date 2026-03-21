import { useState, useEffect, useRef, useCallback } from 'react'

export function useFullpageScroll(sectionCount) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimating = useRef(false)
  const wrapperRef = useRef(null)
  const sectionsRef = useRef([])
  const touchStartY = useRef(0)

  const goToSection = useCallback(
    (index) => {
      if (index < 0 || index >= sectionCount) return
      if (isAnimating.current) return
      isAnimating.current = true
      setCurrentIndex(index)
      setTimeout(() => {
        isAnimating.current = false
      }, 850)
    },
    [sectionCount]
  )

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (isAnimating.current) return

      const section = sectionsRef.current[currentIndex]
      if (section) {
        const scrollable = section.scrollHeight > section.clientHeight + 5

        if (scrollable) {
          const atTop = section.scrollTop <= 1
          const atBottom =
            Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight - 1

          if (e.deltaY > 0 && !atBottom) {
            section.scrollTop = Math.min(
              section.scrollTop + Math.abs(e.deltaY),
              section.scrollHeight - section.clientHeight
            )
            return
          }
          if (e.deltaY < 0 && !atTop) {
            section.scrollTop = Math.max(section.scrollTop + e.deltaY, 0)
            return
          }
        }
      }

      if (Math.abs(e.deltaY) < 30) return

      if (e.deltaY > 0) {
        goToSection(currentIndex + 1)
      } else {
        goToSection(currentIndex - 1)
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) < 50) return
      if (diff > 0) {
        goToSection(currentIndex + 1)
      } else {
        goToSection(currentIndex - 1)
      }
    }

    const handleKeyDown = (e) => {
      if (isAnimating.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goToSection(currentIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goToSection(currentIndex - 1)
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, goToSection])

  return { currentIndex, goToSection, wrapperRef, sectionsRef }
}
