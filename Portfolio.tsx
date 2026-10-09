"use client";
import {
  AnimatePresence, MotionConfig, animate, motion, useInView, useMotionValue,
  useMotionValueEvent, useScroll, useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ───────── DATA ───────── */
const PROFILE = {
  brand: "DIKSHANT", name: "HENDRA", hey: "Hey, I’m", bubble: ["Hi, I’m", "HENDRA!"],
  roles: ["Creative Animator", "Motion Designer", "Video Editor", "UI/UX Enthusiast"],
  about: "A creative Animator & Video Editor with a passion for lively, narrative-driven visual assets. I transform ideas into engaging motion, designs, and cinematic stories.",
  sticker: "Hi! I’m motion designer!",
  nav: [["Home", "#home"], ["Animate", "#skills"], ["Works", "#projects"], ["Contact", "#contact"]],
  stats: [[6, "Featured works"], [8, "Tools mastered"], [4, "Disciplines"]] as [number, string][],
};
const P = PROFILE;
const LETTER = ["#F5FF3B", "#9BFF3B", "#39FF88", "#3BE8FF", "#7B6BFF", "#C04BFF", "#FF4FD8"];
const PROJECTS = [
  { k: "p1", name: "Short Film: Senandung", tag: "Warm narrative cartoon scene" },
  { k: "p2", name: "UI Motion & UX", tag: "Interface wireframe and flow" },
  { k: "p3", name: "Showreel 2026", tag: "Graphic glowing intro", play: true },
  { k: "p4", name: "Lensa Seni Brand", tag: "Logo and brand motion project" },
  { k: "p5", name: "Music Video VFX", tag: "Explosive visual effects" },
  { k: "p6", name: "Content Editing", tag: "Dynamic vlogger-style editing" },
];
const SKILLS = [
  { n: "After Effects", s: "Ae", lv: "Pro", note: "Motion graphics & VFX", c: "#9B6BFF" },
  { n: "Premiere Pro", s: "Pr", lv: "Pro", note: "Video editing & storytelling", c: "#FF4FD8" },
  { n: "Photoshop", s: "Ps", lv: "Pro", note: "Compositing & key art", c: "#3B9BFF" },
  { n: "Illustrator", s: "Ai", lv: "Pro", note: "Vector, logo & brand", c: "#FF9A3B" },
  { n: "Animate", s: "An", lv: "Pro", note: "2D character animation", c: "#FF5A4D" },
  { n: "Blender", s: "Bl", lv: "Mid", note: "3D & visual effects", c: "#FFB347" },
  { n: "Figma", s: "Fg", lv: "Pro", note: "UI/UX wireframe & flow", c: "#39FF88" },
  { n: "InDesign", s: "Id", lv: "Mid", note: "Layout & print design", c: "#FF4F9A" },
];
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/", d: "M8.7 16.6 4.1 12l4.6-4.6L7.3 6l-6 6 6 6 1.4-1.4Zm6.6 0 4.6-4.6-4.6-4.6L16.7 6l6 6-6 6-1.4-1.4Z" },
  { label: "LinkedIn", href: "https://linkedin.com/", d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6c.6-1 1.9-1.9 3.9-1.9 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4V9.5Z" },
  { label: "Email", href: "mailto:hello@example.com", d: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4.5 7v1.6l7.5 5.2 7.5-5.2V7L12 12.2Z" },
];

/* ───────── DOODLES ───────── */
const Star = ({ className = "", fill = "#F5FF3B" }: { className?: string; fill?: string }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden><path d="M20 2l5 13 14 1-11 9 4 14-12-8-12 8 4-14L1 16l14-1z" fill={fill} stroke="#0D0B2A" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const Bolt = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 30 50" className={className} aria-hidden><path d="M18 2L3 28h10l-4 20L27 20H16z" fill="#F5FF3B" stroke="#0D0B2A" strokeWidth="2.5" strokeLinejoin="round" /></svg>
);
const Squiggle = ({ className = "", c = "#39FF88" }: { className?: string; c?: string }) => (
  <svg viewBox="0 0 120 30" className={className} aria-hidden><path d="M3 15q10-18 20 0t20 0 20 0 20 0 20 0 17 0" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" /></svg>
);

function Particles() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  if (!m) return null;
  const r = (i: number, k: number) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
  const cols = ["#7B6BFF", "#3BE8FF", "#39FF88", "#F5FF3B"];
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 30 }, (_, i) => (
        <motion.span key={i} className="absolute rounded-full" style={{ left: `${r(i, 1) * 100}%`, top: `${r(i, 2) * 100}%`, width: 3 + r(i, 3) * 5, height: 3 + r(i, 3) * 5, background: cols[i % 4], boxShadow: `0 0 10px ${cols[i % 4]}` }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3 + r(i, 4) * 4, delay: r(i, 5) * 3 }} />
      ))}
    </div>
  );
}

