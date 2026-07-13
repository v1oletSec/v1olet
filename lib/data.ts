export const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd0l4kjsPxN7lzfKOXFsSTHx2Mbnhv1ljreudoGuLOdK0TW3A/viewform'

export type Service = {
  icon: string
  title: string
  description: string
  details: string[]
}

export const services: Service[] = [
  {
    icon: '>_',
    title: 'Penetration Testing',
    description:
      'Web, API and infrastructure assessments with actionable, developer-ready reporting.',
    details: ['Web & API testing', 'Network & infra', 'Remediation guidance'],
  },
  {
    icon: '[!]',
    title: 'Red Team Operations',
    description:
      'Adversary simulation that tests detection and response, not just perimeter defences.',
    details: ['Full-scope simulation', 'Detection testing', 'Purple-team debriefs'],
  },
  {
    icon: '{0}',
    title: 'Vulnerability Research',
    description:
      'Deep-dive research into software and protocols to find what scanners never will.',
    details: ['0-day discovery', 'Reverse engineering', 'Responsible disclosure'],
  },
  {
    icon: '≡≡',
    title: 'Training & Workshops',
    description:
      'Hands-on security training built from real engagements and CTF experience.',
    details: ['CTF-style labs', 'Custom curricula', 'Team upskilling'],
  },
  {
    icon: '∞',
    title: 'PTaaS Engagements',
    description:
      'Continuous penetration testing as a service — ongoing coverage, not annual snapshots.',
    details: ['Continuous coverage', 'Live findings feed', 'Retest on demand'],
  },
]

export type CompEvent = {
  name: string
  url: string
  date: string
  teams?: string
  captain: string
  rank: string
  top?: boolean
  badge?: string
}

export const events: CompEvent[] = [
  { name: 'BroncoCTF', url: 'https://broncoctf.ctfd.io/teams/378', date: '11 Jul 2026', teams: '500 teams', captain: 'existin', rank: '3rd', top: true },
  { name: 'No Hack No CTF 2026', url: 'https://ctftime.org/event/3180', date: '4–6 Jul 2026', teams: '844 teams', captain: 'Existing!?! & 0xPrime', rank: '126th' },
  { name: 'R3CTF 2026', url: 'https://ctftime.org/event/3149', date: '4–6 Jul 2026', teams: '917 teams', captain: 'Existing!?! & 0xPrime', rank: '159th' },
  { name: 'V1T CTF 2026', url: 'https://ctftime.org/event/3249', date: '27–28 Jun 2026', teams: '952 teams', captain: '0xPrime & e1', rank: '112th' },
  { name: 'RiffHack 2026', url: 'https://ctftime.org/event/3297/', date: '19–22 Jun 2026', teams: '514 teams', captain: '0xPrime', rank: '103rd' },
  { name: 'Operation Heist CTF 2026', url: 'https://ctftime.org/event/3327', date: '13–14 Jun 2026', captain: 'e1', rank: '17th', top: true },
  { name: 'GPN CTF 2026', url: 'https://ctftime.org/event/3041', date: '5–6 Jun 2026', teams: '1138 teams', captain: '0xPrime', rank: '73rd' },
  { name: 'THEM?!CTF 2026', url: 'https://ctftime.org/event/3209', date: '29–31 May 2026', teams: '920 teams', captain: '0xPrime', rank: '28th', top: true },
  { name: 'DEF CON CTF Qualifier 2026', url: 'https://ctftime.org/event/3205', date: '22–25 May 2026', teams: '686 teams', captain: '0xPrime', rank: '255th' },
  { name: '0xfun CTF 2026', url: 'https://ctftime.org/event/3081', date: '12–14 Feb 2026', teams: '1351 teams', captain: 'e1', rank: '297th' },
  { name: 'Guardians Qualifications 2026', url: 'https://www.guardians.sk/guardians2026/', date: '19 Jan – 1 Feb 2026', teams: '130 teams', captain: 'e1', rank: '22nd', top: true, badge: 'BLUE TEAM DEFENCE' },
]

export type Member = {
  name: string
  role: string
  tier: 'captain' | 'core'
  specialty: string
  quote: string
  description: string
  skills: string[]
  /** Optional profile image URL. When set, it replaces the initials avatar. */
  avatar?: string
  stats?: { label: string; value: string }[]
  links?: { linkedin?: string; github?: string; website?: string }
}

