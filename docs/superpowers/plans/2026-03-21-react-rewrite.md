# React Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the existing static HTML/CSS/JS personal website as a React SPA with identical visual output.

**Architecture:** Vite + React SPA with React Router for page navigation. CSS Modules for component-scoped styles. Centralized project data file drives both card grid and detail pages. Custom hooks encapsulate theme and fullpage scroll logic.

**Tech Stack:** React 19, React Router 7, Vite 6, CSS Modules

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `vite.config.js` | Vite configuration |
| `index.html` | Vite HTML entry point (replaces old index.html) |
| `src/main.jsx` | React DOM root mount |
| `src/App.jsx` | Router definition |
| `src/styles/global.css` | CSS variables, resets, fonts, dark theme |
| `src/data/projects.js` | All project data |
| `src/hooks/useTheme.js` | Theme state + localStorage persistence |
| `src/hooks/useFullpageScroll.js` | Fullpage scroll logic |
| `src/components/ThemeToggle/ThemeToggle.jsx` | Dark/light toggle button |
| `src/components/ThemeToggle/ThemeToggle.module.css` | Toggle styles |
| `src/components/Navbar/Navbar.jsx` | Fixed top nav (home + detail modes) |
| `src/components/Navbar/Navbar.module.css` | Nav styles |
| `src/components/WordCycle/WordCycle.jsx` | Hover word cycling animation |
| `src/components/WordCycle/WordCycle.module.css` | Word cycle styles |
| `src/components/ProjectCard/ProjectCard.jsx` | Project card with hover image |
| `src/components/ProjectCard/ProjectCard.module.css` | Card variant styles |
| `src/pages/Home/Home.jsx` | Home page (About + Projects + Contact) |
| `src/pages/Home/Home.module.css` | Home page section styles |
| `src/pages/ProjectDetail/ProjectDetail.jsx` | Data-driven project detail |
| `src/pages/ProjectDetail/ProjectDetail.module.css` | Detail page styles |
| `public/assets/*.png` | Project thumbnail images |

---

### Task 1: Scaffold Vite + React Project

**Files:**
- Remove: `index.html`, `css/styles.css`, `js/main.js`, `projects/*.html`
- Move: `assets/*.png` → `public/assets/*.png`
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Move assets to public directory**

```bash
mkdir -p public/assets
mv assets/*.png public/assets/
```

- [ ] **Step 2: Remove old source files**

```bash
rm -rf css js projects assets
```

- [ ] **Step 3: Create package.json**

```json
{
  "name": "weston-personal-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 4: Install dependencies**

```bash
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react
```

- [ ] **Step 5: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 6: Replace index.html with Vite entry**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <title>Weston Guo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 8: Create src/App.jsx (placeholder)**

```jsx
export default function App() {
  return <div>App works</div>
}
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts, browser shows "App works" at localhost:5173.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React project"
```

---

### Task 2: Global Styles and Theme System

**Files:**
- Create: `src/styles/global.css`
- Create: `src/hooks/useTheme.js`
- Create: `src/components/ThemeToggle/ThemeToggle.jsx`
- Create: `src/components/ThemeToggle/ThemeToggle.module.css`

- [ ] **Step 1: Create src/styles/global.css**

```css
:root {
  --bg-color: #f7f7f7;
  --text-color: #000000;
  --text-secondary: #878787;
  --border-color: #E5E7EB;
  --card-shadow: rgba(0, 0, 0, 0.04);
  --card-shadow-hover: rgba(0, 0, 0, 0.12);
}

