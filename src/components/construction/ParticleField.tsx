'use client';

import { useEffect, useRef } from 'react';
import styles from './construction.module.css';

const TAU = Math.PI * 2;
function random(seed: number) {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const points = Array.from({ length: mobile ? 950 : 1800 }, (_, i) => ({
      u: random(i + 1) * TAU,
      v: random(i + 2001) * TAU,
      size: 0.5 + random(i + 4001) * 1.1,
      phase: random(i + 6001) * TAU,
    }));
    let width = 0, height = 0, frame = 0, time = 0, previous = 0;
    let pointerX = 0, pointerY = 0, driftX = 0, driftY = 0;

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      driftX += (pointerX - driftX) * 0.025;
      driftY += (pointerY - driftY) * 0.025;
      const scale = Math.min(width * 0.51, height * 0.56, 550);
      const rotation = time * 0.095;
      const tilt = 0.53 + Math.sin(time * 0.12) * 0.14 + driftY * 0.13;
      const sinTilt = Math.sin(tilt), cosTilt = Math.cos(tilt);
      const cosRot = Math.cos(rotation), sinRot = Math.sin(rotation);
      const projected = points.map((point) => {
        const u = point.u + time * 0.045;
        const v = point.v + Math.sin(u * 3 + time * 0.28) * 0.34;
        const tube = 0.23 + Math.sin(u * 3 + time * 0.3) * 0.055;
        const radius = 0.76 + Math.cos(v) * tube;
        const x = radius * Math.cos(u), y = radius * Math.sin(u), z = Math.sin(v) * tube;
        const rx = x * cosRot - z * sinRot;
        const rz = x * sinRot + z * cosRot;
        const ry = y * cosTilt - rz * sinTilt;
        const depth = y * sinTilt + rz * cosTilt;
        const perspective = 2.8 / (2.8 - depth);
        return {
          x: width / 2 + (rx * scale + driftX * 18) * perspective,
          y: height / 2 + (ry * scale + driftY * 12) * perspective,
          depth, size: point.size * perspective,
          alpha: (0.2 + (depth + 1) * 0.25) * (0.8 + Math.sin(time * 0.4 + point.phase) * 0.2),
        };
      }).sort((a, b) => a.depth - b.depth);
      // Faint threads connect nearby particles without an all-to-all search.
      context.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (i % 3 === 0) {
          for (let j = i + 1; j < Math.min(i + 5, projected.length); j++) {
            const q = projected[j];
            const distance = Math.hypot(p.x - q.x, p.y - q.y);
            if (distance < scale * 0.095) {
              context.strokeStyle = `rgba(133, 90, 255, ${(1 - distance / (scale * 0.095)) * 0.12})`;
              context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y); context.stroke();
            }
          }
        }
        context.fillStyle = `rgba(${p.depth > 0.3 ? '186, 152, 255' : '123, 73, 239'}, ${p.alpha})`;
        context.beginPath(); context.arc(p.x, p.y, p.size, 0, TAU); context.fill();
      }
    }

    function tick(now: number) {
      if (previous) time += Math.min(now - previous, 50) / 1000;
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    function syncMotion() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
      else draw();
    }
    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function onPointer(event: PointerEvent) {
      if (motion.matches || event.pointerType !== 'mouse') return;
      pointerX = event.clientX / width * 2 - 1;
      pointerY = event.clientY / height * 2 - 1;
    }
    function resetPointer() { pointerX = 0; pointerY = 0; }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize(); syncMotion();
    motion.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', resetPointer);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      motion.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncMotion);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', resetPointer);
    };
  }, []);
  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
