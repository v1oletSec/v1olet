import { roster, events } from './data.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = id => document.getElementById(id);

/* ------------------------------------------------------------ capabilities */
const CAPABILITIES = [
  {
    icon: '<path d="M4 6h16M4 12h16M4 18h10"/><circle cx="18.5" cy="18" r="2.5"/><path d="m20.4 19.9 1.6 1.6"/>',
    title: 'Penetration testing',
    body: 'Web applications, APIs, and infrastructure. Every finding arrives reproducible, with a working proof of concept and remediation your developers can act on.',
    out: 'Findings report · retest'
  },
  {
    icon: '<path d="M12 3 4 6.5v5.2c0 4.6 3.2 8.4 8 9.3 4.8-.9 8-4.7 8-9.3V6.5z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    title: 'Red team operations',
    body: 'Adversary simulation that measures whether you detect and respond, not just whether the perimeter holds on the day of the test.',
    out: 'Attack narrative · detection gaps'
  },
  {
    icon: '<path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5V9"/><path d="M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9"/><path d="M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15"/><path d="M15 20h3.5a1.5 1.5 0 0 0 1.5-1.5V15"/><path d="M8.5 12h7M12 8.5v7"/>',
    title: 'Vulnerability research',
    body: 'Deep review of software and protocols, down to the primitives, to surface the bug classes an automated scanner has no way to model.',
    out: 'Advisory · coordinated disclosure'
  },
  {
    icon: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/><path d="M12 7.5V12l3 1.8"/>',
    title: 'Continuous testing',
    body: 'Testing that runs alongside your release cycle instead of once a year, so findings land while the code is still fresh in someone\u2019s head.',
    out: 'Rolling findings queue'
  },
  {
    icon: '<path d="M3 7.5 12 3.5l9 4-9 4z"/><path d="M6.5 10.5V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5.5"/><path d="M21 7.5V13"/>',
    title: 'Training and workshops',
    body: 'Hands-on sessions built from real engagements and competition work, run for engineering teams as well as internal security functions.',
    out: 'Live lab · exercise set'
  },
  {
    icon: '<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/>',
    title: 'Not sure which you need?',
    body: 'Most engagements start with a short scoping call. Tell us the stack and the deadline and we will say plainly what is worth testing first.',
    out: 'hello@v1olet.xyz',
    quiet: true
  }
];

$('cap-grid').innerHTML = CAPABILITIES.map(c => `
  <article class="cap${c.quiet ? ' cap-quiet' : ''} reveal">
    <div class="cap-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${c.icon}</svg></div>
    <h3>${esc(c.title)}</h3>
    <p class="prose">${esc(c.body)}</p>
    <div class="cap-out">${esc(c.out)}</div>
  </article>`).join('');

/* ----------------------------------------------------------------- record --
   Ranks split so the ordinal sits as a superscript beside a tabular figure. */
const splitRank = r => {
  const m = /^(\d+)(st|nd|rd|th)$/i.exec(String(r ?? '').trim());
  return m ? `${m[1]}<sup>${m[2].toLowerCase()}</sup>` : esc(r);
};

const metaLine = e => [e.date, e.teams, e.captain ? `captained by ${e.captain}` : '']
  .filter(Boolean).map(esc).join('  ·  ');

$('events-list').innerHTML = events.map(e => {
  const podium = /^[1-3](st|nd|rd)$/i.test(String(e.rank ?? ''));
  return `
  <li class="row reveal${podium ? ' podium' : ''}">
    <div class="rk">${splitRank(e.rank)}</div>
    <div>
      <a class="ev-name" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.name)}</a>
      <div class="ev-meta">${metaLine(e)}</div>
      ${e.badge ? `<span class="ev-badge">${esc(e.badge)}</span>` : ''}
    </div>
  </li>`;
}).join('');