[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --text-secondary: #9e9e9e;
  --border-color: #2a2a2a;
  --card-shadow: rgba(0, 0, 0, 0.2);
  --card-shadow-hover: rgba(0, 0, 0, 0.4);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

a {
  text-decoration: none;
  color: inherit;
}
```

- [ ] **Step 2: Create src/hooks/useTheme.js**

```js
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
```

- [ ] **Step 3: Create src/components/ThemeToggle/ThemeToggle.jsx**

```jsx
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

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button className={styles.toggle} onClick={onToggle} aria-label="Toggle dark mode">
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
```

- [ ] **Step 4: Create src/components/ThemeToggle/ThemeToggle.module.css**

```css
.toggle {
  background: transparent;
  border: none;
  margin-left: auto;
  cursor: pointer;
  color: inherit;
  padding: 0;
  line-height: 1;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
}

.toggle svg {
  width: 18px;
  height: 18px;
}

.toggle:hover {
  opacity: 0.6;
}
```

- [ ] **Step 5: Verify theme toggle works**

Temporarily render ThemeToggle in App.jsx:
```jsx
import { useTheme } from './hooks/useTheme'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <p>Current theme: {theme}</p>
    </div>
  )
}
```

Expected: Clicking the toggle switches between light/dark, background color changes, icon swaps. Refreshing preserves theme.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add global styles and theme system"
```

---

### Task 3: Navbar Component

**Files:**
- Create: `src/components/Navbar/Navbar.jsx`
- Create: `src/components/Navbar/Navbar.module.css`

- [ ] **Step 1: Create src/components/Navbar/Navbar.jsx**

```jsx
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
```

- [ ] **Step 2: Create src/components/Navbar/Navbar.module.css**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: var(--bg-color);
  padding-top: 32px;
  padding-bottom: 20px;
  transition: background-color 0.3s ease;
}

.container {
  margin: 0 160px;
  display: flex;
  justify-content: flex-start;
}

.navContainer {
  display: flex;
  gap: 32px;
  justify-content: flex-start;
  width: 100%;
}

.navButton {
  background-color: transparent;
  border: none;
  width: fit-content;
  height: fit-content;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.04em;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.navButton:hover {
  text-decoration: underline;
}

.navActive {
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 768px) {
  .container {
    margin: 0 24px;
  }

  .nav {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .navContainer {
    gap: 24px;
  }

  .navButton {
    font-size: 14px;
  }
}

@media (max-width: 520px) {
  .container {
    margin: 0 16px;
  }

  .nav {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .navContainer {
    gap: 16px;
  }

  .navButton {
    font-size: 13px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Navbar component"
```

---

### Task 4: WordCycle Component

**Files:**
- Create: `src/components/WordCycle/WordCycle.jsx`
- Create: `src/components/WordCycle/WordCycle.module.css`

- [ ] **Step 1: Create src/components/WordCycle/WordCycle.jsx**

```jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './WordCycle.module.css'

const words = [
  { text: 'Ship', width: '4.3ch' },
  { text: 'Build', width: '5.2ch' },
  { text: 'Fix', width: '3.2ch' },
  { text: 'Explore', width: '7.0ch' },
]

export default function WordCycle() {
  const [cycling, setCycling] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)

  const startCycling = useCallback(() => {
    setCycling(true)
    setWordIndex(0)
    setFading(false)
    timerRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % words.length)
        setFading(false)
      }, 150)
    }, 1500)
  }, [])

  const stopCycling = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null
    setCycling(false)
  }, [])

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <span
      className={`${styles.wrapper} ${cycling ? styles.cycling : ''}`}
      style={cycling ? { width: words[wordIndex].width } : undefined}
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
      aria-label="Ship"
    >
      Ship
      {cycling && (
        <span className={`${styles.cycleText} ${fading ? styles.fadeOut : ''}`}>
          {words[wordIndex].text}
        </span>
      )}
    </span>
  )
}
```

- [ ] **Step 2: Create src/components/WordCycle/WordCycle.module.css**

```css
.wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border-radius: 0.3em;
  white-space: nowrap;
  overflow: hidden;
  transition: background-color 0.2s ease, color 0.2s ease, font-weight 0.2s ease, box-shadow 0.2s ease;
}

