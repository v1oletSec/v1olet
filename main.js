import { roster, events } from './src/data.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- typed terminal (Hero) ---- */
const lines = ['./init --team v1olet --mode offensive','capture the flag. break the box. write it up.','pwn | rev | web | crypto | forensics'];
const typedEl = document.getElementById('typed');
if (reduced) { typedEl.textContent = lines[0]; }
else {
  let li = 0, ci = 0, del = false;
  (function tick(){
    const l = lines[li];
    typedEl.textContent = l.slice(0, ci);
    if (!del && ci < l.length) { ci++; setTimeout(tick, 42); }
    else if (!del) { del = true; setTimeout(tick, 2100); }
    else if (ci > 0) { ci--; setTimeout(tick, 14); }
    else { del = false; li = (li + 1) % lines.length; setTimeout(tick, 350); }
  })();
}

/* ---- events (timeline) ---- */
document.getElementById('events-list').innerHTML = events.map(e => `
  <div class="ev reveal${e.top ? ' top' : ''}">
    <span class="diamond"></span>
    <div class="rank">${esc(e.rank)}</div>
    <div class="info">
      <a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.name)}</a>
      <div class="meta">${esc(e.date)}${e.teams ? ' · ' + esc(e.teams) : ''} · captained by ${esc(e.captain)}</div>
    </div>
    ${e.badge ? `<span class="tag">${esc(e.badge)}</span>` : ''}
    ${e.top ? `<span class="tag fill">TOP RUN</span>` : ''}
  </div>`).join('');

/* ---- roster ---- */
const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.12v3.14c0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>',
  website: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.02a15.6 15.6 0 0 0-1.2-5.02A8.03 8.03 0 0 1 19.93 11zM12 4.04c.86 1.16 1.62 2.94 1.9 4.96h-3.8c.28-2.02 1.04-3.8 1.9-4.96zM4.07 13h3.02c.15 1.8.57 3.52 1.2 5.02A8.03 8.03 0 0 1 4.07 13zm3.02-2H4.07a8.03 8.03 0 0 1 4.22-5.02A15.6 15.6 0 0 0 7.09 11zM12 19.96c-.86-1.16-1.62-2.94-1.9-4.96h3.8c-.28 2.02-1.04 3.8-1.9 4.96zM10.1 13h3.8a13.7 13.7 0 0 1 0-2h-3.8a13.7 13.7 0 0 1 0 2zm5.61 5.02c.63-1.5 1.05-3.22 1.2-5.02h3.02a8.03 8.03 0 0 1-4.22 5.02z"/></svg>'
};
const initials = n => n.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '??';
const avatarHtml = m => m.avatar
  ? `<div class="avatar" data-initials="${esc(initials(m.name))}"><img src="${esc(m.avatar)}" alt="${esc(m.name)} profile photo" crossorigin="anonymous" loading="lazy" onerror="this.parentElement.textContent=this.parentElement.dataset.initials"></div>`
  : `<div class="avatar">${esc(initials(m.name))}</div>`;
const skillsHtml = m => `<div class="skills">${(m.skills || []).map(s => `<span>${esc(s)}</span>`).join('')}</div>`;
const socialsHtml = m => {
  const l = m.links || {};
  const items = ['linkedin','github','website'].filter(k => l[k]).map(k =>
    `<a href="${esc(l[k])}" target="_blank" rel="noopener noreferrer" aria-label="${esc(m.name)} ${k}">${ICONS[k]}</a>`).join('');
  return items ? `<div class="socials">${items}</div>` : '';
};

const captains = roster.filter(m => m.tier === 'captain');
const core = roster.filter(m => m.tier === 'core');

document.getElementById('captains-grid').innerHTML = captains.map((m, i) => `
  <div class="reveal" style="transition-delay:${i * 90}ms">
    <div class="cap-card group">
      <span class="card-sheen" style="position:absolute;inset:0;z-index:10" aria-hidden="true"></span>
      <span class="role-tag">${esc(m.role)}</span>
      <div class="head">
        <div class="av-wrap"><span class="av-ring" aria-hidden="true"></span>${avatarHtml(m)}</div>
        <div style="min-width:0">
          <h3>${esc(m.name)}</h3>
          <div class="spec"><span class="dot"></span>${esc(m.specialty)}</div>
        </div>
      </div>
      ${m.quote ? `<blockquote><span class="q">&ldquo;</span>${esc(m.quote)}</blockquote>` : ''}
      ${m.stats ? `<div class="stats3">${m.stats.map(st => `<div><div class="v">${esc(st.value)}</div><div class="k">${esc(st.label)}</div></div>`).join('')}</div>` : ''}
      ${skillsHtml(m)}
      ${socialsHtml(m)}
    </div>
  </div>`).join('');

