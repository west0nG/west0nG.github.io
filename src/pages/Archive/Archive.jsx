import { useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import { i18n } from '../../data/i18n'
import { projects } from '../../data/projects'
import Navbar from '../../components/Navbar/Navbar'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import styles from './Archive.module.css'

const archived = projects.filter((p) => p.archived)

export default function Archive() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()
  const t = i18n[lang]

  useEffect(() => {
    document.title = `Archive - Weston Guo`
    document.documentElement.setAttribute('data-page', 'archive')
    return () => {
      document.title = 'Weston Guo'
      document.documentElement.removeAttribute('data-page')
    }
  }, [])

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} navLabels={t.nav} mode="detail" />

      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{t.archiveTitle}</h1>
          <div className={styles.gridGap} />
          <div className={styles.grid}>
            {archived.map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
