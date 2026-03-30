import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './WordCycle.module.css'

const words = [
  { text: 'Ship', width: '4.3ch' },
  { text: 'Build', width: '5.2ch' },
  { text: 'Fix', width: '3.2ch' },
  { text: 'Explore', width: '7.0ch' },
]

export default function WordCycle() {
  const [cycling, setCycling] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)

  const startCycling = useCallback(() => {
    setCycling(true)
    setWordIndex(0)
    setFading(false)
    timerRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % words.length)
        setFading(false)
      }, 150)
    }, 1500)
  }, [])

  const stopCycling = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null
    setCycling(false)
  }, [])

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  const handleTap = useCallback(() => {
    if (cycling) stopCycling()
    else startCycling()
  }, [cycling, startCycling, stopCycling])

  return (
    <span
      className={`${styles.wrapper} ${cycling ? styles.cycling : ''}`}
      style={cycling ? { width: words[wordIndex].width } : undefined}
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label="Ship"
    >
      Ship
      {cycling && (
        <span className={`${styles.cycleText} ${fading ? styles.fadeOut : ''}`}>
          {words[wordIndex].text}
        </span>
      )}
    </span>
  )
}