/* ───────── GLOBAL ───────── */
function Intro({ done }: { done: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, 100, { duration: 1.5, ease: "easeInOut", onUpdate: (v) => setN(Math.round(v)), onComplete: () => setTimeout(done, 200) });
    return () => c.stop();
  }, [done]);
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-navy" initial={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
      <div className="text-center">
        <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="mx-auto w-16"><Star /></motion.div>
        <p className="mt-4 font-display text-6xl text-yellow">{n}%</p>
        <p className="font-display text-xl tracking-widest text-paper">LOADING LEVEL 1…</p>
      </div>
    </motion.div>
  );
}

function Nav() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [lv, setLv] = useState(1);
  const [hov, setHov] = useState<string | null>(null);
  useMotionValueEvent(scrollYProgress, "change", (v) => setLv(Math.min(5, Math.floor(v * 5) + 1)));
  return (
    <motion.header initial={{ y: -90 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} className="fixed inset-x-0 top-0 z-50 bg-navy/60 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#home" className="font-heading text-3xl font-bold tracking-wide">{P.brand}</a>
        <nav className="flex items-center gap-1 rounded-full bg-[#14143a]/90 px-2 py-1.5 ring-1 ring-white/10" onMouseLeave={() => setHov(null)}>
          {P.nav.map(([l, h]) => (
            <a key={l} href={h} onMouseEnter={() => setHov(l)} className="relative hidden px-4 py-1.5 font-heading text-xl font-semibold md:block">
              {hov === l && <motion.span layoutId="navhl" className="absolute inset-0 rounded-full bg-white/10" />}
              <span className="relative">{l}</span>
            </a>
          ))}
          <AnimatePresence mode="popLayout">
            <motion.span key={lv} initial={{ y: -16, scale: 1.5, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 16, opacity: 0 }} className="px-3 font-display text-xl text-green">LV {lv}</motion.span>
          </AnimatePresence>
          <motion.a href="mailto:hello@example.com" whileHover={{ scale: 1.08, rotate: -2 }} whileTap={{ scale: 0.94 }} className="rounded-full bg-yellow px-5 py-1.5 font-heading text-xl font-bold text-navy shadow-[0_0_20px_rgba(245,255,59,.45)]">Hire Me</motion.a>
        </nav>
      </div>
      <motion.div className="h-1 origin-left bg-gradient-to-r from-cyan via-green to-yellow" style={{ scaleX: w }} />
    </motion.header>
  );
}

function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35 }), sy = useSpring(y, { stiffness: 500, damping: 35 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as HTMLElement).closest("a,button,[data-hover]")); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return <motion.div aria-hidden className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] -ml-3 -mt-3 h-6 w-6 rounded-full border-2 border-lime mix-blend-difference" style={{ x: sx, y: sy }} animate={{ scale: big ? 2.2 : 1 }} />;
}

function Toast({ msg }: { msg: string | null }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div role="status" initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 320, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-20 right-4 z-[80] flex items-center gap-3 rounded-2xl bg-card px-4 py-3 ring-2 ring-lime glow-lime md:bottom-6">
          <Star className="h-8 w-8" />
          <div><p className="font-display text-lg text-yellow">ACHIEVEMENT UNLOCKED</p><p className="text-sm">{msg}</p></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Heading({ children, right }: { children: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-4xl font-bold uppercase tracking-wide md:text-5xl">{children}</h2>
        <motion.div className="mt-1 h-1.5 origin-left rounded-full bg-gradient-to-r from-violet via-pink to-cyan" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ width: "60%" }} />
      </div>
      {right}
    </div>
  );
}

