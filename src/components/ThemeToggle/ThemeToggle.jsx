import { useState, useRef, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// Easter egg messages — shown when the user clicks the theme toggle inside
// the archive. The archive is locked to brown on purpose, so we wink instead
// of switching themes. Messages escalate with each repeat click.
const eggMessages = [
  "it doesn't work in the archive — feature, not bug",
  "still doesn't. still a feature.",
  "the archive's committed to its patina ☕",
  "ok, you're persistent. still no.",
  "wow, real commitment. respect. still no.",
]

const HIDE_AFTER = 3800
const SWAP_FADE = 150

export default function ThemeToggle({ theme, onToggle, archive = false }) {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [fading, setFading] = useState(false)
  const indexRef = useRef(0)
  const hideTimerRef = useRef(null)
  const swapTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(hideTimerRef.current)
      clearTimeout(swapTimerRef.current)
    }
  }, [])

  const handleClick = () => {
    if (!archive) {
      onToggle()
      return
    }

    clearTimeout(hideTimerRef.current)
    clearTimeout(swapTimerRef.current)

    if (!visible) {
      setText(eggMessages[0])
      indexRef.current = 1
      setVisible(true)
    } else {
      // Cross-fade to the next message: fade out current, swap text, fade in.
      setFading(true)
      swapTimerRef.current = setTimeout(() => {
        setText(eggMessages[indexRef.current % eggMessages.length])
        indexRef.current = (indexRef.current + 1) % eggMessages.length
        setFading(false)
      }, SWAP_FADE)
    }

    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
      indexRef.current = 0
    }, HIDE_AFTER)
  }

  return (
    <div className={styles.wrapper}>
      <span
        className={`${styles.egg} ${visible ? styles.eggVisible : ''} ${fading ? styles.eggFading : ''}`}
        aria-live="polite"
      >
        {text}
      </span>
      <button className={styles.toggle} onClick={handleClick} aria-label="Toggle dark mode">
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  )
}
