import { roster, events } from './data.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = id => document.getElementById(id);

/* ---------------------------------------------------------------- record --
   Ranks are split so the ordinal suffix can sit as a superscript next to a
   tabular figure. "3rd" -> 3 + rd. Anything unexpected renders as-is. */
const splitRank = r => {
  const m = /^(\d+)(st|nd|rd|th)$/i.exec(String(r ?? '').trim());
  return m
    ? `${m[1]}<sup>${m[2].toLowerCase()}</sup>`
    : esc(r);
};

const metaLine = e => [e.date, e.teams, e.captain ? `captained by ${e.captain}` : '']
  .filter(Boolean).map(esc).join('  ·  ');

$('events-list').innerHTML = events.map((e, i) => {
  const podium = /^[1-3](st|nd|rd)$/i.test(String(e.rank ?? ''));
  return `
  <li class="row reveal${podium ? ' podium' : ''}" style="animation-delay:${Math.min(i, 6) * 60}ms">
    <div class="rk">${splitRank(e.rank)}</div>
    <div>
      <a class="ev-name" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.name)}</a>
      <div class="ev-meta">${metaLine(e)}</div>
      ${e.badge ? `<span class="ev-badge">${esc(e.badge)}</span>` : ''}
    </div>
  </li>`;
}).join('');

/* --------------------------------------------------------------- roster -- */
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

// Leadership shows its role; everyone else only shows a tag if one is set.
const card = lead => (m, i) => {
  const tag = lead ? m.role : m.roleTag;
  return `
  <article class="op${lead ? ' lead' : ''} reveal" style="animation-delay:${Math.min(i, 7) * 70}ms">
    ${tag ? `<span class="op-tag">${esc(tag)}</span>` : ''}
    ${avatarHtml(m)}
    <h3 class="op-name">${esc(m.name)}</h3>
    <div class="op-spec">${esc(m.specialty)}</div>
    ${m.quote ? `<blockquote>&ldquo;${esc(m.quote)}&rdquo;</blockquote>` : ''}
    ${skillsHtml(m)}
    ${socialsHtml(m)}
  </article>`;
};

const tiers = {
  captain: { grid: 'captains-grid', count: 'n-captain', lead: true },
  core:    { grid: 'core-grid',     count: 'n-core',    lead: false },
  member:  { grid: 'members-grid',  count: 'n-member',  lead: false }
};

for (const [tier, cfg] of Object.entries(tiers)) {
  const group = roster.filter(m => m.tier === tier);
  $(cfg.grid).innerHTML = group.map(card(cfg.lead)).join('');
  $(cfg.count).textContent = String(group.length).padStart(2, '0');
}

// Keep the headline numbers honest: derive them from the roster itself.
$('op-count').textContent = roster.length;

const disciplines = [...new Set(roster.flatMap(m => m.skills || []))].sort();
$('discipline-list').innerHTML = disciplines.map(s => `<li>${esc(s)}</li>`).join('');

/* --------------------------------------------------------------- reveal -- */
const io = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    io.unobserve(e.target);
    e.target.classList.add('on');
  }
}, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

if (reduced) document.querySelectorAll('.reveal').forEach(el => el.classList.add('on'));
else document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ------------------------------------------------------------- counters -- */
const cio = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    cio.unobserve(e.target);
    const el = e.target;
    const end = Number(el.dataset.count);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const fmt = n => pre + n.toLocaleString('en-US') + suf;
    if (reduced) { el.textContent = fmt(end); continue; }
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1300, 1);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
}, { threshold: .6 });

document.querySelectorAll('[data-count]').forEach(el => {
  el.textContent = (el.dataset.prefix || '') + '0';
  cio.observe(el);
});

/* ------------------------------------------------------------ scroll UI -- */
const prog = $('progress'), totop = $('totop'), topbar = $('topbar');
const onScroll = () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + '%';
  totop.classList.toggle('show', h.scrollTop > 700);
  topbar.classList.toggle('stuck', h.scrollTop > 4);
};
onScroll();
addEventListener('scroll', onScroll, { passive: true });
totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

/* ---------------------------------------------------------------- theme -- */
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

/* --------------------------------------------------------- nav highlight -- */
const navLinks = [...document.querySelectorAll('.topnav a')];
const secIO = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    navLinks.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#' + e.target.id));
  }
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('section[id]').forEach(s => secIO.observe(s));

/* ------------------------------------------------------------ easter egg -- */
console.log('%c v1olet ', 'background:#5B2BD9;color:#fff;font-size:20px;font-weight:700;padding:6px 12px');
console.log('%cLooking under the hood? We like that.\nflag: v1{r34d_th3_s0urc3_n0w_4pply}\napply -> https://forms.gle/sRLQVVkSxt32uKhk8',
  'color:#AE8CFF;font-family:monospace;font-size:13px');
