const fs = require('fs');

const code = `"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

import {
  achievements,
  navLinks,
  profile,
  projects,
  skills,
  socials,
  stats,
  typewriterRoles,
  type Project,
  type Toast,
} from "@/lib/data";

/* ------------------------------------------------------------------ utils */

function useTypewriter(target: string, speed = 62) {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    if (txt === target) return;
    const typing = target.startsWith(txt);
    const next = typing ? target.slice(0, txt.length + 1) : target.slice(0, Math.max(0, txt.length - 1));
    const id = setTimeout(() => setTxt(next), typing ? speed : speed / 2);
    return () => clearTimeout(id);
  }, [txt, target, speed]);
  return txt;
}

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function AchievementSignal({ toast, push }: { toast: Toast; push: (t: Toast) => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const held = useRef(toast);
  held.current = toast;
  useEffect(() => {
    if (inView) push(held.current);
  }, [inView, push]);
  return <span ref={ref} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-px w-px" />;
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced()) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="comic-title text-5xl text-neon-yellow md:text-6xl">
      {n}{suffix}
    </span>
  );
}

function SectionHead({ id, title, sub, aside }: { id: string; title: string; sub: string; aside?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
      <div>
        <h2 id={id} className="hud text-3xl text-neon-yellow md:text-5xl">
          {title}
        </h2>
        <div className="mt-2 h-1 w-24 bg-gradient-to-r from-pink to-cyan rounded-full" />
        <p className="mt-3 max-w-[46rem] text-paper/70">{sub}</p>
      </div>
      {aside}
    </div>
  );
}

function Section({ id, label, children, className = "" }: { id: string; label: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-label={label} className={\`relative scroll-mt-32 \${className}\`}>
      {children}
    </section>
  );
}

/* ----------------------------------------------------------------- doodles */

function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 3l5 12 12 1-9.5 7.5L30 35l-10-6.5L10 35l2.5-11.5L3 16l12-1z" fill="#F5FF3B" stroke="#0D0B2A" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function SquiggleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 30" className={className} aria-hidden>
      <path d="M4 20c8-16 16 12 24-2s16 14 24-2 16 10 24-4" fill="none" stroke="#FF4FD8" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function SparkleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 2c1.5 9 6 13.5 18 18-12 4.5-16.5 9-18 18-1.5-9-6-13.5-18-18 12-4.5 16.5-9 18-18z" fill="#3BE8FF" stroke="#0D0B2A" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 60" className={className} aria-hidden>
      <path d="M6 8c30 2 46 16 50 40" fill="none" stroke="#F5FF3B" strokeWidth="5" strokeLinecap="round" />
      <path d="M44 40l12 10 6-14" fill="none" stroke="#F5FF3B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Parallax({
  px,
  py,
  rx,
  ry,
  className = "",
  children,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  rx: [number, number];
  ry: [number, number];
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(px, [0, 1], rx);
  const y = useTransform(py, [0, 1], ry);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ intro */

function Intro({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[70]" aria-hidden>
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 border-b-[3px] border-violet bg-navy"
        exit={{ y: "-101%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 border-t-[3px] border-violet bg-navy"
        exit={{ y: "101%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="text-center">
          <p className="comic-title text-7xl text-neon-yellow md:text-9xl">
            {count}
            <span className="text-4xl md:text-6xl">%</span>
          </p>
          <p className="hud mt-2 text-sm text-cyan md:text-base">LOADING ASSETS...</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------- HUD */

function XpHud() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const scaleX = useTransform(smooth, [0, 1], [0.02, 1]);
  const [level, setLevel] = useState(1);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    const nextPct = Math.round(v * 100);
    const nextLv = Math.min(5, Math.floor(v * 5) + 1);
    setPct((p) => (p === nextPct ? p : nextPct));
    setLevel((l) => (l === nextLv ? l : nextLv));
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy/95 backdrop-blur-md border-b-[3px] border-violet">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <a href="#home" className="comic-title shrink-0 text-3xl text-paper" aria-label="Ke atas">
          STEPHEN<span className="text-lime">.</span>
        </a>

        <nav aria-label="Navigasi utama" className="no-scrollbar hidden min-w-0 flex-1 items-center justify-center gap-6 overflow-x-auto md:flex">
          {navLinks.map((l) => (
            <a key={l.id} href={\`#\${l.id}\`} className="hud whitespace-nowrap text-base text-paper/70 transition-colors hover:text-lime">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.span
            key={level}
            initial={{ scale: 1.35, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 16 }}
            className="hud shrink-0 rounded-md border-[2px] border-lime bg-lime px-2 py-0.5 text-sm text-navy"
            aria-label={\`Level \${level}\`}
          >
            LV{level}
          </motion.span>
          <a href="#contact" className="hud hidden md:block rounded-xl border-[2px] border-navy bg-neon-yellow px-5 py-2 text-sm text-navy hover:bg-lime transition-colors">
            HIRE ME
          </a>
        </div>
      </div>
      <div className="h-[3px] w-full overflow-hidden bg-purple relative">
        <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan to-pink origin-left" style={{ scaleX, right: 0 }} />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- cursor */

function CursorFollower() {
  const [fine, setFine] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 });

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches && !prefersReduced());
  }, []);

  useEffect(() => {
    if (!fine) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as Element | null;
      setBig(!!el && typeof el.closest === "function" && !!el.closest("a, button, [data-cursor='big']"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] -ml-4 -mt-4 h-8 w-8 rounded-full border-[3px] border-cyan"
      style={{ x: sx, y: sy }}
      animate={{ scale: big ? 1.9 : 1, backgroundColor: big ? "rgba(59,232,255,0.25)" : "rgba(59,232,255,0)" }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
    />
  );
}

/* ---------------------------------------------------------------- toasts */

function ToastItem({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  useEffect(() => {
    const id = setTimeout(() => onClose(toast.id), 4200);
    return () => clearTimeout(id);
  }, [toast.id, onClose]);

  return (
    <motion.div
      layout
      role="status"
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="bento-card pointer-events-auto flex w-72 items-start gap-3 p-4 shadow-[5px_5px_0_#3A1D8F]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-2 border-navy bg-lime text-navy">
        <StarDoodle className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="hud text-sm text-lime">{toast.title}</p>
        <p className="text-sm leading-snug text-paper/80 mt-1">{toast.body}</p>
      </div>
      <button onClick={() => onClose(toast.id)} aria-label="Tutup notifikasi" className="hud ml-auto shrink-0 text-lg leading-none text-paper/60 hover:text-neon-yellow">
        X
      </button>
    </motion.div>
  );
}

function ToastStack({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[65] flex flex-col gap-3 md:bottom-10 md:right-10" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------- avatar */

function Avatar({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const pupilX = useTransform(px, [0, 1], [-5, 5]);
  const pupilY = useTransform(py, [0, 1], [-4, 4]);
  const controls = useAnimationControls();

  const poke = () => {
    controls.start({ y: [0, -28, 0], transition: { duration: 0.5, ease: "easeOut" } });
  };

  return (
    <motion.div className="animate-float relative mx-auto aspect-square w-[75%] max-w-[320px]" aria-hidden>
      <motion.div animate={controls} onClick={poke} data-cursor="big" className="cursor-pointer relative w-full h-full" whileHover={{ scale: 1.04 }}>
        <div className="absolute inset-0 bg-cyan/20 blur-3xl rounded-full" />
        <Image
          src="/avatar.jpeg"
          alt="Avatar Stephen"
          fill
          className="object-contain drop-shadow-[0_0_20px_rgba(59,232,255,0.4)] rounded-[40px] z-10"
          priority
        />
        <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full overflow-visible pointer-events-none z-20">
          <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }} animate={{ scaleY: [1, 1, 0.06, 1, 1] }} transition={{ duration: 0.34, times: [0, 0.4, 0.5, 0.6, 1], repeat: Infinity, repeatDelay: 3.5 }}>
            <ellipse cx="86" cy="100" rx="16" ry="18" fill="#F4F2FF" stroke="#0D0B2A" strokeWidth="4" />
            <ellipse cx="136" cy="100" rx="16" ry="18" fill="#F4F2FF" stroke="#0D0B2A" strokeWidth="4" />
            <motion.g style={{ x: pupilX, y: pupilY }}>
              <circle cx="86" cy="102" r="7.5" fill="#0D0B2A" />
              <circle cx="136" cy="102" r="7.5" fill="#0D0B2A" />
              <circle cx="89" cy="98.5" r="2.6" fill="#F4F2FF" />
              <circle cx="139" cy="98.5" r="2.6" fill="#F4F2FF" />
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ showreel modal */

function ShowreelModal({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const [videoOk, setVideoOk] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>("button, video[controls], a[href]");
      if (!nodes || nodes.length === 0) return;
      const list = Array.from(nodes);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreRef.current?.focus();
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
        >
          <motion.div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bento-card w-full max-w-4xl p-5 shadow-[10px_10px_0_#3BE8FF]"
          >
            <div className="mb-4 flex items-center justify-between gap-4 border-b-2 border-violet pb-4">
              <p className="hud text-xl text-cyan">SHOWREEL 2026</p>
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                aria-label="Tutup showreel"
                className="hud rounded-lg border-2 border-violet px-3 py-1 text-sm text-paper hover:border-pink hover:text-pink transition-colors"
              >
                ESC / X
              </button>
            </div>
            {videoOk ? (
              <video
                src="/showreel.mp4"
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoOk(false)}
                className="aspect-video w-full rounded-xl border-2 border-violet bg-navy"
              />
            ) : (
              <div className="grid aspect-video place-items-center rounded-xl border-2 border-violet bg-navy p-6 text-center">
                <div>
                  <p className="hud text-2xl text-pink">VIDEO BELUM DIPASANG</p>
                  <p className="mt-3 text-paper/70">
                    Taruh file di <code className="text-lime">public/showreel.mp4</code> untuk mengaktifkan showreel.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ hero */

const rainbowColors = ["text-neon-yellow", "text-lime", "text-cyan", "text-pink", "text-neon-green", "text-paper", "text-neon-yellow"];

function Hero({ px, py, ready, push, onShowreel }: { px: MotionValue<number>; py: MotionValue<number>; ready: boolean; push: (t: Toast) => void; onShowreel: () => void }) {
  const words = profile.shortName.split("");
  const typed = useTypewriter("Hi, I'm " + profile.shortName + "!");

  return (
    <Section id="home" label="Sapaan" className="bento-card p-6 md:p-10 shadow-[8px_8px_0_#3A1D8F]">
      <AchievementSignal toast={achievements.hero} push={push} />

      <Parallax px={px} py={py} rx={[-26, 26]} ry={[-18, 18]} className="pointer-events-none absolute left-6 top-6">
        <StarDoodle className="animate-float h-10 w-10 md:h-14 md:w-14" />
      </Parallax>
      <Parallax px={px} py={py} rx={[20, -20]} ry={[14, -14]} className="pointer-events-none absolute right-10 top-16">
        <SparkleDoodle className="animate-spin-slow h-10 w-10 md:h-12 md:w-12" />
      </Parallax>

      <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <div className="relative inline-block mb-6">
            <div className="rounded-2xl border-[3px] border-violet bg-navy px-5 py-3 shadow-[4px_4px_0_#3A1D8F]">
              <p className="hud text-sm md:text-base text-paper">{typed}<span className="animate-pulse text-pink">|</span></p>
            </div>
            <ArrowDoodle className="absolute -bottom-10 -right-8 h-12 w-12 hidden sm:block" />
          </div>

          <h1 className="comic-title flex flex-wrap text-[16vw] sm:text-7xl lg:text-[5.5rem] leading-[0.9]">
            {words.map((ch, ci) => (
              <motion.span
                key={ci}
                initial={{ y: "50%", opacity: 0 }}
                animate={ready ? { y: "0%", opacity: 1 } : { y: "50%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.2 + ci * 0.05 }}
                className={rainbowColors[ci % rainbowColors.length]}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8 }} className="mt-8 space-y-3">
            <p className="hud text-lg md:text-xl text-cyan">FULL-STACK DEVELOPER <span className="text-violet">•</span> UI/UX DESIGNER</p>
            <p className="text-paper/70 max-w-lg">Bikin aplikasi yang cepat, rapi, dan enak dipakai. Dari wireframe sampai deploy.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ delay: 1 }} className="mt-10 flex flex-wrap gap-4">
            <button onClick={onShowreel} className="hud group flex items-center gap-3 rounded-full border-[3px] border-navy bg-lime px-6 py-3 text-navy shadow-[6px_6px_0_#3A1D8F] transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_#3A1D8F]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-lime group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
              </span>
              WATCH SHOWREEL
            </button>
            <a href="#projects" className="hud rounded-full border-[3px] border-cyan bg-navy px-6 py-3 text-cyan shadow-[6px_6px_0_#3BE8FF] transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_#3BE8FF]">
              EXPLORE PROJECTS
            </a>
          </motion.div>
        </div>

        <div className="relative w-full max-w-[320px] mx-auto lg:mx-0">
          <Avatar px={px} py={py} />
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- projects */

const accents: Record<Project["accent"], { bar: string; text: string; shadow: string }> = {
  yellow: { bar: "bg-neon-yellow", text: "text-neon-yellow", shadow: "shadow-[6px_6px_0_#F5FF3B] group-hover:shadow-[10px_10px_0_#F5FF3B]" },
  green: { bar: "bg-neon-green", text: "text-neon-green", shadow: "shadow-[6px_6px_0_#39FF88] group-hover:shadow-[10px_10px_0_#39FF88]" },
  violet: { bar: "bg-violet", text: "text-paper", shadow: "shadow-[6px_6px_0_#6B49C9] group-hover:shadow-[10px_10px_0_#6B49C9]" },
  lime: { bar: "bg-lime", text: "text-lime", shadow: "shadow-[6px_6px_0_#B6FF2B] group-hover:shadow-[10px_10px_0_#B6FF2B]" },
  cyan: { bar: "bg-cyan", text: "text-cyan", shadow: "shadow-[6px_6px_0_#3BE8FF] group-hover:shadow-[10px_10px_0_#3BE8FF]" },
  pink: { bar: "bg-pink", text: "text-pink", shadow: "shadow-[6px_6px_0_#FF4FD8] group-hover:shadow-[10px_10px_0_#FF4FD8]" },
};

function ProjectCard({ project }: { project: Project }) {
  const accent = accents[project.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      data-cursor="big"
      whileHover={{ y: -6 }}
      className={\`group bento-card flex flex-col p-6 transition-shadow duration-300 \${accent.shadow} bg-card\`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className={\`hud text-4xl \${accent.text}\`}>{project.no}</span>
        <button aria-label="Lihat Proyek" className={\`grid h-10 w-10 place-items-center rounded-full border-2 border-navy \${accent.bar} text-navy group-hover:scale-110 transition-transform\`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
        </button>
      </div>
      
      <div className="flex-1">
        <h3 className="hud text-2xl text-paper mb-2">{project.title}</h3>
        <p className="text-sm text-paper/70 mb-5">{project.desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <span key={s} className="chip text-paper/85 text-xs">
              {s}
            </span>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-violet/50 mt-auto">
        <p className={\`hud text-xs \${accent.text}\`}>ROLE: {project.role}</p>
      </div>
    </motion.article>
  );
}

function Projects({ push }: { push: (t: Toast) => void }) {
  return (
    <Section id="projects" label="Proyek unggulan" className="h-full">
      <AchievementSignal toast={achievements.projects} push={push} />
      <SectionHead
        id="projects-title"
        title="FEATURED PROJECTS"
        sub="Karya unggulan dari end-to-end web app sampai eksplorasi AI."
        aside={<a href="#" className="hud text-lime hover:underline">VIEW ALL &rarr;</a>}
      />
      <div className="grid sm:grid-cols-2 gap-6 h-full content-start">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- skills */

function Skills({ push }: { push: (t: Toast) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="skills" label="Skillset" className="bento-card p-6 md:p-10 shadow-[8px_8px_0_#3A1D8F]">
      <AchievementSignal toast={achievements.skills} push={push} />
      <SectionHead id="skills-title" title="TECH STACK" sub="Bisa ditarik dan diputar. Hover buat lihat detail." />

      <div ref={wrapRef} className="relative flex flex-wrap justify-center gap-6 md:gap-8 pt-4 pb-8">
        {skills.map((s, i) => (
          <div key={s.name} className="relative" onPointerEnter={() => setHovered(i)} onPointerLeave={() => setHovered((h) => (h === i ? null : h))}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}>
              <motion.div
                drag
                dragSnapToOrigin
                dragConstraints={wrapRef}
                dragElastic={0.4}
                whileDrag={{ scale: 1.15, zIndex: 30, rotate: 5 }}
                data-cursor="big"
                className="panel hud grid h-16 w-16 cursor-grab select-none place-items-center rounded-2xl text-xl text-cyan transition-colors hover:border-lime hover:text-lime active:cursor-grabbing md:h-20 md:w-20 md:text-2xl shadow-[4px_4px_0_#3A1D8F]"
                aria-label={\`\${s.name}, level \${s.level} dari 5\`}
              >
                {s.abbr}
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {hovered === i && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-48 -translate-x-1/2">
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: 0.95 }} className="rounded-xl border-[2px] border-cyan bg-navy p-3 text-left shadow-[4px_4px_0_#3A1D8F]">
                    <p className="hud text-sm text-cyan">{s.name}</p>
                    <p className="mt-1 text-xs text-paper/80">{s.note}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-purple overflow-hidden">
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: s.level / 5 }} className="h-full origin-left bg-lime" />
                      </div>
                      <span className="hud text-[10px] text-lime">LV{s.level}</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- about */

function About({ push }: { push: (t: Toast) => void }) {
  return (
    <Section id="about" label="Tentang Stephen" className="bento-card p-6 md:p-10 shadow-[8px_8px_0_#3A1D8F]">
      <AchievementSignal toast={achievements.about} push={push} />
      <SectionHead id="about-title" title="ABOUT ME" sub="Latar belakang dan side quest." />

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-paper/80">
            Lulusan <strong className="text-lime">{profile.school}</strong> jurusan {profile.major}. 
            Buatku, engineering dan desain itu dua sisi koin yang sama: kode yang kencang tapi bikin bingung tetap gagal.
          </p>
          <p className="mt-4 text-paper/80">
            Pengalamanku mencakup magang di <strong className="text-cyan">{profile.internship}</strong> sebagai Frontend Web Developer, dan freelance di <strong className="text-pink">{profile.freelance}</strong> sebagai Full-Stack Developer.
          </p>
          <a href="#contact" className="hud mt-6 inline-flex items-center gap-2 text-neon-yellow hover:text-lime group">
            GET IN TOUCH 
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="panel p-4 text-center border-cyan shadow-[4px_4px_0_#3BE8FF]">
            <Counter to={stats[0].value} suffix={stats[0].suffix} />
            <p className="hud mt-1 text-[10px] text-paper/70">{stats[0].label}</p>
          </div>
          <div className="panel p-4 text-center border-pink shadow-[4px_4px_0_#FF4FD8]">
            <Counter to={stats[1].value} suffix={stats[1].suffix} />
            <p className="hud mt-1 text-[10px] text-paper/70">{stats[1].label}</p>
          </div>
          <div className="panel p-4 text-center border-lime shadow-[4px_4px_0_#B6FF2B] col-span-2">
            <Counter to={stats[2].value} suffix={stats[2].suffix} />
            <p className="hud mt-1 text-[10px] text-paper/70">{stats[2].label}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- contact */

function SocialIcon({ kind }: { kind: (typeof socials)[number]["icon"] }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-5 w-5", "aria-hidden": true };
  if (kind === "code") return <svg {...common}><path d="M9 7 4 12l5 5" /><path d="m15 7 5 5-5 5" /></svg>;
  if (kind === "in") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M7.5 10.5V17M7.5 7.2v.1M11.5 17v-3.6a2.2 2.2 0 0 1 4.4 0V17" /></svg>;
  return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7.5 8 5.5 8-5.5" /></svg>;
}

function Contact() {
  return (
    <Section id="contact" label="Kontak" className="bento-card p-8 md:p-12 text-center shadow-[8px_8px_0_#3A1D8F] lg:col-span-2">
      <SquiggleDoodle className="animate-float absolute left-10 top-10 h-10 w-24 hidden md:block" />
      <SparkleDoodle className="animate-spin-slow absolute bottom-10 right-10 h-10 w-10 hidden md:block" />
      <p className="hud text-sm text-lime">MISI TERAKHIR</p>
      <h2 className="comic-title mt-3 text-5xl text-neon-yellow md:text-7xl">Let's Work Together!</h2>
      <p className="mx-auto mt-4 max-w-lg text-paper/75">
        Terbuka untuk proyek freelance, kolaborasi, dan peluang full-time. Balasannya cepat, diskusinya asyik.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a href={socials[2].href} className="hud rounded-full border-[3px] border-navy bg-lime px-8 py-4 text-lg text-navy shadow-[6px_6px_0_#3A1D8F] transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_#3A1D8F]">
          SAY HELLO
        </a>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ social rail */

function SocialRail({ ready }: { ready: boolean }) {
  const labelCls = "hud absolute left-full ml-3 whitespace-nowrap rounded-md border-2 border-violet bg-navy px-2 py-1 text-xs text-lime opacity-0 translate-x-[-6px] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100";

  return (
    <>
      <motion.nav aria-label="Tautan sosial" initial="hidden" animate={ready ? "show" : "hidden"} className="fixed left-5 bottom-10 z-40 hidden flex-col gap-3 lg:flex">
        {socials.map((s, i) => (
          <motion.a key={s.id} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={s.label} custom={i} variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 17, delay: 1.1 + i * 0.1 } } }} whileHover={{ scale: 1.1 }} className="group relative grid h-12 w-12 place-items-center rounded-2xl border-[2px] border-violet bg-card text-paper transition-colors hover:border-lime hover:text-lime shadow-[4px_4px_0_#3A1D8F]">
            <SocialIcon kind={s.icon} />
            <span className={labelCls}>{s.label}</span>
          </motion.a>
        ))}
      </motion.nav>

      <nav aria-label="Tautan sosial" className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t-[3px] border-violet bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        {socials.map((s) => (
          <a key={s.id} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hud flex items-center gap-2 text-xs text-paper hover:text-lime">
            <SocialIcon kind={s.icon} />
            {s.label}
          </a>
        ))}
      </nav>
    </>
  );
}

/* ------------------------------------------------------------------ root */

export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showreelOpen, setShowreelOpen] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      px.set(e.clientX / Math.max(1, window.innerWidth));
      py.set(e.clientY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [px, py]);

  const push = useCallback((t: Toast) => {
    setToasts((prev) => (prev.some((x) => x.id === t.id) ? prev : [...prev.slice(-2), t]));
  }, []);
  const closeToast = useCallback((id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {ready ? null : <Intro key="intro" onDone={() => setReady(true)} />}
      </AnimatePresence>

      <XpHud />
      <CursorFollower />
      <SocialRail ready={ready} />
      <ToastStack toasts={toasts} onClose={closeToast} />
      <ShowreelModal open={showreelOpen} setOpen={setShowreelOpen} />

      <main className="pb-24 lg:pb-16 pt-24 md:pt-32 px-5 md:px-10 lg:px-24 max-w-[1920px] mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">
          <div className="flex flex-col gap-8">
            <Hero px={px} py={py} ready={ready} push={push} onShowreel={() => setShowreelOpen(true)} />
            <Skills push={push} />
            <About push={push} />
          </div>
          <div className="flex flex-col gap-8 h-full">
            <Projects push={push} />
          </div>
          <Contact />
        </div>
      </main>

      <footer className="border-t-[3px] border-violet bg-card px-5 py-8 text-center text-sm text-paper/60 pb-28 lg:pb-8">
        <p className="hud text-cyan">STEPHEN WIJAYA UTAMA</p>
        <p className="mt-2">
          © 2026 · Dibangun dengan Next.js, Tailwind CSS & Framer Motion ·{" "}
          <a href="#home" className="text-lime hover:underline">ke atas</a>
        </p>
      </footer>
    </MotionConfig>
  );
}
`
fs.writeFileSync('components/Portfolio.tsx', code);