export const roster: Member[] = [
  {
    name: 'Existing!?!',
    role: 'Captain',
    tier: 'captain',
    specialty: 'Web Exploitation',
    quote: 'At every point of Existence, meaning lurks',
    description:
      'Captain. Web exploitation and misc specialist — captained the 3rd-place BroncoCTF run.',
    skills: ['web', 'misc', 'osint'],
    stats: [
      { label: 'runs_led', value: '3' },
      { label: 'best_finish', value: '3rd' },
      { label: 'main_cat', value: 'web' },
    ],
    avatar: 'https://cdn.discordapp.com/avatars/1416387352296816712/4d0f84dfbe6e07f4d51a97b25d24518c.png?size=4096',
  },
  {
    name: 'ctxzero',
    role: 'Co-captain',
    tier: 'captain',
    specialty: 'Penetration Testing',
    quote: 'Break it on the range so nobody breaks it in the wild.',
    description: 'Core member. Penetration testing and web exploitation.',
    skills: ['pentesting', 'red teaming', 'web'],
    links: {
      linkedin: 'https://www.linkedin.com/in/luisschlegel-cs/',
      github: 'https://github.com/ctxzero',
      website: 'https://www.ctxzero.dev/',
    },
    avatar: 'https://cdn.discordapp.com/avatars/1388478712265052190/4496942638751d2f643e73ca698d7f3d.png?size=4096'
  },
  {
    name: 'justina',
    role: 'Core Member',
    tier: 'core',
    specialty: 'OSINT',
    quote: '',
    description: 'Core member. OSINT specialist with highly effective team-working skills.',
    skills: ['osint'],
    avatar: 'https://cdn.discordapp.com/avatars/978402387125497916/a_39b502d40d302aff8b6a3e53237516eb.gif?size=4096',
  },
  {
    name: 'saretawa',
    role: 'Core Member',
    tier: 'core',
    specialty: 'Offensive Security',
    quote: '',
    description: 'Core member. Offensive specialist spanning reverse engineering, binary exploitation, and red team operations — breaks things others can\'t.',
    skills: ['pwn', 'rev', 'red teaming', 'pentesting'],
    avatar: 'https://cdn.discordapp.com/avatars/709091386925776948/936b482be50dfc9af61874e8fb8141bd.png?size=4096',
  },
  {
    name: 'lanky',
    role: 'Core Member',
    tier: 'core',
    specialty: 'Full-stack Security',
    quote: 'Only with a small number of Aussie you can take over the world lol',
    description: 'Core member. Full-stack breaker across pentesting, web exploitation, and reverse engineering — also the one who actually explains it to the rest of us.',
    skills: ['pentesting', 'web', 'rev', 'red teaming', 'teaching'],
    avatar: 'https://cdn.discordapp.com/avatars/265331802665779218/dfa91b9e73984bf5a831761689c8c086.png?size=4096',
  },
  {
    name: 'ntxmr',
    role: 'Core Member',
    tier: 'core',
    specialty: 'Generalist',
    quote: '',
    description: 'Core member. Binary exploitation and web specialist with strong reverse engineering fundamentals, active across red team ops.',
    skills: ['pwn', 'web', 'rev', 'red teaming', 'pentesting'],
    avatar: 'https://cdn.discordapp.com/avatars/1454941675804692589/8e0b949a28ec27bf187aa0987a8228b6.png?size=4096',
  },
  {
    name: 'cyul',
    role: 'Core Member',
    tier: 'core',
    specialty: 'OSINT',
    quote: 'I bring together pieces to create a story',
    description: 'Core member. Dedicated OSINT specialist — digs up what everyone else misses.',
    skills: ['osint', 'web', 'misc'],
    avatar: 'https://cdn.discordapp.com/avatars/835369328425304074/99328fc8b0b934354f9216e53b275789.png?size=4096',
  },
  {
    name: 'badkarma2764',
    role: 'Core Member',
    tier: 'core',
    specialty: 'OSINT & Misc',
    quote: '',
    description: 'Core member. OSINT and misc player who also brings web exploitation and reverse engineering to the table.',
    skills: ['osint', 'misc', 'web', 'rev'],
    avatar: 'https://cdn.discordapp.com/avatars/836483549518495794/1bd72ccf50b9da54f51f58f5deaf96bc.png?size=4096',
  },
  {
    name: 'ame',
    role: 'Co-captain',
    tier: 'captain',
    specialty: 'Generalist',
    quote: '',
    description: 'Core member. True all-rounder — equally comfortable across OSINT, web, reverse engineering, and misc challenges.',
    skills: ['osint', 'web', 'rev', 'misc'],
    avatar: 'https://cdn.discordapp.com/avatars/1034832245103530044/ab2b8451cd4bef63949486733f7c426a.png?size=4096',
  },
  {
    name: 'holysith',
    role: 'Core Member',
    tier: 'core',
    specialty: 'Generalist',
    quote: '',
    description: 'Core member. Versatile across OSINT, reverse engineering, web, and misc categories.',
    skills: ['osint', 'rev', 'web', 'misc'],
    avatar: 'https://cdn.discordapp.com/avatars/191489505038041089/cdcfcdc7ff1a9a1299bc64e7c8b67c23.png?size=4096',
  },
  {
    name: 'n3thacker',
    role: 'Core Member',
    tier: 'core',
    specialty: 'Misc/OSINT/Web',
    quote: '',
    description: 'Core member. Misc, OSINT, and web specialist.',
    skills: ['misc', 'osint', 'web'],
    avatar: 'https://cdn.discordapp.com/avatars/1338950792559722496/05595271f2d82b47b5c38201064defbe.png?size=4096',
  },
  {
    name: 'ZeroG',
    role: 'Core Member',
    tier: 'core',
    specialty: 'Generalist',
    quote: '',
    description: 'Core member. Covers misc, OSINT, web, and reverse engineering.',
    skills: ['misc', 'osint', 'web', 'rev'],
    avatar: 'https://cdn.discordapp.com/avatars/1298721482259562526/c70c511eefa0c14a46264e8fe933b4fd.png?size=4096',
  },
]