/* ------------------------------------------------------------------- team --*/
const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.12v3.14c0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>',
  website: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.02a15.6 15.6 0 0 0-1.2-5.02A8.03 8.03 0 0 1 19.93 11zM12 4.04c.86 1.16 1.62 2.94 1.9 4.96h-3.8c.28-2.02 1.04-3.8 1.9-4.96zM4.07 13h3.02c.15 1.8.57 3.52 1.2 5.02A8.03 8.03 0 0 1 4.07 13zm3.02-2H4.07a8.03 8.03 0 0 1 4.22-5.02A15.6 15.6 0 0 0 7.09 11zM12 19.96c-.86-1.16-1.62-2.94-1.9-4.96h3.8c-.28 2.02-1.04 3.8-1.9 4.96zM10.1 13h3.8a13.7 13.7 0 0 1 0-2h-3.8a13.7 13.7 0 0 1 0 2zm5.61 5.02c.63-1.5 1.05-3.22 1.2-5.02h3.02a8.03 8.03 0 0 1-4.22 5.02z"/></svg>'
};

const initials = n => (n.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2) || '??').toUpperCase();

const avatarHtml = m => m.avatar
  ? `<div class="avatar" data-initials="${esc(initials(m.name))}"><img src="${esc(m.avatar)}" alt="" crossorigin="anonymous" loading="lazy" onerror="this.parentElement.textContent=this.parentElement.dataset.initials"></div>`
  : `<div class="avatar">${esc(initials(m.name))}</div>`;

const skillsHtml = m => (m.skills || []).length
  ? `<div class="skills">${m.skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>` : '';

const socialsHtml = m => {
  const l = m.links || {};
  const items = ['linkedin', 'github', 'website'].filter(k => l[k]).map(k =>
    `<a href="${esc(l[k])}" target="_blank" rel="noopener noreferrer" aria-label="${esc(m.name)} on ${k}">${ICONS[k]}</a>`).join('');
  return items ? `<div class="socials">${items}</div>` : '';
};

/* Three tiers render three shapes. Leadership and core are panels (portrait
   beside the name, quote below); members are dense rows. Every optional field
   is emitted only when present, so a member without a quote or links produces
   a shorter panel rather than an empty slot. No animation-delay: nothing on
   this page animates in. */
const card = variant => m => {
  // Leadership shows its role; the other tiers only show a tag if one is set.
  const tag = variant === 'lead' ? m.role : m.roleTag;
  const tagHtml = tag ? `<span class="op-tag">${esc(tag)}</span>` : '';

  if (variant === 'member') {
    return `
  <article class="op member reveal">
    ${avatarHtml(m)}
    <div class="op-body">
      <h3 class="op-name">${esc(m.name)}${tagHtml}</h3>
      <div class="op-spec">${esc(m.specialty)}</div>
    </div>
    ${socialsHtml(m)}
  </article>`;
  }

  return `
  <article class="op ${variant} reveal">
    <div class="op-head">
      ${avatarHtml(m)}
      <div class="op-id">
        ${tagHtml}
        <h3 class="op-name">${esc(m.name)}</h3>
        <div class="op-spec">${esc(m.specialty)}</div>
      </div>
    </div>
    ${m.quote ? `<blockquote>${esc(m.quote)}</blockquote>` : ''}
    ${skillsHtml(m)}
    ${socialsHtml(m)}
  </article>`;
};

const TIERS = {
  captain: { grid: 'captains-grid', count: 'n-captain', variant: 'lead' },
  core:    { grid: 'core-grid',     count: 'n-core',    variant: 'core' },
  member:  { grid: 'members-grid',  count: 'n-member',  variant: 'member' }
};

for (const [tier, cfg] of Object.entries(TIERS)) {
  const group = roster.filter(m => m.tier === tier);
  $(cfg.grid).innerHTML = group.map(card(cfg.variant)).join('');
  $(cfg.count).textContent = String(group.length).padStart(2, '0');
}