/* ───────── AVATAR ───────── */
function Avatar() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const ry = useSpring(mx, { stiffness: 120, damping: 18 }), rx = useSpring(my, { stiffness: 120, damping: 18 });
  const [jump, setJump] = useState(0);
  useEffect(() => {
    const m = (e: MouseEvent) => { mx.set((e.clientX / innerWidth - 0.5) * 10); my.set(-(e.clientY / innerHeight - 0.5) * 8); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [mx, my]);
  return (
    <div className="relative" style={{ filter: "drop-shadow(0 0 24px rgba(59,232,255,.45))" }}>
      <motion.button data-hover aria-label="Karakter kartun, klik untuk melompat" onClick={() => setJump((j) => j + 1)} className="block w-full" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
        <motion.img key={jump} src="/img/avatar.jpg" alt="Karakter kartun melambaikan tangan" draggable={false} className="avatar-mask w-full select-none"
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformOrigin: "80% 90%" }}
          animate={jump ? { y: [0, -50, 0], rotate: [0, -4, 4, 0] } : { rotate: [0, 1.4, -0.8, 1.4, 0] }}
          transition={jump ? { duration: 0.6 } : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
      </motion.button>
      <motion.div initial={{ scale: 0, rotate: -18 }} animate={{ scale: 1, rotate: -7 }} transition={{ delay: 1.2, type: "spring", stiffness: 240, damping: 12 }}
        className="absolute left-0 top-[1%] flex h-[27%] w-[44%] items-center justify-center rounded-[1.6rem] bg-white px-3 text-center font-display text-3xl leading-[0.95] text-navy shadow-[0_0_30px_rgba(255,255,255,.3)] md:text-4xl">
        <span>{P.bubble[0]}<br />{P.bubble[1]}</span>
        <span className="absolute -bottom-2 left-12 h-5 w-5 rotate-45 rounded-sm bg-white" />
      </motion.div>
      <AnimatePresence>
        {jump > 0 && <motion.span key={jump} initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: -8 }} exit={{ scale: 0 }} className="absolute right-4 top-24 rounded-xl bg-yellow px-3 py-1 font-display text-3xl text-navy ring-2 ring-white">BOING!</motion.span>}
      </AnimatePresence>
    </div>
  );
}

function Bubble({ children, className = "", delay = 0, rot = -6 }: { children: React.ReactNode; className?: string; delay?: number; rot?: number }) {
  return (
    <motion.div initial={{ scale: 0, rotate: rot * 3, opacity: 0 }} animate={{ scale: 1, rotate: rot, opacity: 1 }} transition={{ delay, type: "spring", stiffness: 240, damping: 12 }} className={`absolute ${className}`}>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, delay }} className="relative rounded-[1.6rem] bg-white px-5 py-2 text-center font-display text-3xl leading-tight text-navy shadow-[0_0_30px_rgba(255,255,255,.25)] md:text-4xl">
        {children}
        <span className="absolute -bottom-2 left-8 h-5 w-5 rotate-45 rounded-sm bg-white" />
      </motion.div>
    </motion.div>
  );
}

