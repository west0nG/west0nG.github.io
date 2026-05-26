import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

// Double-layer cursor: a small dot that tracks the mouse exactly,
// plus a larger ring that eases toward the mouse position.
// On interactive elements (a, button) the ring scales up and fills,
// while the dot fades out. Uses mix-blend-mode: difference so the
// cursor stays legible against any background (light/dark/brown).
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.translate = `${mx}px ${my}px`
    }

    const onMouseOver = (e) => {
      if (e.target.closest && e.target.closest('a, button')) {
        ring.classList.add(styles.ringHover)
        dot.classList.add(styles.dotHidden)
      }
    }
    const onMouseOut = (e) => {
      const stillOverInteractive =
        e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('a, button')
      if (!stillOverInteractive) {
        ring.classList.remove(styles.ringHover)
        dot.classList.remove(styles.dotHidden)
      }
    }

    const onMouseLeaveWindow = () => {
      dot.classList.add(styles.dotHidden)
      ring.classList.add(styles.ringHidden)
    }
    const onMouseEnterWindow = () => {
      dot.classList.remove(styles.dotHidden)
      ring.classList.remove(styles.ringHidden)
    }

    const animate = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.translate = `${rx}px ${ry}px`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
