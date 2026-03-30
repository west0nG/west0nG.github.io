export const i18n = {
  en: {
    name: 'Weston Guo',
    heroSubtitle: 'Founder & Builder. I {word} Cool Stuff.',
    heroText:
      "Hi. I am Weston Guo, freshman at USC Iovine and Young Academy majoring in Art, Technology and Business of Innovation. I build digital products at the intersection of design, engineering, and emerging technologies. I'm particularly interested in web development, UI/UX design, and agent-based applications. Love connecting with cool people and building stuff people actually want.",
    projectsTitle: "Things I've been building recently",
    connectTitle: "Let's connect",
    linksTitle: 'Links',
    footer: '© 2026 Weston Guo. All rights reserved.',
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
      '你好，我是郭语石Weston，今年19，来自北京，现在在USC Iovine and Young Academy读大一。初中考过中考状元，高中自己办过黑客松，跌跌撞撞做了几个项目，现在在创业中。我相信自己，相信真诚，相信预测未来的最好方式就是自己建构它，相信学习最好的方式就是Build it, Ship it, and Pivot it. 我喜欢认识有趣的人，所以如果你看到这里，来聊聊吧！',
    projectsTitle: '我的作品',
    connectTitle: '来聊聊吧',
    footer: '© 2026 Weston Guo 版权所有',
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