/* ───────── HERO ───────── */
function Hero({ openReel }: { openReel: () => void }) {
  return (
    <section id="home" className="relative min-h-[700px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1b1560] via-[#0f0d35] to-[#2b0f66] p-6 ring-1 ring-white/10 md:p-10 lg:col-span-6">
      <motion.div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet/60 blur-3xl" animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 9 }} />
      <motion.div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-pink/30 blur-3xl" animate={{ scale: [1.2, 1, 1.2] }} transition={{ repeat: Infinity, duration: 11 }} />
      {[
        { e: <Star className="w-9" />, c: "left-[46%] top-[6%]", d: 4 }, { e: <Star className="w-6" fill="#39FF88" />, c: "left-[42%] top-[40%]", d: 5 },
        { e: <Bolt className="w-8" />, c: "right-[6%] top-[40%]", d: 3.5 }, { e: <Squiggle className="w-24" c="#3BE8FF" />, c: "left-[6%] bottom-[10%]", d: 6 },
        { e: <Bolt className="w-6" />, c: "left-[40%] bottom-[8%]", d: 4 },
      ].map((d, i) => (
        <motion.div key={i} aria-hidden className={`absolute ${d.c}`} initial={{ scale: 0 }} animate={{ scale: 1, y: [0, -16, 0], rotate: [0, 14, -8, 0] }}
          transition={{ scale: { delay: 0.8 + i * 0.12, type: "spring" }, y: { repeat: Infinity, duration: d.d }, rotate: { repeat: Infinity, duration: d.d * 1.5 } }}>{d.e}</motion.div>
      ))}
      <Bubble className="left-6 top-8 md:left-10" delay={0.3} rot={-5}>{P.hey}</Bubble>
      
      <div className="relative z-10 pt-24 lg:max-w-[62%]">
        <h1 className="font-display text-[5.5rem] leading-[0.9] sm:text-[7rem] md:text-[8.5rem]" aria-label={P.name}>
          {P.name.split("").map((ch, i) => (
            <motion.span key={i} className="inline-block" initial={{ y: 100, opacity: 0, rotate: 15, scale: 0.5 }} animate={{ y: 0, opacity: 1, rotate: -2, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 260, damping: 10 }}
              style={{ color: LETTER[Math.round((i / (P.name.length - 1)) * (LETTER.length - 1))], WebkitTextStroke: "3px #1a0b4d", textShadow: "4px 5px 0 #2a1170, 0 0 30px " + LETTER[Math.round((i / (P.name.length - 1)) * (LETTER.length - 1))] + "66" }}>
              <motion.span className="inline-block" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.15 + 1.5 }}>{ch}</motion.span>
            </motion.span>
          ))}
        </h1>
        <motion.div className="mt-1 h-2 origin-left rounded-full bg-gradient-to-r from-yellow via-green via-cyan to-pink" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 0.8 }} />
        <div className="mt-6 flex items-start gap-3">
          <svg viewBox="0 0 50 70" className="mt-3 hidden w-10 shrink-0 sm:block" aria-hidden>
            <motion.path d="M30 6C8 14 6 42 22 56" stroke="#F4F2FF" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.7 }} />
            <motion.path d="M10 46l12 10-16 4" stroke="#F4F2FF" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2, duration: 0.3 }} />
          </svg>
          <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="font-heading text-2xl font-semibold leading-snug md:text-3xl">
            <span className="text-lime">{P.roles[0]}</span> • {P.roles[1]}<br />• {P.roles[2]} • {P.roles[3]}
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="mt-8 flex flex-wrap gap-4">
          <motion.button onClick={openReel} whileHover={{ scale: 1.07, rotate: -2 }} whileTap={{ scale: 0.94 }} animate={{ boxShadow: ["0 0 12px #B6FF2B88", "0 0 30px #B6FF2Bcc", "0 0 12px #B6FF2B88"] }} transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
            className="rounded-full bg-lime px-7 py-3 font-heading text-2xl font-bold text-navy">Watch Showreel</motion.button>
          <motion.a href="#projects" whileHover={{ scale: 1.07, rotate: 2 }} whileTap={{ scale: 0.94 }} className="rounded-full bg-[#10163f] px-7 py-3 font-heading text-2xl font-semibold text-cyan shadow-[0_0_20px_rgba(59,232,255,.35)] ring-2 ring-cyan/70">Explore Projects</motion.a>
        </motion.div>
      </div>
      <motion.div className="relative mx-auto mt-8 w-[80%] max-w-[420px] lg:absolute lg:bottom-0 lg:right-[-2%] lg:mt-0 lg:w-[56%]" initial={{ x: 120, opacity: 0, scale: 0.8 }} animate={{ x: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 90, damping: 13 }}>
        <Avatar />
      </motion.div>
    </section>
  );
}

/* ───────── PROJECTS ───────── */
function Thumb({ k }: { k: string }) {
  return (
    <div className="relative h-32 overflow-hidden rounded-xl bg-navy sm:h-36">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/img/${k}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
}

function Card({ p, i, onPlay }: { p: (typeof PROJECTS)[number]; i: number; onPlay: () => void }) {
  return (
    <motion.article data-hover initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: i * 0.08, stiffness: 180, damping: 16 }}
      whileHover={{ y: -6 }} className="group rounded-2xl bg-card p-2 ring-1 ring-white/10 transition-shadow hover:shadow-[0_0_30px_rgba(182,255,43,.3)] hover:ring-lime/60">
      <Thumb k={p.k} />
      <div className="flex items-center gap-2 px-2 pb-2 pt-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-heading text-xl font-semibold leading-tight">{p.name}</h3>
          <p className="truncate text-xs text-paper/70">{p.tag}</p>
        </div>
        <button onClick={p.play ? onPlay : undefined} aria-label={`Buka ${p.name}`} className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime">
          <motion.span className="absolute inset-0 rounded-full bg-lime" animate={{ scale: [1, 1.7], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.2 }} />
          <svg viewBox="0 0 24 24" className="relative ml-0.5 h-4 w-4 fill-navy"><path d="M6 4l14 8-14 8z" /></svg>
        </button>
      </div>
    </motion.article>
  );
}

