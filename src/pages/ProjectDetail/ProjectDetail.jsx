import { useParams, Navigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import { i18n } from '../../data/i18n'
import { getProjectById } from '../../data/projects'
import Navbar from '../../components/Navbar/Navbar'
import styles from './ProjectDetail.module.css'

function LinkIcon() {
  return (
    <svg className={styles.linkIconCanva} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <rect width="24" height="24" />
      <path d="M14 7h2.5a3.5 3.5 0 1 1 0 7H14m-4 3H7.5a3.5 3.5 0 1 1 0-7H10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12h8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  )
}

const iconMap = { link: LinkIcon, github: GitHubIcon, chat: ChatIcon }

function localized(value, lang) {
  if (typeof value === 'object' && value !== null) return value[lang] || value.en
  return value
}

export default function ProjectDetail() {
  const { id } = useParams()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()
  const t = i18n[lang]
  const project = getProjectById(id)

  if (!project) return <Navigate to="/" replace />

  const description = localized(project.description, lang)

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} navLabels={t.nav} mode="detail" />

      <div className={styles.page}>
        <div className={styles.section}>
          <div className={`${styles.container} ${styles.hero}`}>
            <div className={styles.heroTitleRow}>
              <h1 className={styles.heroTitle}>{project.title}</h1>
              <span className={styles.heroCaption}>{project.role}</span>
            </div>
            <h2 className={styles.heroSubtitle}>{localized(project.subtitle, lang)}</h2>
            <div className={styles.heroText}>
              {description.split('\n\n').map((para, i) => (
                <span key={i}>
                  {i > 0 && <><br /><br /></>}
                  {para}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.links.length > 0 && (
          <div className={styles.section}>
            <div className={`${styles.container} ${styles.linkContainer}`}>
              <div className={styles.linkTitle}>{t.linksTitle}</div>
              {project.links.map((link) => {
                const Icon = iconMap[link.icon] || LinkIcon
                return (
                  <a key={link.url} href={link.url} className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                    <div className={styles.linkItemLogo}>
                      <Icon />
                    </div>
                    <div className={styles.linkItemText}>{localized(link.label, lang)}</div>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
