import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

const cardTypeClass = {
  featured: styles.featured,
  'featured-secondary': styles.featuredSecondary,
  normal: styles.normal,
}

export default function ProjectCard({ id, title, subtitle, cardType, image, overlay, to }) {
  const href = to ?? `/projects/${id}`
  const style = {}
  if (image) style['--hover-bg-image'] = `url(${image})`
  if (overlay) style['--hover-overlay-image'] = `url(${overlay})`
  return (
    <Link
      to={href}
      className={`${styles.card} ${cardTypeClass[cardType] || styles.normal}`}
      style={Object.keys(style).length ? style : undefined}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardSubtitle}>{subtitle}</p>
    </Link>
  )
}
