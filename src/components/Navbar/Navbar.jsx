import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './Navbar.module.css'

export default function Navbar({ theme, onToggleTheme, navLabels, mode = 'home', activeSection, onNavClick, archive = false }) {
  if (mode === 'detail') {
    return (
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link to="/" state={{ section: 1 }} className={styles.navButton}>{navLabels.back}</Link>
            <div className={styles.navRight}>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} archive={archive} />
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
            <ThemeToggle theme={theme} onToggle={onToggleTheme} archive={archive} />
          </div>
        </div>
      </div>
    </nav>
  )
}
