import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './Navbar.module.css'

export default function Navbar({ theme, onToggleTheme, mode = 'home', activeSection, onNavClick }) {
  if (mode === 'detail') {
    return (
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link to="/" className={styles.navButton}>Back</Link>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </nav>
    )
  }

  const sections = ['about', 'projects', 'contact']

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          {sections.map((section, i) => (
            <button
              key={section}
              className={`${styles.navButton} ${activeSection === i ? styles.navActive : ''}`}
              onClick={() => onNavClick(i)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </nav>
  )
}
