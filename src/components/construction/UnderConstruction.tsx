import { ParticleField } from './ParticleField';
import styles from './construction.module.css';

export function UnderConstruction() {
  return (
    <div className={styles.page}>
      <ParticleField />
      <div className={styles.vignette} aria-hidden="true" />
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="v1olet home">
          <img src="/brand/wordmark-nav-dark.webp" width="116" height="42" alt="v1olet" />
        </a>
        <span className={styles.status}><span aria-hidden="true" />WORK IN PROGRESS</span>
      </header>
      <main id="main" className={styles.main}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span aria-hidden="true">[</span> A NEW CHAPTER <span aria-hidden="true">]</span></p>
          <h1 className={styles.title}>under{' '}<br /><span>construction</span><span className={styles.period}>.</span></h1>
          <p className={styles.description}>Something new is taking shape.</p>
          <a className={styles.cta} href="https://ctf.v1olet.xyz/">
            <span>Explore our CTF team</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M6 6h12v12" /></svg>
            </span>
          </a>
          <span className={styles.destination}>ctf.v1olet.xyz</span>
        </div>
      </main>
      <footer className={styles.footer}>
        <span>v1olet security</span>
        <span className={styles.footerNote}><span aria-hidden="true">↳</span> STILL BUILDING. STILL BREAKING.</span>
        <span className={styles.footerMark} aria-hidden="true">V1 / NEXT</span>
      </footer>
    </div>
  );
}
