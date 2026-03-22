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

      const wrapper = wrapperRef.current
      const section = sectionsRef.current[index]
      if (!wrapper || !section) return

      isAnimating.current = true
      setCurrentIndex(index)

      wrapper.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      })

      setTimeout(() => {
        isAnimating.current = false
      }, 850)
    },
    [sectionCount]
  )

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleWheel = (e) => {
      e.preventDefault()
      if (isAnimating.current) return

      const section = sectionsRef.current[currentIndex]
      if (section) {
        const scrollable = section.scrollHeight > section.clientHeight + 5

        if (scrollable) {
          const sectionTop = section.offsetTop
          const scrollTop = wrapper.scrollTop - sectionTop
          const atTop = scrollTop <= 1
          const atBottom =
            Math.ceil(scrollTop + wrapper.clientHeight) >= section.scrollHeight - 1

          if (e.deltaY > 0 && !atBottom) return
          if (e.deltaY < 0 && !atTop) return
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

    wrapper.addEventListener('wheel', handleWheel, { passive: false })
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true })
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      wrapper.removeEventListener('wheel', handleWheel)
      wrapper.removeEventListener('touchstart', handleTouchStart)
      wrapper.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, goToSection])

  return { currentIndex, goToSection, wrapperRef, sectionsRef }
}