function Projects({ openReel }: { openReel: () => void }) {
  return (
    <section id="projects" className="rounded-[2rem] bg-[#12122b] p-5 ring-1 ring-white/10 md:p-8 lg:col-span-6 lg:row-span-3">
      <Heading right={<a href="#about" className="group font-heading text-xl font-semibold text-lime">View Projects <span className="inline-block transition-transform group-hover:translate-x-1">→</span></a>}>Featured Projects</Heading>
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-3">
        {PROJECTS.map((p, i) => <Card key={p.k} p={p} i={i} onPlay={openReel} />)}
      </div>
    </section>
  );
}

/* ───────── SKILLS ───────── */
function Skills({ unlock }: { unlock: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <motion.section id="skills" onViewportEnter={unlock} viewport={{ once: true, amount: 0.5 }} className="rounded-[2rem] bg-[#12122b] p-6 ring-1 ring-white/10 md:p-8 lg:col-span-6">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2"><Heading>Skills</Heading>
      <div ref={box} className="flex flex-wrap gap-4 pb-1 pt-14">
        {SKILLS.map((s, i) => (
          <motion.div key={s.n} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: i * 0.07, stiffness: 220, damping: 12 }}>
            <motion.div drag dragConstraints={box} dragSnapToOrigin dragElastic={0.4} data-hover tabIndex={0} aria-label={`${s.n}, level ${s.lv}`}
              animate={{ y: [0, -9 - (i % 3) * 3, 0] }} transition={{ repeat: Infinity, duration: 2.6 + (i % 4) * 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1.25, rotate: 6 }} whileTap={{ scale: 0.92 }} onHoverStart={() => setHover(i)} onHoverEnd={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              className="relative grid h-16 w-16 cursor-grab place-items-center rounded-2xl bg-[#14143a] font-display text-3xl"
              style={{ color: s.c, border: `3px solid ${s.c}`, boxShadow: `0 0 18px ${s.c}88, inset 0 0 14px ${s.c}33` }}>
              {s.s}
              <AnimatePresence>
                {hover === i && (
                  <motion.div role="tooltip" initial={{ opacity: 0, y: 8, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="pointer-events-none absolute -top-[5.5rem] left-1/2 z-20 w-44 -translate-x-1/2 rounded-xl bg-navy p-3 text-left font-body text-sm text-paper ring-2 ring-white">
                    <b className="font-heading text-xl text-yellow">{s.n}</b><p className="text-lime">Level: {s.lv}</p><p className="text-xs">{s.note}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div></div>
    </motion.section>
  );
}

/* ───────── ABOUT ───────── */
function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.5, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) }); return () => c.stop(); } }, [inView, to]);
  return <motion.div ref={ref} whileHover={{ y: -5, rotate: -2 }} className="rounded-xl bg-white/5 px-3 py-2 text-center ring-1 ring-white/10"><p className="font-display text-3xl text-yellow">{v}+</p><p className="text-xs">{label}</p></motion.div>;
}

