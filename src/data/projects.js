export const projects = [
  {
    id: 'foundagent',
    title: 'Foundagent',
    subtitle: 'Agents as Founders',
    role: 'Founder',
    date: 'Mar 2026 – Present',
    description:
      'At Foundagent, we believe that in the future world, agents will become founders building and shipping actual products and services. Agents will autonomously discover needs, build products, ship and sell, and generate returns for people. We have incubated our first batch of AI founders, stay tuned.',
    cardType: 'featured',
    image: '/assets/hackerhouse.webp',
    overlay: '/assets/foundagent-wordmark.svg',
    links: [
      { label: 'Foundagent Website', url: 'https://foundagent.net', icon: 'link' },
    ],
  },
  {
    id: 'modcraft',
    title: 'ModCraft',
    subtitle: 'Agent for Game Mod Creation',
    role: 'Co-Founder',
    date: 'Dec 2025 – Apr 2026',
    description:
      'ModCraft is an agentic no-code IDE for Minecraft mod creation, allowing users to turn natural language mod ideas into playable mods, creating a Minecraft mod in five minutes without any coding experience.',
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
    date: 'Feb 2025 – Jun 2025',
    description:
      "After participating in several hackathons, I started to think about why I can't host a hackathon by myself. In the final months of high school, my friends and I founded PivotHack, a two-day startup hackathon for youth aged 14–18 in China. The event brought together 28 participants from cities including Beijing, Shanghai, Sichuan, and Shandong, along with hundreds of audience members. PivotHack was supported by leading Chinese venture capital firms and accelerators such as ZhenFund, LanChi Fund, MiraclePlus (formerly Y Combinator China), and SparkLab. Today, PivotHack continues to support young builders in China by helping them host their own hackathons and turn early ideas into real projects, while collaborating with initiatives like the Keystone Hackathon and Spark_init Project, and supporting Hackathon Playbook of AdventureX",
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
    role: 'Product Manager & UI Designer',
    description:
      "Have you ever watched educational content on YouTube or Bilibili, only to realize the next day that you've forgotten almost everything? Passive video consumption is an extremely inefficient way to learn. SigmaHub is built to change that.\n\nSigmaHub is an AI-powered learning companion that turns video watching into active learning. By automatically generating questions, summaries, and keyword clouds, SigmaHub helps learners engage with content more deeply and significantly improves knowledge retention — making video learning up to ten times more effective.",
    cardType: 'normal',
    archived: true,
    image: '/assets/sigmahub.png',
    links: [],
  },
  {
    id: 'barshelpbars',
    title: 'BarsHelpBars',
    subtitle: 'On-chain RWA cocktail recipe marketplace',
    role: 'Product Manager & ETH Developer',
    description:
      'Bar hopping has always been my way of understanding flavor, culture, and creativity. At a hackathon, I explored how blockchain could enable new forms of creative ownership and sharing, which led me to build BarsHelpBars—a platform that lets world-class bars lease their signature cocktail recipes on-chain via ERC-4907 and ERC-6551, bringing exceptional flavors from global destinations to local neighborhood bars.',
    cardType: 'normal',
    archived: true,
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
    role: 'Founding Member',
    description:
      'AI companionship should not be centralized or controlled by large corporations. Emotional connections deserve to be decentralized, and individuals should own their relationships with companion AIs.\n\nBased on this belief, we built Punky AI, an AI e-pet companionship system powered by Dynamic NFTs. By owning the NFT, users retain ownership of their emotional connection, ensuring that the relationship with their AI companion truly belongs to them.',
    cardType: 'normal',
    archived: true,
    image: '/assets/punky.png',
    links: [],
  },
  {
    id: 'claudewechat',
    title: 'ClaudeWechat',
    subtitle: 'Claude plugins that help you operate WeChat automatically',
    role: 'Creator',
    description:
      'After Claude Code released the Computer Use MCP, I discovered that Claude could autonomously operate WeChat to send messages to others. However, the efficiency was low and it was prone to errors.\n\nTo address this, I wrote a simple skill that helps Claude understand the WeChat layout faster and operate the desktop app more reliably.',
    cardType: 'normal',
    archived: true,
    links: [
      { label: 'ClaudeWechat Github Repo', url: 'https://github.com/west0nG/ClaudeWechat', icon: 'github' },
    ],
  },
  {
    id: 'claudebrightspace',
    title: 'ClaudeBrightspace',
    subtitle: 'Claude plugins that help USC students operate Brightspace',
    role: 'Creator',
    description:
      "USC uses Brightspace as its learning management system, but the system feels dated. It has many usability issues and poorly designed UI elements. Interacting with it—whether to submit assignments, download files, or check requirements—takes a significant amount of time.\n\nTo solve this, I built a Claude skill that automatically accesses the context within Brightspace to download assignments, submit completed work, and manage related course tasks. It has saved me a lot of time and is now widely used by my classmates.",
    cardType: 'normal',
    archived: true,
    links: [
      { label: 'ClaudeBrightspace Github Repo', url: 'https://github.com/west0nG/ClaudeBrightspace', icon: 'github' },
    ],
  },
  {
    id: 'invisaid',
    title: 'InvisAId',
    subtitle: 'Learning Management System for ADHD students',
    role: 'Product Manager',
    description:
      "We built this project during a hackathon focused on AI + education. We discovered that many elementary and middle school students with learning challenges—often related to ADHD or dyslexia—face social exclusion and struggle to learn effectively.\n\nTo address this, we built a learning management system that helps teachers diagnose these students' needs and create tailored learning materials for them.",
    cardType: 'normal',
    archived: true,
    links: [
      { label: 'InvisAId Deck', url: 'https://canva.link/dw28bjfrnotqoj9', icon: 'link' },
    ],
  },
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}
