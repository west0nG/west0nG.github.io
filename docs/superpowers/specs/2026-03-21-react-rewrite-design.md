# React Rewrite Design Spec

## Overview

Rewrite the existing static HTML/CSS/JS personal website into a React SPA, preserving all visual design and interactions while improving code organization.

## Decisions

| Decision | Choice |
|----------|--------|
| Framework | Vite + React |
| Routing | React Router (client-side) |
| Styling | CSS Modules (per-component) |
| Visual fidelity | 1:1 replica with cleanup (remove `debug` classes, organize CSS) |

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Fullpage scroll: About, Projects, Contact sections |
| `/projects/:id` | ProjectDetail | Data-driven project detail page |

## Project Structure

```
src/
├── components/
│   ├── Navbar/          (Navbar.jsx + Navbar.module.css)
│   ├── ProjectCard/     (ProjectCard.jsx + ProjectCard.module.css)
│   ├── WordCycle/       (WordCycle.jsx + WordCycle.module.css)
│   └── ThemeToggle/     (ThemeToggle.jsx + ThemeToggle.module.css)
├── pages/
│   ├── Home/            (Home.jsx + Home.module.css)
│   └── ProjectDetail/   (ProjectDetail.jsx + ProjectDetail.module.css)
├── hooks/
│   ├── useFullpageScroll.js
│   └── useTheme.js
├── data/
│   └── projects.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
public/
└── assets/              (5 project thumbnail PNGs)
```

## Data Layer

`src/data/projects.js` — centralized project data array:

```js
{
  id: "modcraft",           // URL slug, used in route params
  title: "ModCraft",
  subtitle: "Agent for Game Mod Creation",
  role: "Co-Founder",
  description: "...",
  cardType: "featured",     // "featured" | "featured-secondary" | "normal"
  image: "/assets/modcraft.png",
  links: [
    { label: "ModCraft Website", url: "https://modcraft.dev", icon: "link" }
  ]
}
```

ProjectDetail page looks up project by `id` from route params.

## Components

### Navbar
- Fixed top navigation
- On Home: About / Projects / Contact links (scroll to section)
- On ProjectDetail: Back link (navigate to `/` with projects section)
- Contains ThemeToggle

### ThemeToggle
- Reads/writes `localStorage` for theme persistence
- Sets `data-theme` attribute on `<html>` element
- Sun/moon SVG icon toggle

### WordCycle
- Hover-triggered word cycling animation: Ship → Build → Fix → Explore
- `useState` for current word index, `useEffect` + `setInterval` for cycling
- CSS transition for fade effect

### ProjectCard
- Accepts `cardType` prop to determine styling variant
- Hover effect: background image overlay via CSS `::before` pseudo-element
- Links to `/projects/:id` via React Router `<Link>`

### Home Page
- Three full-viewport sections: About, Projects, Contact
- Uses `useFullpageScroll` hook for scroll management

### ProjectDetail Page
- Looks up project by route param `id` from `projects.js`
- Renders title, role, subtitle, description, and links
- Reuses Navbar with Back button mode

## Hooks

### useTheme
- Initialize from `localStorage` → system preference → `'light'`
- Returns `{ theme, toggleTheme }`
- Side effect: sets `data-theme` on `document.documentElement`

### useFullpageScroll
- Manages `currentIndex` state for active section
- Attaches wheel, touch, keyboard event listeners
- Handles scroll-within-section (when section content overflows)
- Animation lock (850ms duration) to prevent rapid scrolling
- Returns `{ currentIndex, goToSection }`

## Styles

### global.css
- CSS custom properties (light/dark themes)
- `data-theme="dark"` variable overrides
- Font imports (Inter, Cormorant Garamond)
- Box-sizing reset
- Body/fullpage base styles

### CSS Modules
- Each component gets its own `.module.css`
- Migrate relevant styles from current `styles.css`
- Remove all `debug` classes
- Responsive breakpoints: 768px (tablet), 520px (mobile)

## Migration Notes

- All SVG icons (LinkedIn, Email, GitHub, link icons) inline in JSX
- Project images moved from `assets/` to `public/assets/`
- CSS `--hover-bg-image` custom property pattern preserved for card hover effect
- Fullpage scroll `translate3d` transform approach preserved
- Contact section social links: LinkedIn, Email, GitHub (same URLs)
