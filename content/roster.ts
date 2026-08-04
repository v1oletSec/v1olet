/**
 * Operator roster — the single file to edit when the team changes.
 *
 * Ported verbatim from the previous site's `data.js`; wording, quotes and
 * self-declared specialities are the members' own. Avatar paths point at the
 * pre-compressed WebP set in `public/avatars`; omit `avatar` entirely and the
 * card falls back to a generated initials tile.
 *
 * Order within a tier is preserved as authored.
 */
import type { Member } from './types';

export const roster: Member[] = [
  {
    name: "Existing!?!",
    role: "Captain",
    tier: "captain",
    specialty: "Web Exploitation",
    quote: "At every point of Existence, meaning lurks",
    description: "Captain. Web exploitation and misc specialist - captained the 3rd-place BroncoCTF run.",
    skills: ["web", "misc", "osint"],
    stats: [
      { label: "runs_led", value: "3" },
      { label: "best_finish", value: "3rd" },
      { label: "main_cat", value: "web" },
    ],
    avatar: "/avatars/existing.webp",
  },
  {
    name: "ctxzero",
    role: "Captain",
    tier: "captain",
    specialty: "Penetration Testing",
    quote: "Sky is the Limit",
    description: "Captain. Penetration testing and web exploitation.",
    skills: ["pentesting", "red teaming", "web", "pwn"],
    avatar: "/avatars/ctxzero.webp",
    links: {
      website: "https://www.ctxzero.dev/",
    },
  },
  {
    name: "ra1ncandy",
    role: "Co-captain",
    tier: "captain",
    specialty: "Generalist",
    quote: "A man who has not hit his Claude limit by noon has wasted his morning. -Socrates",
    description: "Core member. True all-rounder - equally comfortable across OSINT, web, reverse engineering, and misc challenges.",
    skills: ["osint", "web", "rev", "misc", "ai"],
    avatar: "/avatars/ra1ncandy.webp",
    links: {
      website: "https://ra1ncandy.tech/",
    },
  },
  {
    name: "ɘluЯɘ",
    role: "Co-captain",
    tier: "captain",
    specialty: "Forensics & Cryptography",
    quote: "Do I truly have free will?",
    description: "Co-captain. Forensics and cryptography specialist, also covering misc and blockchain challenges.",
    skills: ["forensics", "misc", "crypto", "blockchain"],
    avatar: "/avatars/lu.webp",
  },
  {
    name: "overtsleeping",
    role: "Core Member",
    tier: "core",
    specialty: "OSINT",
    quote: "1 larping minion against the world",
    description: "Core member. OSINT specialist with highly effective team-working skills.",
    skills: ["osint"],
    avatar: "/avatars/overtsleeping.webp",
    links: {
      github: "https://github.com/justina1387/",
      website: "https://overtsleeping.com/",
    },
  },
  {
    name: "saretawa",
    role: "Core Member",
    tier: "core",
    specialty: "Offensive Security",
    description: "Core member. Offensive specialist spanning reverse engineering, binary exploitation, and red team operations - breaks things others can't.",
    skills: ["pwn", "rev", "red teaming", "pentesting"],
    avatar: "/avatars/saretawa.webp",
    links: {
      github: "https://github.com/saretawa",
    },
  },
  {
    name: "lanky",
    role: "Core Member",
    tier: "core",
    specialty: "Full-stack Security",
    quote: "Only with a small number of Aussie you can take over the world lol",
    description: "Core member. Full-stack breaker across pentesting, web exploitation, and reverse engineering - also the one who actually explains it to the rest of us.",
    skills: ["pentesting", "web", "rev", "red teaming", "teaching"],
    avatar: "/avatars/lanky.webp",
  },
  {
    name: "ntxmr",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    description: "Core member. Binary exploitation and web specialist with strong reverse engineering fundamentals, active across red team ops.",
    skills: ["pwn", "web", "rev", "red teaming", "pentesting"],
    avatar: "/avatars/ntxmr.webp",
  },
  {
    name: "cyul",
    role: "Core Member",
    tier: "core",
    specialty: "OSINT",
    quote: "I bring together pieces to create a story",
    description: "Core member. Dedicated OSINT specialist - digs up what everyone else misses.",
    skills: ["osint", "web", "misc"],
    avatar: "/avatars/cyul.webp",
  },
  {
    name: "holysith",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    description: "Core member. Versatile across OSINT, reverse engineering, web, and misc categories.",
    skills: ["osint", "rev", "web", "misc"],
    avatar: "/avatars/holysith.webp",
  },
  {
    name: "ZeroG",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    description: "Core member. Covers misc, OSINT, web, and reverse engineering.",
    skills: ["misc", "osint", "web", "rev"],
    avatar: "/avatars/zerog.webp",
    links: {
      website: "https://zerog5.tech/",
    },
  },
  {
    name: "s45ha0",
    role: "Core Member",
    tier: "core",
    specialty: "Web & OSINT",
    description: "Core member. Web exploitation and OSINT.",
    skills: ["web", "osint"],
    avatar: "/avatars/s45ha0.webp",
  },
  {
    name: "d4ytox",
    role: "Core Member",
    tier: "core",
    specialty: "Binary Exploitation",
    quote: "as above, so below",
    description: "Core member. Binary exploitation and reverse engineering.",
    skills: ["pwn", "rev"],
    avatar: "/avatars/d4ytox.webp",
  },
  {
    name: "Sleep",
    role: "Core Member",
    tier: "core",
    specialty: "OSINT & Forensics",
    description: "Core member. OSINT and forensics specialist.",
    skills: ["osint", "forensics"],
    avatar: "/avatars/sleep.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/laykyaw-tun/",
    },
  },
  {
    name: "LYSSEC",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    quote: "Out of control geek and self-proclaimed engineer",
    description: "Core member. Generalist across web, reverse engineering, pentesting, and misc.",
    skills: ["web", "rev", "pentesting", "misc"],
    avatar: "/avatars/lyssec.webp",
    links: {
      github: "https://github.com/thomas-lysens",
    },
  },
  {
    name: "crashstack",
    role: "Core Member",
    tier: "core",
    specialty: "Offensive Security",
    description: "Core member. Web exploitation, pentesting, red team operations, and binary exploitation.",
    skills: ["web", "pentesting", "red teaming", "pwn"],
    avatar: "/avatars/crashstack.webp",
  },
  {
    name: "0xTr0j4n",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    quote: "If you can't convince them, confuse them",
    description: "Core member. Red team operations and AI, plus web, OSINT, misc, and reverse engineering.",
    skills: ["red teaming", "ai", "web", "osint", "misc", "rev"],
    avatar: "/avatars/0xtr0j4n.webp",
    links: {
      github: "https://github.com/Tr0j4n1",
      website: "https://tr0j4n.tech/",
    },
  },
  {
    name: "KeyboardCat",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    quote: "I'm just here collecting skills until freedom becomes affordable.",
    description: "Core member. Generalist across web, reverse engineering, OSINT, and misc.",
    skills: ["web", "rev", "osint", "misc"],
    avatar: "/avatars/keyboardcat.webp",
  },
  {
    name: "champofall",
    role: "Core Member",
    tier: "core",
    specialty: "Generalist",
    description: "Core member. Red team operations, pentesting, and misc.",
    skills: ["red teaming", "pentesting", "misc"],
    avatar: "/avatars/champofall.webp",
    links: {
      github: "https://github.com/champOfAll",
    },
  },
  {
    name: "0x00KNULL",
    role: "Core Member",
    tier: "core",
    specialty: "Offensive Security",
    description: "Core member. Red team operations, pentesting, and binary exploitation.",
    skills: ["red teaming", "pentesting", "pwn"],
    avatar: "/avatars/0x00knull.webp",
  },
  {
    name: "Avalkyire",
    role: "Team Member",
    tier: "member",
    specialty: "Web & Crypto",
    quote: "With great curiosity comes great rabbit holes",
    description: "Team member. Web exploitation, misc, and cryptography.",
    skills: ["web", "misc", "crypto"],
    avatar: "/avatars/avalkyire.webp",
  },
  {
    name: "NesHuw",
    role: "Team Member",
    tier: "member",
    specialty: "Pentesting & Crypto",
    quote: "Keeping consistency everyday to learn a lot",
    description: "Team member. Pentesting and cryptography.",
    skills: ["pentesting", "crypto"],
    avatar: "/avatars/neshuw.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/florian-valentin1/",
    },
  },
  {
    name: "ff",
    role: "Team Member",
    tier: "member",
    specialty: "Cloud & Offensive Sec",
    quote: "The way to get started is to quit talking and begin doing",
    description: "Team member. Cloud security, binary exploitation, pentesting, and forensics.",
    skills: ["cloud", "pwn", "pentesting", "forensics"],
    avatar: "/avatars/ff.webp",
  },
  {
    name: "Damian",
    role: "Team Member",
    tier: "member",
    specialty: "Forensics & OSINT",
    description: "Team member. Forensics and OSINT.",
    skills: ["forensics", "osint"],
    links: {
      github: "https://github.com/Asmit12357",
    },
  },
  {
    name: "h1gkpo",
    role: "Team Member",
    tier: "member",
    specialty: "Cryptography",
    description: "Team member. Cryptography specialist.",
    skills: ["crypto"],
    avatar: "/avatars/h1gkpo.webp",
    links: {
      github: "https://github.com/0xh9ctw",
    },
  },
  {
    name: "tissec",
    role: "Team Member",
    tier: "member",
    specialty: "Web & Red Teaming",
    description: "Team member. Web exploitation, red team operations, and OSINT.",
    skills: ["web", "red teaming", "osint"],
    avatar: "/avatars/tissec.webp",
    links: {
      github: "https://github.com/t1ssec",
    },
  },
  {
    name: "YooHoo",
    role: "Team Member",
    tier: "member",
    specialty: "Web & AI",
    quote: "-72.011978, 2.534425",
    description: "Team member. Web exploitation and AI.",
    skills: ["web", "ai"],
    avatar: "/avatars/yoohoo.webp",
  },
  {
    name: "Shedo",
    role: "Team Member",
    tier: "member",
    specialty: "Crypto & Quantum",
    description: "Team member. Cryptography and quantum.",
    skills: ["crypto", "quantum"],
    avatar: "/avatars/shedo.webp",
    links: {
      github: "https://github.com/Shivansh0x/",
    },
  },
  {
    name: "Craftee",
    role: "Team Member",
    roleTag: "QA Engineer",
    tier: "member",
    specialty: "Generalist",
    description: "Team member and QA engineer. Forensics, OSINT, reverse engineering, and cryptography.",
    skills: ["forensics", "osint", "rev", "crypto"],
    avatar: "/avatars/craftee.webp",
    links: {
      github: "https://github.com/craftepxly",
    },
  },
  {
    name: "pibbler",
    role: "Team Member",
    tier: "member",
    specialty: "Web & Reverse Eng",
    description: "Team member. Web exploitation and reverse engineering.",
    skills: ["web", "rev"],
    avatar: "/avatars/pibbler.webp",
  },
];


/** Roster grouped by tier, in display order. */
export const byTier = {
  captain: roster.filter((m) => m.tier === 'captain'),
  core: roster.filter((m) => m.tier === 'core'),
  member: roster.filter((m) => m.tier === 'member'),
} as const;

/** Every discipline present on the roster, sorted by how many operators claim it. */
export const disciplines = Object.entries(
  roster.reduce<Record<string, number>>((acc, m) => {
    for (const s of m.skills) acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {}),
)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, count }));
