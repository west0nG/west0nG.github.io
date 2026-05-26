import { useEffect } from 'react'

// Pulls the element gently toward the cursor when the mouse is within radius.
// Uses the CSS `translate` property so it composes with existing
// `transform` (e.g. the hover lift on ProjectCard).
export function useMagnetic(ref, { strength = 0.25, radius = 90 } = {}) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const el = ref.current
    if (!el) return

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength
        el.style.translate = `${dx * factor}px ${dy * factor}px`
      } else if (el.style.translate) {
        el.style.translate = ''
      }
    }

    const onMouseLeave = () => {
      el.style.translate = ''
    }

    window.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.style.translate = ''
    }
  }, [ref, strength, radius])
}
