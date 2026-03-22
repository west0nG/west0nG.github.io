import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './Navbar.module.css'

export default function Navbar({ theme, onToggleTheme, lang, onToggleLang, navLabels, mode = 'home', activeSection, onNavClick }) {
  if (mode === 'detail') {
    return (
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link to="/" className={styles.navButton}>{navLabels.back}</Link>
            <div className={styles.navRight}>
              <button className={styles.langToggle} onClick={onToggleLang}>
                {lang === 'en' ? '中文' : 'EN'}
              </button>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const sectionKeys = ['about', 'projects', 'contact']

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          {sectionKeys.map((key, i) => (
            <button
              key={key}
              className={`${styles.navButton} ${activeSection === i ? styles.navActive : ''}`}
              onClick={() => onNavClick(i)}
            >
              {navLabels[key]}
            </button>
          ))}
          <div className={styles.navRight}>
            <button className={styles.langToggle} onClick={onToggleLang}>
              {lang === 'en' ? '中文' : 'EN'}
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  )
}
