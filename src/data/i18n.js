export const i18n = {
  en: {
    name: 'Weston Guo',
    heroSubtitle: 'Founder & Builder. I {word} Cool Stuff.',
    heroText:
      "Hi. I am Weston Guo, freshman at USC Iovine and Young Academy majoring in Art, Technology and Business of Innovation. I build digital products at the intersection of design, engineering, and emerging technologies. I'm particularly interested in web development, UI/UX design, and agent-based applications. Love connecting with cool people and building stuff people actually want.",
    projectsTitle: "Things I've been building recently",
    connectTitle: "Let's connect",
    footer: '© 2026 Weston Guo. All rights reserved.',
    linksTitle: 'Links',
    nav: {
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      back: 'Back',
    },
  },
  zh: {
    name: '郭语石',
    heroSubtitle: 'Founder & Builder. I {word} Cool Stuff.',
    heroText:
      '你好，我是郭语石，USC Iovine and Young Academy 大一新生，主修 Art, Technology and Business of Innovation。我在设计、工程和新兴技术的交叉领域构建数字产品，对 Web 开发、UI/UX 设计和 Agent 应用尤其感兴趣。喜欢认识有意思的人，做人们真正想用的东西。',
    projectsTitle: '最近在做的一些事',
    connectTitle: '联系我',
    footer: '© 2026 郭语石 版权所有',
    linksTitle: '链接',
    nav: {
      about: '关于',
      projects: '项目',
      contact: '联系',
      back: '返回',
    },
  },
}

export function t(lang, key) {
  return i18n[lang]?.[key] ?? i18n.en[key] ?? key
}
