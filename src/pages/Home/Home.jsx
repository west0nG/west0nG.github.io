import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import { useFullpageScroll } from '../../hooks/useFullpageScroll'
import { i18n } from '../../data/i18n'
import Navbar from '../../components/Navbar/Navbar'
import WordCycle from '../../components/WordCycle/WordCycle'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'
import styles from './Home.module.css'

const featured = projects.filter((p) => p.cardType === 'featured' || p.cardType === 'featured-secondary')
const normal = projects.filter((p) => p.cardType === 'normal')

export default function Home() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()
  const { currentIndex, goToSection, wrapperRef, sectionsRef } = useFullpageScroll(3)
  const location = useLocation()
  const t = i18n[lang]

  useEffect(() => {
    if (location.state?.section != null) {
      goToSection(location.state.section)
    }
  }, [location.state, goToSection])

  const setSectionRef = (index) => (el) => {
    sectionsRef.current[index] = el
  }

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        navLabels={t.nav}
        mode="home"
        activeSection={currentIndex}
        onNavClick={goToSection}
      />

      <div
        ref={wrapperRef}
        className={styles.sectionsWrapper}
      >
        {/* About */}
        <div
          ref={setSectionRef(0)}
          className={`${styles.section} ${currentIndex === 0 ? styles.sectionActive : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.hero}>
              <h1 className={styles.heroTitle}>{t.name}</h1>
              <p className={styles.heroSubtitle}>
                Founder &amp; Builder. I <WordCycle /> Cool Stuff.
              </p>
              <div className={styles.heroText}>
                {t.heroText}
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div
          ref={setSectionRef(1)}
          className={`${styles.section} ${currentIndex === 1 ? styles.sectionActive : ''}`}
        >
          <div className={`${styles.container} ${styles.projectSectionContainer}`}>
            <h2 className={styles.projectTitle}>{t.projectsTitle}</h2>
            <div className={styles.cardGap} />
            <div className={styles.projectGridFeatured}>
              {featured.map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </div>
            <div className={styles.cardGap} />
            <div className={styles.projectGridNormal}>
              {normal.map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div
          ref={setSectionRef(2)}
          className={`${styles.section} ${styles.contactSection} ${currentIndex === 2 ? styles.sectionActive : ''}`}
        >
          <div className={`${styles.container} ${styles.connectContainer}`}>
            <div className={styles.connectTitle}>{t.connectTitle}</div>
            <a href="https://www.linkedin.com/in/weston-guo/" className={styles.connectButton}>
              <div className={styles.connectLogo}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor" />
                </svg>
              </div>
              <div className={styles.connectText}>LinkedIn</div>
            </a>
            <a href="mailto:westongu@usc.edu" className={styles.connectButton}>
              <div className={styles.connectLogo}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                </svg>
              </div>
              <div className={styles.connectText}>Email</div>
            </a>
            <a href="https://github.com/west0nG" className={styles.connectButton}>
              <div className={styles.connectLogo}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor" />
                </svg>
              </div>
              <div className={styles.connectText}>GitHub</div>
            </a>
            <a href="https://okjk.co/hS2gAU" className={styles.connectButton}>
              <div className={styles.connectLogo}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM15.5 6h-3v9c0 1.1-.5 1.85-1.5 2.25-.55.22-1.15.33-1.75.33v-2.16c.35 0 .7-.07.95-.18.35-.15.3-.52.3-.74V8H8.5V6h7z" />
                </svg>
              </div>
              <div className={styles.connectText}>Jike</div>
            </a>
          </div>
          <div className={styles.footerText}>{t.footer}</div>
        </div>
      </div>
    </>
  )
}
