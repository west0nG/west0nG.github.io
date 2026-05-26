import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

const cardTypeClass = {
  featured: styles.featured,
  'featured-secondary': styles.featuredSecondary,
  normal: styles.normal,
}

export default function ProjectCard({ id, title, subtitle, cardType, image, to }) {
  const href = to ?? `/projects/${id}`
  const style = image ? { '--hover-bg-image': `url(${image})` } : undefined
  return (
    <Link
      to={href}
      className={`${styles.card} ${cardTypeClass[cardType] || styles.normal}`}
      style={style}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardSubtitle}>{subtitle}</p>
    </Link>
  )
}
