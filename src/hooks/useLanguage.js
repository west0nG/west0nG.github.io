import { useState, useEffect } from 'react'

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    if (saved) return saved
    return navigator.language.startsWith('zh') ? 'zh' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'zh' : 'en'))

  return { lang, toggleLang }
}
