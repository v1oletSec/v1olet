/**
 * Competition ledger — newest first.
 *
 * Ported verbatim from the previous site's `data.js`. Placements are as
 * published by the organisers and every entry links to its source, so the
 * record stays independently verifiable; the CTFtime profile is the index.
 *
 * NOTE: the previous site's hero counter claimed "11 competitions in 2026"
 * while this list holds 6. Counters on the new site are derived from this
 * array, so they cannot drift again — add the missing events here to raise
 * the number.
 */
import type { CtfEvent } from './types';

export const events: CtfEvent[] = [
  {
    name: "HTB Cyber Apocalypse 2026",
    url: "https://ctf.hackthebox.com/event/details/cyber-apocalypse-ctf-2026-the-salt-crown-3432",
    date: "24–29 Jul 2026",
    teams: "7000+ teams",
    rank: "28th",
    top: true,
  },
  {
    name: "OmniCTF 2026 Qualifier",
    url: "https://ctftime.org/event/3104/",
    date: "17–19 Jul 2026",
    teams: "1k+ teams",
    rank: "4th",
    top: true,
    badge: "AVERAGE PLACE",
  },
  {
    name: "BroncoCTF",
    url: "https://broncoctf.ctfd.io/teams/378",
    date: "11 Jul 2026",
    teams: "731 teams",
    captain: "existin",
    rank: "3rd",
    top: true,
  },
  {
    name: "Operation Heist CTF 2026",
    url: "https://ctftime.org/event/3327",
    date: "13–14 Jun 2026",
    captain: "e1",
    rank: "17th",
    top: true,
  },
  {
    name: "THEM?!CTF 2026",
    url: "https://ctftime.org/event/3209",
    date: "29–31 May 2026",
    teams: "920 teams",
    captain: "0xPrime",
    rank: "28th",
    top: true,
  },
  {
    name: "Guardians Qualifications 2026",
    url: "https://www.guardians.sk/guardians2026/",
    date: "19 Jan – 1 Feb 2026",
    teams: "130 teams",
    captain: "e1",
    rank: "22nd",
    top: true,
    badge: "BLUE TEAM DEFENCE",
  },
];

/** Placement parsed to an integer, for podium styling and sorting. */
export const rankValue = (rank: string): number => Number.parseInt(rank, 10) || Number.MAX_SAFE_INTEGER;

/** Largest field the team has competed in, parsed from the published team counts. */
export const largestField = Math.max(
  ...events.map((e) => Number.parseInt((e.teams ?? '0').replace(/[^0-9]/g, ''), 10) || 0),
);

/** Best (numerically lowest) placement on record. */
export const bestPlacement = events.reduce(
  (best, e) => (rankValue(e.rank) < rankValue(best.rank) ? e : best),
  events[0],
);

/** Total competitions recorded in this ledger. */
export const competitionCount = events.length;
