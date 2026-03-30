import { useState, useEffect, useRef, useCallback } from 'react'

export function useFullpageScroll(sectionCount) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimating = useRef(false)
  const wrapperRef = useRef(null)
  const sectionsRef = useRef([])
  const touchStartY = useRef(0)
  const touchLastY = useRef(0)

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

  // Check if a section overflows the viewport and return boundary info
  const getSectionScrollInfo = useCallback((wrapper) => {
    const section = sectionsRef.current[currentIndex]
    if (!section || !wrapper) return null

    const sectionTop = section.offsetTop
    const sectionHeight = section.scrollHeight
    const viewportHeight = wrapper.clientHeight
    const scrollable = sectionHeight > viewportHeight + 5

    if (!scrollable) return null

    const scrollTop = wrapper.scrollTop - sectionTop
    const maxScroll = sectionHeight - viewportHeight

    return {
      sectionTop,
      scrollTop,
      maxScroll,
      atTop: scrollTop <= 1,
      atBottom: scrollTop >= maxScroll - 1,
    }
  }, [currentIndex])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleWheel = (e) => {
      if (isAnimating.current) { e.preventDefault(); return }

      const info = getSectionScrollInfo(wrapper)

      if (info) {
        // Section overflows: allow internal scrolling before jumping
        if (e.deltaY > 0 && !info.atBottom) {
          e.preventDefault()
          wrapper.scrollTop = Math.min(
            wrapper.scrollTop + Math.abs(e.deltaY),
            info.sectionTop + info.maxScroll
          )
          return
        }
        if (e.deltaY < 0 && !info.atTop) {
          e.preventDefault()
          wrapper.scrollTop = Math.max(
            wrapper.scrollTop - Math.abs(e.deltaY),
            info.sectionTop
          )
          return
        }
      }

      e.preventDefault()
      if (Math.abs(e.deltaY) < 30) return

      if (e.deltaY > 0) {
        goToSection(currentIndex + 1)
      } else {
        goToSection(currentIndex - 1)
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
      touchLastY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (isAnimating.current) return

      const currentY = e.touches[0].clientY
      const deltaY = touchLastY.current - currentY // positive = finger moves up = scroll down
      touchLastY.current = currentY

      const info = getSectionScrollInfo(wrapper)
      if (info) {
        if (deltaY > 0 && !info.atBottom) {
          e.preventDefault()
          wrapper.scrollTop = Math.min(
            wrapper.scrollTop + deltaY,
            info.sectionTop + info.maxScroll
          )
          return
        }
        if (deltaY < 0 && !info.atTop) {
          e.preventDefault()
          wrapper.scrollTop = Math.max(
            wrapper.scrollTop + deltaY,
            info.sectionTop
          )
          return
        }
      }
    }

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return
      const diff = touchStartY.current - e.changedTouches[0].clientY

      const info = getSectionScrollInfo(wrapper)
      if (info) {
        if (diff > 0 && !info.atBottom) return
        if (diff < 0 && !info.atTop) return
      }

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
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: false })
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      wrapper.removeEventListener('wheel', handleWheel)
      wrapper.removeEventListener('touchstart', handleTouchStart)
      wrapper.removeEventListener('touchmove', handleTouchMove)
      wrapper.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, goToSection, getSectionScrollInfo])

  return { currentIndex, goToSection, wrapperRef, sectionsRef }
}
