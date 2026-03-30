export const projects = [
  {
    id: 'modcraft',
    title: 'ModCraft',
    subtitle: 'Agent for Game Mod Creation',
    role: 'Co-Founder',
    description:
      'ModCraft turns natural language Minecraft mod ideas into fully playable game mods. Let everyone create their own mods in 5 minutes without coding.',
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
      "After participating in several hackathons, I started to think about why I can't host a hackathon by myself. In the final months of high school, my friends and I founded PivotHack, a two-day startup hackathon for youth aged 14\u201318 in China. The event brought together 28 participants from cities including Beijing, Shanghai, Sichuan, and Shandong, along with hundreds of audience members. PivotHack was supported by leading Chinese venture capital firms and accelerators such as ZhenFund, LanChi Fund, MiraclePlus (formerly Y Combinator China), and SparkLab. Today, PivotHack continues to support young builders in China by helping them host their own hackathons and turn early ideas into real projects, while collaborating with initiatives like the Keystone Hackathon and Spark_init Project, and supporting Hackathon Playbook of AdventureX",
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
    role: 'Founding Member',
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