document.getElementById('core-grid').innerHTML = core.map((m, i) => `
  <div class="reveal" style="transition-delay:${i * 90}ms">
    <div class="core-card group">
      <span class="card-sheen" style="position:absolute;inset:0;z-index:10" aria-hidden="true"></span>
      <div class="av-holder">${avatarHtml(m)}</div>
      <h3>${esc(m.name)}</h3>
      <div class="spec">${esc(m.specialty)}</div>
      ${m.quote ? `<blockquote>&ldquo;${esc(m.quote)}&rdquo;</blockquote>` : ''}
      ${skillsHtml(m)}
      ${socialsHtml(m)}
    </div>
  </div>`).join('');

/* ---- reveal on scroll ---- */
const io = new IntersectionObserver(es => {
  const hits = es.filter(e => e.isIntersecting);
  hits.forEach((e, idx) => {
    io.unobserve(e.target);
    if (reduced) { e.target.classList.add('on'); return; }
    setTimeout(() => e.target.classList.add('on'), idx * 90);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---- counters ---- */
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, end = +el.dataset.count, pre = el.dataset.prefix || '';
  if (reduced) { el.textContent = pre + end; return; }
  const t0 = performance.now();
  (function step(t){ const p = Math.min((t - t0) / 1200, 1);
    el.textContent = pre + Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step); })(t0);
}), { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => { el.textContent = (el.dataset.prefix || '') + '0'; cio.observe(el); });

/* ---- scroll UI: progress + back-to-top ---- */
const prog = document.getElementById('progress');
const tt = document.getElementById('totop');
function onScroll(){
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + '%';
  tt.classList.toggle('show', h.scrollTop > 600);
}
onScroll();
addEventListener('scroll', onScroll, { passive: true });
tt.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));


/* ---- nav active section highlight ---- */
const navLinks = [...document.querySelectorAll('nav .links a')];
const secIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  navLinks.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('section[id]').forEach(sec => secIO.observe(sec));

/* ---- console easter egg ---- */
console.log('%c v1olet_ ', 'background:#4e2bcc;color:#fff;font-size:22px;font-weight:bold;padding:6px 10px');
console.log('%cLooking under the hood? We like that.\nflag: v1{r34d_th3_s0urc3_n0w_4pply}\napply -> https://forms.gle/sRLQVVkSxt32uKhk8', 'color:#905bf4;font-family:monospace;font-size:13px');

/* ---- flower rain (ported from flower-rain.tsx) ---- */
(function(){
  if (reduced) return;
  const canvas = document.getElementById('flower-rain');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const COLORS = {
    primary:  { petal: '#4e2bcc', core: '#905bf4' },
    lavender: { petal: '#905bf4', core: '#4e2bcc' }
  };
  function drawFlower(r, kind, alpha){
    const c = COLORS[kind], petals = 6;
    ctx.shadowColor = `${c.petal} / 0.9)`;
    ctx.shadowBlur = r * 0.9;
    for (let i = 0; i < petals; i++) {
      ctx.save();
      ctx.rotate((i / petals) * Math.PI * 2);
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.62, r * 0.34, r * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${c.petal} / ${alpha})`;
      ctx.fill();
      ctx.restore();
    }
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = `${c.core} / ${Math.min(1, alpha + 0.25)})`;
    ctx.fill();
  }
  let dpr, width = 0, height = 0, flowers = [];
  const spawn = (initial = false) => {
    const size = 6 + Math.random() * 14;
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : -size * 2,
      size,
      speed: 14 + Math.random() * 30 + size,
      drift: (Math.random() - 0.5) * 16,
      sway: Math.random() * Math.PI * 2,
      swayAmp: 8 + Math.random() * 26,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 1.2,
      hue: Math.random() > 0.5 ? 'primary' : 'lavender',
      alpha: 0.28 + Math.random() * 0.4
    };
  };
  function resize(){
    width = innerWidth; height = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.round((width * height) / 42000);
    const count = Math.max(14, Math.min(38, target));
    flowers = Array.from({ length: count }, () => spawn(true));
  }
  resize();
  addEventListener('resize', resize);
  let last = performance.now();
  (function loop(now){
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, width, height);
    for (const f of flowers) {
      f.y += f.speed * dt;
      f.sway += dt * 1.4;
      f.angle += f.spin * dt;
      f.x = f.x + f.drift * dt + Math.sin(f.sway) * f.swayAmp * dt;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);
      drawFlower(f.size, f.hue, f.alpha);
      ctx.restore();
      if (f.y - f.size > height) Object.assign(f, spawn(false));
      if (f.x < -40) f.x = width + 40;
      if (f.x > width + 40) f.x = -40;
    }
    requestAnimationFrame(loop);
  })(last);
})();
