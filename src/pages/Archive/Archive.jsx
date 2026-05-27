import { useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { t } from '../../data/i18n'
import { projects } from '../../data/projects'
import Navbar from '../../components/Navbar/Navbar'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import styles from './Archive.module.css'

const archived = projects.filter((p) => p.archived)

export default function Archive() {
  const { theme, toggleTheme } = useTheme()

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
      <Navbar theme={theme} onToggleTheme={toggleTheme} navLabels={t.nav} mode="detail" archive />

      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{t.archiveTitle}</h1>
          <p className={styles.subtitle}>{t.archiveSubtitle}</p>
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