.cycling {
  padding: 0 0.12em;
  background-color: #2b7cff;
  color: transparent;
  font-weight: 700;
  box-shadow: 0 0 0 1px rgba(43, 124, 255, 0.18), 0 6px 14px rgba(43, 124, 255, 0.28);
  background-image: linear-gradient(115deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.28) 50%, rgba(255, 255, 255, 0.1) 100%);
  background-size: 240% 100%;
  animation: glow 3s ease-in-out infinite, shimmer 3.3s linear infinite;
  transition: width 0.3s ease, background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.cycleText {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fadeOut {
  opacity: 0.3;
  transform: translateY(-0.06em) scale(0.97);
  filter: blur(0.8px);
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(43, 124, 255, 0.18), 0 6px 14px rgba(43, 124, 255, 0.28);
  }
  50% {
    box-shadow: 0 0 0 1px rgba(43, 124, 255, 0.28), 0 8px 20px rgba(43, 124, 255, 0.38);
  }
}

@keyframes shimmer {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add WordCycle component"
```

---

### Task 5: Project Data

**Files:**
- Create: `src/data/projects.js`

- [ ] **Step 1: Create src/data/projects.js**

```js
export const projects = [
  {
    id: 'modcraft',
    title: 'ModCraft',
    subtitle: 'Agent for Game Mod Creation',
    role: 'Co-Founder',
    description:
      'ModCraft is the startup project that I am currently working on. We are building agent that can turn natural language mod ideas into fully playable game mods in one step. We are developing our first version on Minecraft. The product will be released in March 2026. Stay tuned.',
    cardType: 'featured',
    image: '/assets/modcraft.png',
    links: [
      { label: 'ModCraft Website', url: 'https://modcraft.dev', icon: 'link' },
    ],
  },
  {
    id: 'pivothack',
    title: 'PivotHack',
    subtitle: '2-day startup hackathon for youth',
    role: 'Founder',
    description:
      "After participating in several hackathons, I started to think about why I can't host a hackathon by myself. In the final months of high school, my friends and I founded PivotHack, a two-day startup hackathon for youth aged 14\u201318 in China. The event brought together nearly 100 participants from cities including Beijing, Shanghai, Sichuan, and Shandong, along with hundreds of audience members. PivotHack was supported by leading Chinese venture capital firms and accelerators such as ZhenFund, LanChi Fund, MiraclePlus (formerly Y Combinator China), and SparkLab. Today, PivotHack continues to support young builders in China by helping them host their own hackathons and turn early ideas into real projects, while collaborating with initiatives like the Keystone Hackathon and Spark_init Project.",
    cardType: 'featured-secondary',
    image: '/assets/pivothack.png',
    links: [
      { label: 'PivotHack Website', url: 'https://pivothack.info', icon: 'link' },
      { label: 'PivotHack Manifesto', url: 'https://mp.weixin.qq.com/s/BvwV09Ig3cwpK2AUu9yiDw', icon: 'chat' },
    ],
  },
  {
    id: 'sigmahub',
    title: 'SigmaHub',
    subtitle: 'AI powered video learning platform',
    role: 'Product Manger & UI Designer',
    description:
      "Have you ever watched educational content on YouTube or Bilibili, only to realize the next day that you've forgotten almost everything? Passive video consumption is an extremely inefficient way to learn. SigmaHub is built to change that.\n\nSigmaHub is an AI-powered learning companion that turns video watching into active learning. By automatically generating questions, summaries, and keyword clouds, SigmaHub helps learners engage with content more deeply and significantly improves knowledge retention \u2014 making video learning up to ten times more effective.",
    cardType: 'normal',
    image: '/assets/sigmahub.png',
    links: [],
  },
  {
    id: 'barshelpbars',
    title: 'BarsHelpBars',
    subtitle: 'On-chain RWA cocktail recipe marketplace',
    role: 'Product Manager & ETH Developer',
    description:
      'Bar hopping has always been my way of understanding flavor, culture, and creativity. At a hackathon, I explored how blockchain could enable new forms of creative ownership and sharing, which led me to build BarsHelpBars\u2014a platform that lets world-class bars lease their signature cocktail recipes on-chain via ERC-4907 and ERC-6551, bringing exceptional flavors from global destinations to local neighborhood bars.',
    cardType: 'normal',
    image: '/assets/barshelpbars.png',
    links: [
      { label: 'BarsHelpBars Github Repo', url: 'https://github.com/west0nG/ADVX25', icon: 'github' },
      { label: 'BarsHelpBars Deck', url: 'https://www.canva.com/design/DAGuQD4aYEE/4V71-9-NgXvRsCcwbxGu6A/view?utm_content=DAGuQD4aYEE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1bfa8dd725', icon: 'link' },
    ],
  },
  {
    id: 'punky',
    title: 'Punky AI',
    subtitle: 'On-chain AI Companionship',
    role: 'Fouding Member',
    description:
      'AI companionship should not be centralized or controlled by large corporations. Emotional connections deserve to be decentralized, and individuals should own their relationships with companion AIs.\n\nBased on this belief, we built Punky AI, an AI e-pet companionship system powered by Dynamic NFTs. By owning the NFT, users retain ownership of their emotional connection, ensuring that the relationship with their AI companion truly belongs to them.',
    cardType: 'normal',
    image: '/assets/punky.png',
    links: [],
  },
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add centralized project data"
```

---

### Task 6: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard/ProjectCard.jsx`
- Create: `src/components/ProjectCard/ProjectCard.module.css`

- [ ] **Step 1: Create src/components/ProjectCard/ProjectCard.jsx**

```jsx
import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

const cardTypeClass = {
  featured: styles.featured,
  'featured-secondary': styles.featuredSecondary,
  normal: styles.normal,
}

export default function ProjectCard({ id, title, subtitle, cardType, image }) {
  return (
    <Link
      to={`/projects/${id}`}
      className={`${styles.card} ${cardTypeClass[cardType] || styles.normal}`}
      style={{ '--hover-bg-image': `url(${image})` }}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardSubtitle}>{subtitle}</p>
    </Link>
  )
}
```

- [ ] **Step 2: Create src/components/ProjectCard/ProjectCard.module.css**

```css
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px;
  justify-content: flex-start;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--card-shadow);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--hover-bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 16px;
  z-index: 0;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--card-shadow-hover);
}

.card:hover::before {
  opacity: 1;
}

.cardTitle {
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.card:hover .cardTitle {
  transform: translateY(-2px);
}

.cardSubtitle {
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.card:hover .cardSubtitle {
  opacity: 0.9;
}

/* Card height variants */
.featured,
.featuredSecondary,
.normal {
  height: 260px;
}

@media (max-width: 768px) {
  .featured,
  .featuredSecondary,
  .normal {
    height: 220px;
    padding: 12px;
  }

  .cardTitle {
    font-size: 15px;
  }

  .cardSubtitle {
    font-size: 13px;
  }
}

@media (max-width: 520px) {
  .featured,
  .featuredSecondary,
  .normal {
    height: 200px;
    padding: 12px;
    border-radius: 12px;
  }

  .card::before {
    border-radius: 12px;
  }

  .cardTitle {
    font-size: 14px;
  }

  .cardSubtitle {
    font-size: 12px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add ProjectCard component"
```

---

### Task 7: useFullpageScroll Hook

**Files:**
- Create: `src/hooks/useFullpageScroll.js`

- [ ] **Step 1: Create src/hooks/useFullpageScroll.js**

```js
import { useState, useEffect, useRef, useCallback } from 'react'

export function useFullpageScroll(sectionCount) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimating = useRef(false)
  const wrapperRef = useRef(null)
  const sectionsRef = useRef([])
  const touchStartY = useRef(0)

  const goToSection = useCallback(
    (index) => {
      if (index < 0 || index >= sectionCount) return
      if (isAnimating.current) return
      isAnimating.current = true
      setCurrentIndex(index)
      setTimeout(() => {
        isAnimating.current = false
      }, 850)
    },
    [sectionCount]
  )

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (isAnimating.current) return

      const section = sectionsRef.current[currentIndex]
      if (section) {
        const scrollable = section.scrollHeight > section.clientHeight + 5

        if (scrollable) {
          const atTop = section.scrollTop <= 1
          const atBottom =
            Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight - 1

          if (e.deltaY > 0 && !atBottom) {
            section.scrollTop = Math.min(
              section.scrollTop + Math.abs(e.deltaY),
              section.scrollHeight - section.clientHeight
            )
            return
          }
          if (e.deltaY < 0 && !atTop) {
            section.scrollTop = Math.max(section.scrollTop + e.deltaY, 0)
            return
          }
        }
      }

      if (Math.abs(e.deltaY) < 30) return

      if (e.deltaY > 0) {
        goToSection(currentIndex + 1)
      } else {
        goToSection(currentIndex - 1)
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) < 50) return
      if (diff > 0) {
        goToSection(currentIndex + 1)
      } else {
        goToSection(currentIndex - 1)
      }
    }

    const handleKeyDown = (e) => {
      if (isAnimating.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goToSection(currentIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goToSection(currentIndex - 1)
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, goToSection])

  return { currentIndex, goToSection, wrapperRef, sectionsRef }
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add useFullpageScroll hook"
```

---

### Task 8: Home Page

**Files:**
- Create: `src/pages/Home/Home.jsx`
- Create: `src/pages/Home/Home.module.css`

- [ ] **Step 1: Create src/pages/Home/Home.jsx**

```jsx
import { useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useFullpageScroll } from '../../hooks/useFullpageScroll'
import Navbar from '../../components/Navbar/Navbar'
import WordCycle from '../../components/WordCycle/WordCycle'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'
import styles from './Home.module.css'

const featured = projects.filter((p) => p.cardType === 'featured' || p.cardType === 'featured-secondary')
const normal = projects.filter((p) => p.cardType === 'normal')

export default function Home() {
  const { theme, toggleTheme } = useTheme()
  const { currentIndex, goToSection, wrapperRef, sectionsRef } = useFullpageScroll(3)

  useEffect(() => {
    document.body.classList.add('fullpage')
    return () => document.body.classList.remove('fullpage')
  }, [])

  const setSectionRef = (index) => (el) => {
    sectionsRef.current[index] = el
  }

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        mode="home"
        activeSection={currentIndex}
        onNavClick={goToSection}
      />

      <div
        ref={wrapperRef}
        className={styles.sectionsWrapper}
        style={{ transform: `translate3d(0, -${currentIndex * 100}vh, 0)` }}
      >
        {/* About */}
        <div
          ref={setSectionRef(0)}
          className={`${styles.section} ${currentIndex === 0 ? styles.sectionActive : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.hero}>
              <h1 className={styles.heroTitle}>Weston Guo</h1>
              <p className={styles.heroSubtitle}>
                Founder &amp; Builder. I <WordCycle /> Cool Stuff.
              </p>
              <div className={styles.heroText}>
                Hi. I am Weston Guo, freshman at USC Iovine and Young Academy majoring in Art, Technology and Business of Innovation. I build digital products at the intersection of design, engineering, and emerging technologies. I'm particularly interested in web development, UI/UX design, and agent-based applications. Love connecting with cool people and building stuff people actually want.
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
            <h2 className={styles.projectTitle}>Things I've been building recently</h2>
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
            <div className={styles.connectTitle}>Let's connect</div>
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
          </div>
          <div className={styles.footerText}>&copy; 2026 Weston Guo. All rights reserved.</div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Create src/pages/Home/Home.module.css**

```css
.sectionsWrapper {
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}

.section {
  display: flex;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 0;
  position: relative;
  height: 100vh;
  min-height: unset;
  overflow-y: auto;
  overflow-x: hidden;
}

.section > * {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sectionActive > * {
  opacity: 1;
  transition: opacity 0.5s ease 0.25s;
}

.container {
  margin: 0 160px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.projectSectionContainer {
  flex-direction: column;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.heroTitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 44px;
  font-weight: 500;
  letter-spacing: -0.04em;
  margin: 0;
}

.heroSubtitle {
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.04em;
}

.heroText {
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  line-height: 1.5;
  letter-spacing: -0.04em;
}

/* Projects */
.projectTitle {
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.04em;
}

.cardGap {
  height: 16px;
}

.projectGridFeatured {
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 7fr 5fr;
}

.projectGridNormal {
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
}

/* Contact */
.contactSection {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.connectContainer {
  flex: 1;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
}

.connectTitle {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
}

.connectButton {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.connectLogo {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  flex-shrink: 0;
}

.connectLogo svg {
  width: 100%;
  height: 100%;
}

.connectText {
  font-size: 16px;
  font-weight: 300;
}

.footerText {
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  color: var(--text-secondary);
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
}

/* Responsive: tablet */
@media (max-width: 768px) {
  .container {
    margin: 0 24px;
  }

  .section {
    padding-top: 60px;
  }

  .hero {
    gap: 16px;
  }

  .heroTitle {
    font-size: 34px;
  }

  .heroSubtitle {
    font-size: 18px;
  }

  .heroText {
    font-size: 15px;
  }

  .projectGridFeatured {
    grid-template-columns: 1fr;
  }

  .projectGridNormal {
    grid-template-columns: repeat(2, 1fr);
  }

  .projectTitle {
    font-size: 18px;
  }

  .connectTitle {
    font-size: 18px;
  }

  .connectLogo {
    width: 28px;
    height: 28px;
  }

  .connectText {
    font-size: 15px;
  }

  .footerText {
    font-size: 13px;
  }
}

/* Responsive: mobile */
@media (max-width: 520px) {
  .container {
    margin: 0 16px;
  }

  .section {
    padding-top: 60px;
  }

  .hero {
    gap: 12px;
  }

  .heroTitle {
    font-size: 30px;
  }

  .heroSubtitle {
    font-size: 16px;
  }

  .heroText {
    font-size: 14px;
  }

  .projectGridFeatured {
    grid-template-columns: 1fr;
  }

  .projectGridNormal {
    grid-template-columns: 1fr;
  }

  .projectTitle {
    font-size: 16px;
  }

  .connectTitle {
    font-size: 16px;
  }

  .connectLogo {
    width: 24px;
    height: 24px;
  }

  .connectButton {
    gap: 12px;
  }

  .connectContainer {
    gap: 12px;
  }

  .connectText {
    font-size: 14px;
  }

  .footerText {
    font-size: 12px;
  }
}
```

- [ ] **Step 3: Verify Home page renders**

Update `src/App.jsx` temporarily:
```jsx
import Home from './pages/Home/Home'

export default function App() {
  return <Home />
}
```

Run `npm run dev`. Expected: Home page shows all 3 sections with fullpage scrolling, theme toggle, word cycle animation, project cards.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Home page with fullpage scroll"
```

---

### Task 9: ProjectDetail Page

**Files:**
- Create: `src/pages/ProjectDetail/ProjectDetail.jsx`
- Create: `src/pages/ProjectDetail/ProjectDetail.module.css`

- [ ] **Step 1: Create src/pages/ProjectDetail/ProjectDetail.jsx**

```jsx
import { useParams, Navigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
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

export default function ProjectDetail() {
  const { id } = useParams()
  const { theme, toggleTheme } = useTheme()
  const project = getProjectById(id)

  if (!project) return <Navigate to="/" replace />

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} mode="detail" />

      <div className={styles.page}>
        <div className={styles.section}>
          <div className={`${styles.container} ${styles.hero}`}>
            <div className={styles.heroTitleRow}>
              <h1 className={styles.heroTitle}>{project.title}</h1>
              <span className={styles.heroCaption}>{project.role}</span>
            </div>
            <h2 className={styles.heroSubtitle}>{project.subtitle}</h2>
            <div className={styles.heroText}>
              {project.description.split('\n\n').map((para, i) => (
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
              <div className={styles.linkTitle}>Links</div>
              {project.links.map((link) => {
                const Icon = iconMap[link.icon] || LinkIcon
                return (
                  <a key={link.url} href={link.url} className={styles.linkItem} target="_blank" rel="noopener noreferrer">
                    <div className={styles.linkItemLogo}>
                      <Icon />
                    </div>
                    <div className={styles.linkItemText}>{link.label}</div>
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
```

- [ ] **Step 2: Create src/pages/ProjectDetail/ProjectDetail.module.css**

```css
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;
}

.section {
  display: flex;
  align-items: center;
  position: relative;
}

.section + .section {
  padding-top: 24px;
}

.container {
  margin: 0 160px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.hero {
  flex-direction: column;
  gap: 20px;
}

.heroTitleRow {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.heroTitle {
  font-size: 36px;
  font-weight: 550;
  letter-spacing: -0.04em;
  margin: 0;
}

.heroCaption {
  font-size: 20px;
  font-weight: 400;
  color: var(--text-secondary);
  letter-spacing: -0.04em;
  margin: 0;
  flex-shrink: 0;
}

.heroSubtitle {
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.04em;
}

.heroText {
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  line-height: 1.5;
  letter-spacing: -0.04em;
}

/* Links section */
.linkContainer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-start;
  align-items: flex-start;
}

.linkTitle {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: var(--text-color);
  margin: 0 0 6px 0;
  line-height: 1.2;
}

.linkItem {
  position: relative;
  display: inline-flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.linkItemLogo {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  flex-shrink: 0;
}

.linkItemLogo svg {
  width: 100%;
  height: 100%;
}

.linkItemText {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.04em;
  color: var(--text-color);
  line-height: 1.2;
  position: relative;
}

.linkItemText::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: var(--text-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.linkItem:hover .linkItemText::after {
  transform: scaleX(1);
}

/* Canva-style link icon */
.linkIconCanva {
  background: #000;
  border-radius: 4px;
}

.linkIconCanva rect {
  fill: #000;
}

.linkIconCanva path {
  stroke: #fff;
}

[data-theme="dark"] .linkIconCanva {
  background: var(--text-color);
}

[data-theme="dark"] .linkIconCanva rect {
  fill: var(--text-color);
}

[data-theme="dark"] .linkIconCanva path {
  stroke: var(--bg-color);
}

/* Responsive: tablet */
@media (max-width: 768px) {
  .container {
    margin: 0 24px;
  }

  .hero {
    gap: 16px;
  }

  .heroTitleRow {
    gap: 12px;
  }

  .heroTitle {
    font-size: 28px;
  }

  .heroCaption {
    font-size: 18px;
  }

  .heroSubtitle {
    font-size: 18px;
  }

  .heroText {
    font-size: 15px;
  }
}

/* Responsive: mobile */
@media (max-width: 520px) {
  .container {
    margin: 0 16px;
  }

  .hero {
    gap: 12px;
  }

  .heroTitleRow {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .heroTitle {
    font-size: 24px;
  }

  .heroCaption {
    font-size: 16px;
  }

  .heroSubtitle {
    font-size: 16px;
  }

  .heroText {
    font-size: 14px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add ProjectDetail page"
```

---

### Task 10: App Routing and Final Assembly

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update src/App.jsx with routes**

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Add fullpage body style to global.css**

Append to `src/styles/global.css`:
```css
body.fullpage {
  overflow: hidden;
  height: 100%;
}
```

- [ ] **Step 3: Verify full app works**

Run `npm run dev`. Check:
- Home page loads with fullpage scroll working (wheel, keyboard, touch)
- Theme toggle works and persists across refresh
- WordCycle animation works on hover
- Project cards show hover image overlay
- Clicking a project card navigates to `/projects/:id`
- Project detail page shows correct data
- Back button returns to home
- All 3 responsive breakpoints work (resize browser)
- Dark mode works on all pages

- [ ] **Step 4: Build for production**

```bash
npm run build
npm run preview
```

Expected: Production build succeeds, preview server shows working site.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: complete React rewrite with routing"
```