function Bust() {
  const draw = { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { duration: 1.6, ease: "easeInOut" as const } };
  return (
    <svg viewBox="0 0 220 260" className="w-full max-w-[230px]" style={{ filter: "drop-shadow(0 0 8px #3BE8FF)" }} aria-hidden>
      {["M60 120C52 50 100 24 110 40 122 24 170 50 160 120", "M62 120c0 40 20 66 48 66s48-26 48-66", "M20 260c0-50 40-72 90-72s90 22 90 72", "M80 150q8-4 14 0M126 150q8-4 14 0", "M92 168q18 14 36 0", "M130 205l50 10-8 40-52-10z"].map((d, i) => (
        <motion.path key={i} d={d} fill="none" stroke={i % 2 ? "#7B6BFF" : "#3BE8FF"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" {...draw} />
      ))}
      <motion.g animate={{ rotate: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 3 }} style={{ transformOrigin: "30px 40px" }}><Star className="w-7" /></motion.g>
    </svg>
  );
}

function About() {
  return (
    <section id="about" className="relative rounded-[2rem] bg-[#14142e] p-6 ring-1 ring-white/10 md:p-8 lg:col-span-6">
      <div className="grid items-center gap-6 sm:grid-cols-[230px_1fr]">
        <div className="relative mx-auto w-full max-w-[230px]"><img src="/img/bust.jpg" alt="" className="w-full rounded-2xl" style={{ filter: "drop-shadow(0 0 14px rgba(59,232,255,.5))" }} />
          <motion.div initial={{ scale: 0, rotate: -15 }} whileInView={{ scale: 1, rotate: -8 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.8 }} whileHover={{ rotate: 4, scale: 1.08 }}
            className="absolute -bottom-3 -right-4 w-36 rounded-xl bg-yellow px-3 py-2 text-center font-display text-xl leading-tight text-navy ring-2 ring-white">{P.sticker}</motion.div>
        </div>
        <div>
          <Heading>About Me</Heading>
          <motion.p initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-4 leading-relaxed text-paper/90">{P.about}</motion.p>
          <div className="mt-4 grid grid-cols-3 gap-3">{P.stats.map(([n, l]) => <Counter key={l} to={n} label={l} />)}</div>
          <a href="mailto:hello@example.com" className="group mt-5 inline-block font-heading text-2xl font-semibold text-lime">Get in touch! <span className="inline-block transition-transform group-hover:translate-x-2">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ───────── SOCIAL, FOOTER, REEL ───────── */
function Socials() {
  return (
    <nav aria-label="Social links" className="fixed bottom-0 left-0 right-0 z-40 flex justify-center gap-4 bg-navy/85 py-2 backdrop-blur md:bottom-auto md:left-3 md:right-auto md:top-1/2 md:-translate-y-1/2 md:flex-col md:bg-transparent md:py-0 md:backdrop-blur-none">
      {SOCIALS.map((s, i) => (
        <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 200, damping: 14 }} whileHover="hover" className="relative flex items-center">
          <motion.span variants={{ hover: { scale: 1.2, rotate: -8 } }} className="grid h-11 w-11 place-items-center rounded-full bg-yellow shadow-[0_0_16px_rgba(245,255,59,.5)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-navy"><path d={s.d} /></svg>
          </motion.span>
          <motion.span variants={{ hover: { opacity: 1, x: 0 } }} initial={{ opacity: 0, x: -10 }} className="pointer-events-none absolute left-14 hidden rounded-md bg-lime px-2 py-1 font-heading text-lg font-bold text-navy md:block">{s.label}</motion.span>
        </motion.a>
      ))}
    </nav>
  );
}

function Reel({ open, close }: { open: boolean; close: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [close]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Showreel" className="fixed inset-0 z-[95] grid place-items-center bg-navy/85 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div initial={{ scale: 0.6, rotate: -4, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black ring-2 ring-lime glow-lime">
            <video src="/showreel.mp4" controls autoPlay className="aspect-video w-full" />
            <button onClick={close} aria-label="Tutup" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-yellow font-display text-2xl text-navy">X</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────── ROOT ───────── */
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [reel, setReel] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const unlock = () => { setToast("Skill Tree terbuka! Coba tarik ikonnya."); setTimeout(() => setToast(null), 3500); };
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!loaded && <Intro done={() => setLoaded(true)} />}</AnimatePresence>
      {loaded && (
        <>
          <Particles /><Nav /><Cursor /><Socials /><Toast msg={toast} />
          <main className="relative z-10 mx-auto grid max-w-[1500px] gap-6 px-4 pb-10 pt-24 md:pl-20 lg:grid-cols-12">
            <Hero openReel={() => setReel(true)} />
            <Projects openReel={() => setReel(true)} />
            <Skills unlock={unlock} />
            <About />
          </main>
          <footer id="contact" className="relative z-10 px-6 pb-28 pt-8 text-center md:pb-14">
            <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring" }} className="font-display text-5xl text-yellow md:text-7xl">GAME CLEARED!</motion.p>
            <p className="mt-3">Mau bikin sesuatu bareng? <a className="text-lime underline" href="mailto:hello@example.com">Kirim pesan</a></p>
            <p className="mt-6 text-sm text-paper/60">© 2026 {P.brand}</p>
          </footer>
          <Reel open={reel} close={() => setReel(false)} />
        </>
      )}
    </MotionConfig>
  );
}