/* ------------------------------------------------------------------ motion --
   One shared observer drives the reveals; a second counts the figures up when
   they first come into view. Both honour prefers-reduced-motion by writing
   the final state immediately instead of animating to it. */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealIO = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    obs.unobserve(e.target);
    e.target.classList.add('on');
  }
}, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

const bindReveals = () => document.querySelectorAll('.reveal:not(.on)').forEach(el => {
  if (reduced) el.classList.add('on');
  else revealIO.observe(el);
});

const fmtCount = el => (el.dataset.prefix || '')
  + Number(el.dataset.count).toLocaleString('en-US') + (el.dataset.suffix || '');

const countIO = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    obs.unobserve(e.target);
    const el = e.target, end = Number(el.dataset.count), t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (el.dataset.prefix || '')
        + Math.round(end * eased).toLocaleString('en-US') + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
}, { threshold: .6 });

document.querySelectorAll('[data-count]').forEach(el => {
  if (reduced) { el.textContent = fmtCount(el); return; }
  el.textContent = (el.dataset.prefix || '') + '0';
  countIO.observe(el);
});

/* Pointer-driven tilt. Small angles on purpose — past about 6deg it stops
   reading as depth and starts reading as a toy. */
if (!reduced && matchMedia('(pointer:fine)').matches) {
  for (const el of document.querySelectorAll('[data-tilt]')) {
    el.addEventListener('pointermove', ev => {
      const r = el.getBoundingClientRect();
      el.classList.add('tilting');
      el.style.setProperty('--rx', `${((ev.clientX - r.left) / r.width - .5) * 6}deg`);
      el.style.setProperty('--ry', `${(.5 - (ev.clientY - r.top) / r.height) * 6}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
}

/* -------------------------------------------------------------- scroll UI --*/
const totop = $('totop');
const onScroll = () => totop.classList.toggle('show', document.documentElement.scrollTop > 700);
onScroll();
addEventListener('scroll', onScroll, { passive: true });
// Instant jump, never smooth — the page does not animate.
totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'auto' }));

/* ------------------------------------------------------------------ theme --*/
(function initTheme() {
  const root = document.documentElement;
  const btn = $('theme-toggle');
  const media = matchMedia('(prefers-color-scheme: light)');

  media.addEventListener?.('change', e => {
    if (!localStorage.getItem('theme')) root.dataset.theme = e.matches ? 'light' : 'dark';
  });

  btn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable — session only */ }
    btn.setAttribute('aria-label', `Switch to ${next === 'light' ? 'dark' : 'light'} theme`);
  });
})();

/* ------------------------------------------------------------ mobile nav --
   Below 900px this is the only navigation, so it has to work by keyboard:
   Escape closes and restores focus, and the panel is [hidden] when closed so
   its links stay out of the tab order. Opening moves focus into the panel,
   which otherwise sits after the header controls in the DOM. */
(function initMobileNav() {
  const btn = $('nav-toggle'), panel = $('mobile-nav');
  if (!btn || !panel) return;

  const setOpen = (open, moveFocus = false) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    panel.hidden = !open;
    if (open && moveFocus) panel.querySelector('a')?.focus();
  };

  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true', true));
  panel.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });

  addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });

  matchMedia('(min-width:900px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
})();

/* --------------------------------------------------------- nav highlight --*/
const navLinks = [...document.querySelectorAll('.topnav a')];
const secIO = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    navLinks.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#' + e.target.id));
  }
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('section[id]').forEach(s => secIO.observe(s));

/* ----------------------------------------------------------- easter egg --*/
console.log('%c v1olet ', 'background:#4C2AC4;color:#fff;font-size:20px;font-weight:700;padding:6px 12px');
console.log('%cLooking under the hood? We like that.\nflag: v1{r34d_th3_s0urc3_n0w_4pply}\napply -> https://forms.gle/sRLQVVkSxt32uKhk8',
  'color:#8E6BFF;font-family:monospace;font-size:13px');

bindReveals();
