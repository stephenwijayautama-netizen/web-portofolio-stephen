"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
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
  type Project,
  type Toast,
} from "@/lib/data";

/* ------------------------------------------------------------------ doodles & icons */

function CrownDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 45" className={className} aria-hidden fill="none">
      <path
        d="M6 36L10 12L24 24L30 6L36 24L50 12L54 36Z"
        fill="#C7F200"
        stroke="#000000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="11" r="3.5" fill="#F5FF3B" stroke="#000000" strokeWidth="2.5" />
      <circle cx="30" cy="5" r="4" fill="#38BDF8" stroke="#000000" strokeWidth="2.5" />
      <circle cx="50" cy="11" r="3.5" fill="#F5FF3B" stroke="#000000" strokeWidth="2.5" />
      <path d="M7 36H53" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function StarDoodle({ className = "", color = "#F5FF3B" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M20 3l5 12 12 1-9.5 7.5L30 35l-10-6.5L10 35l2.5-11.5L3 16l12-1z"
        fill={color}
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleDoodle({ className = "", color = "#38BDF8" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M20 2c1.5 9 6 13.5 18 18-12 4.5-16.5 9-18 18-1.5-9-6-13.5-18-18 12-4.5 16.5-9 18-18z"
        fill={color}
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WavySquiggle({ className = "", color = "#FF7836" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 24" className={className} aria-hidden fill="none">
      <path
        d="M4 12c10-14 20 14 30 0s20 14 30 0 8-7 12-7"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoopSquiggle({ className = "", color = "#7952F5" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden fill="none">
      <path
        d="M10 40c20-30 40-40 60-15s-10 35-30 20 20-30 50-10"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClapperDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden fill="none">
      <rect x="6" y="16" width="38" height="26" rx="4" fill="#121324" stroke="#38BDF8" strokeWidth="3" />
      <path d="M6 16l38-8v8H6z" fill="#C7F200" stroke="#000" strokeWidth="2.5" />
      <path d="M14 14l5-6M24 12l5-6M34 10l5-6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="21,25 21,35 31,30" fill="#38BDF8" />
    </svg>
  );
}

function MouseScrollIndicator() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="w-5 h-8 rounded-full border-2 border-paper/40 flex justify-center pt-1.5">
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-2 rounded-full bg-lime"
        />
      </div>
      <span className="hud text-xs text-paper/60 tracking-wider">SCROLL DOWN</span>
    </div>
  );
}

/* ------------------------------------------------------------------ intro */

function Intro({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 750);
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
        className="absolute inset-x-0 top-0 h-1/2 border-b-[2px] border-violet/40 bg-navy"
        exit={{ y: "-101%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 border-t-[2px] border-violet/40 bg-navy"
        exit={{ y: "101%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-center">
          <p className="font-marker-text text-7xl text-lime md:text-9xl tracking-wider">
            {count}
            <span className="text-4xl text-neon-yellow md:text-6xl">%</span>
          </p>
          <p className="hud mt-2 text-xs text-cyan tracking-widest md:text-sm">LOADING EXPERIENCE...</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ navbar */

function Navbar() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const scaleX = useTransform(smooth, [0, 1], [0.02, 1]);
  const [level, setLevel] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(smooth, "change", (v) => {
    const nextLv = Math.min(5, Math.floor(v * 5) + 1);
    setLevel(nextLv);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#090a16]/90 backdrop-blur-md border-b border-[#212448]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" className="flex items-center gap-1 group" aria-label="Ke atas">
          <span className="font-heading font-black text-2xl md:text-3xl tracking-tight text-white group-hover:text-lime transition-colors">
            STEPHEN
          </span>
          <span className="h-2 w-2 rounded-full bg-lime inline-block" />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm font-semibold text-lime transition-colors">
            Home
          </a>
          <a href="#projects" className="text-sm font-medium text-paper/75 hover:text-white transition-colors">
            Projects
          </a>
          <a href="#skills" className="text-sm font-medium text-paper/75 hover:text-white transition-colors">
            Skills
          </a>
          <a href="#about" className="text-sm font-medium text-paper/75 hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-paper/75 hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-3">
          <span className="hud hidden sm:inline-block rounded-full border border-lime/40 bg-lime/10 px-3 py-1 text-xs text-lime">
            LV{level} EXP
          </span>
          <a
            href="#contact"
            className="hud hidden sm:inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2 text-xs text-white hover:bg-violet/80 transition-colors shadow-[0_0_15px_rgba(108,66,245,0.4)]"
          >
            LET'S TALK
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-violet/40 bg-violet/20 text-white"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] w-full overflow-hidden bg-[#12132a] relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime via-cyan to-pink origin-left"
          style={{ scaleX, right: 0 }}
        />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0e1022] border-b border-[#212448] px-6 py-4 flex flex-col gap-3"
          >
            <a onClick={() => setMenuOpen(false)} href="#home" className="text-base font-semibold text-lime py-1">
              Home
            </a>
            <a onClick={() => setMenuOpen(false)} href="#projects" className="text-base text-paper/80 py-1">
              Projects
            </a>
            <a onClick={() => setMenuOpen(false)} href="#skills" className="text-base text-paper/80 py-1">
              Skills
            </a>
            <a onClick={() => setMenuOpen(false)} href="#about" className="text-base text-paper/80 py-1">
              About
            </a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className="text-base text-paper/80 py-1">
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero({ onShowreel }: { onShowreel: () => void }) {
  const [bubbleText, setBubbleText] = useState("LET'S CREATE SOMETHING AWESOME!");
  const bubbleControls = useAnimationControls();

  const handleCharacterClick = () => {
    const quotes = [
      "LET'S CREATE SOMETHING AWESOME!",
      "READY TO LEVEL UP TOGETHER?",
      "CLEAN CODE & SLEEK DESIGN!",
      "FULL-STACK POWER UNLOCKED!",
    ];
    const next = quotes[Math.floor(Math.random() * quotes.length)];
    setBubbleText(next);
    bubbleControls.start({ scale: [1, 1.15, 1], transition: { duration: 0.3 } });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glow swirls */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-20 h-[400px] w-[400px] rounded-full bg-cyan/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="md:col-span-7 flex flex-col items-start z-10">
            {/* Top greeting */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-handwritten text-3xl md:text-4xl text-paper/90 -rotate-3 inline-block">
                Hey,
              </span>
              <span className="font-heading font-black tracking-widest text-xl md:text-2xl text-paper uppercase">
                I'M
              </span>
            </div>

            {/* Massive Graffiti Title */}
            <div className="relative my-1">
              {/* Crown doodle perched on the 'S' */}
              <div className="absolute -top-7 -left-3 md:-top-9 md:-left-4 z-20 -rotate-12">
                <CrownDoodle className="w-12 h-9 md:w-16 md:h-12 drop-shadow-[0_4px_10px_rgba(199,242,0,0.5)]" />
              </div>

              {/* Sparkles around name */}
              <SparkleDoodle className="absolute -top-4 -right-6 md:-right-8 w-8 h-8 md:w-10 md:h-10 text-cyan animate-pulse" />
              <StarDoodle className="absolute -bottom-2 -left-8 w-6 h-6 text-neon-yellow hidden sm:block" />

              <h1 className="font-marker-text text-[4.5rem] sm:text-8xl md:text-9xl lg:text-[8.5rem] leading-[0.9] text-white tracking-tight uppercase select-none drop-shadow-[5px_5px_0px_#000] [text-shadow:_4px_4px_0_#000,_8px_8px_0_#1b1145]">
                STEPHEN
              </h1>
            </div>

            {/* Subtitle / Roles */}
            <div className="mt-4 flex flex-wrap items-center gap-2 font-heading font-bold uppercase tracking-wider text-sm sm:text-base md:text-lg text-paper/90">
              <span className="text-cyan">Full-Stack Web Developer</span>
              <span className="text-violet">•</span>
              <span className="text-lime">UI/UX Designer</span>
              <span className="text-violet">•</span>
              <span className="text-neon-yellow">Creative Technologist</span>
            </div>

            {/* Brief description */}
            <p className="mt-4 max-w-xl text-base text-paper/75 leading-relaxed">
              Membangun aplikasi web berperforma tinggi, arsitektur database andal, dan desain antarmuka interaktif yang bikin pengguna jatuh cinta.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                onClick={onShowreel}
                className="group flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-base md:text-lg font-bold text-navy shadow-[0_0_25px_rgba(199,242,0,0.4)] transition-all hover:scale-105 hover:bg-[#d8ff1a] active:scale-95"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-lime transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="hud">Watch Showreel</span>
              </button>

              <a
                href="#projects"
                className="group flex items-center gap-2 rounded-full border border-[#212448] bg-[#121324] px-7 py-3.5 text-sm md:text-base font-bold text-paper transition-all hover:border-cyan hover:text-cyan hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
              >
                <span className="hud">View Projects</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>

            {/* Scroll Down */}
            <div className="mt-12 hidden md:block">
              <MouseScrollIndicator />
            </div>
          </div>

          {/* Right Column: Hero Character & Speech Bubble */}
          <div className="md:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              {/* Backglow and aura */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-violet/30 via-cyan/20 to-lime/20 blur-2xl -z-10" />

              {/* Comic Speech Bubble */}
              <motion.div
                animate={bubbleControls}
                className="absolute -top-10 -left-4 sm:-top-12 sm:-left-8 z-30 select-none cursor-pointer"
                onClick={handleCharacterClick}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative rounded-2xl border-[3px] border-black bg-[#0099ff] px-4 py-2.5 shadow-[4px_4px_0_#000]">
                  <p className="font-heading font-black text-xs sm:text-sm text-white tracking-wide uppercase">
                    {bubbleText}
                  </p>
                  {/* Bubble pointer triangle */}
                  <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black">
                    <div className="absolute -top-3 -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0099ff]" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Clapperboard doodle */}
              <div className="absolute -bottom-4 -left-4 z-20 -rotate-6">
                <ClapperDoodle className="w-12 h-12 drop-shadow-[0_4px_10px_rgba(56,189,248,0.5)]" />
              </div>

              {/* Sparkle right */}
              <div className="absolute top-1/4 -right-4 z-20">
                <StarDoodle className="w-8 h-8 text-lime animate-spin-slow" />
              </div>

              {/* Main Character Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={handleCharacterClick}
                className="relative cursor-pointer overflow-hidden rounded-[32px] border-2 border-[#212448] bg-[#0c0d1e] shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-[2/3] w-full"
              >
                <Image
                  src="/p1.jpg"
                  alt="Stephen Wijaya Utama Character"
                  fill
                  priority
                  className="object-cover object-top select-none transition-transform duration-500 hover:scale-105"
                />

                {/* Subtle bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090a16] to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ showreel card */

function ShowreelSection({ onWatch }: { onWatch: () => void }) {
  return (
    <section id="showreel" className="py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="bento-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#121324] border border-[#212448]">
          {/* Left Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <StarDoodle className="w-5 h-5 text-neon-yellow" />
              <span className="hud text-xs text-neon-yellow tracking-widest">SHOWREEL</span>
            </div>
            <h3 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
              A quick glimpse of my work
            </h3>
            <p className="mt-2 text-sm text-paper/70 leading-relaxed">
              Kompilasi interaksi desain, dynamic motion, dan antarmuka web modern yang siap membawa ide digitalmu ke tingkat berikutnya.
            </p>
            <button
              onClick={onWatch}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime hover:text-white transition-colors group"
            >
              <span>Watch Now</span>
              <span className="transition-transform group-hover:translate-x-1">➔</span>
            </button>
          </div>

          {/* Right Video Thumbnail */}
          <div
            onClick={onWatch}
            className="group relative w-full md:w-[480px] aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer border border-[#212448] shadow-2xl"
          >
            <Image
              src="/showreel_thumb.jpg"
              alt="Synthwave Showreel Thumbnail"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-16 w-16 rounded-full bg-lime/30 animate-ping" />
                <div className="relative h-14 w-14 rounded-full bg-lime text-navy flex items-center justify-center shadow-[0_0_20px_rgba(199,242,0,0.6)] group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ featured projects */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const accentBorder = {
    yellow: "hover:border-neon-yellow hover:shadow-[0_0_25px_rgba(245,255,59,0.25)]",
    cyan: "hover:border-cyan hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]",
    pink: "hover:border-pink hover:shadow-[0_0_25px_rgba(255,79,216,0.25)]",
    green: "hover:border-neon-green hover:shadow-[0_0_25px_rgba(57,255,136,0.25)]",
    lime: "hover:border-lime hover:shadow-[0_0_25px_rgba(199,242,0,0.25)]",
    violet: "hover:border-violet hover:shadow-[0_0_25px_rgba(121,82,245,0.25)]",
  }[project.accent];

  const tagColor = {
    yellow: "text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10",
    cyan: "text-cyan border-cyan/30 bg-cyan/10",
    pink: "text-pink border-pink/30 bg-pink/10",
    green: "text-neon-green border-neon-green/30 bg-neon-green/10",
    lime: "text-lime border-lime/30 bg-lime/10",
    violet: "text-violet border-violet/30 bg-violet/10",
  }[project.accent];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className={`bento-card bg-[#121324] border border-[#212448] flex flex-col overflow-hidden transition-all duration-300 ${accentBorder}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#090a16]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Number badge */}
        <div className="absolute top-3 left-3">
          <span className={`hud px-2.5 py-1 rounded-md text-xs font-bold border ${tagColor}`}>
            {project.no}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-paper/60 uppercase tracking-wider mb-1">
            {project.category}
          </p>
          <h3 className="font-heading font-black text-xl text-white tracking-tight uppercase mb-2">
            {project.title}
          </h3>
          <p className="text-xs text-paper/75 line-clamp-2 leading-relaxed mb-4">
            {project.desc}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.map((s) => (
              <span key={s} className="chip text-[11px] text-paper/80 py-0.5 px-2">
                {s}
              </span>
            ))}
          </div>
          <div className="pt-2 border-t border-[#212448] flex items-center justify-between text-xs">
            <span className="hud text-paper/60">ROLE: {project.role}</span>
            <button
              onClick={() => onOpen(project)}
              className="text-lime hover:underline font-bold"
            >
              DETAILS ↗
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProjectsSection({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
              FEATURED PROJECTS
            </h2>
            <WavySquiggle className="w-12 h-5 text-orange" />
          </div>
          <a
            href="https://github.com/stephenwut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm font-bold text-lime hover:underline flex items-center gap-1"
          >
            <span>View All Projects</span>
            <span>➔</span>
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.no} project={p} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ skills */

function SkillTile({ skill }: { skill: (typeof skills)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.4 } }}
      className="group relative flex flex-col items-center select-none cursor-pointer"
    >
      <motion.div
        whileHover={{
          boxShadow: `0 0 25px ${skill.color}66`,
          borderColor: skill.color,
        }}
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#121324] border border-[#212448] flex flex-col items-center justify-center p-3 shadow-lg transition-all duration-300"
      >
        <div className="relative w-8 h-8 md:w-10 md:h-10 mb-2 group-hover:scale-110 transition-transform duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`https://cdn.simpleicons.org/${skill.iconSlug}/${skill.color.replace('#', '')}`}
            alt={skill.name}
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
        <span className="text-[11px] font-bold text-paper/80 group-hover:text-white text-center leading-tight">
          {skill.name}
        </span>
      </motion.div>

      {/* Level stars / indicator below tile */}
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ 
              scale: i < skill.level ? [1, 1.2, 1] : 1,
              backgroundColor: i < skill.level ? skill.color : "#212448" 
            }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="h-1.5 w-1.5 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
              SKILLS
            </h2>
            <LoopSquiggle className="w-14 h-8 text-violet" />
          </div>
          <p className="mt-1 text-sm text-paper/70">
            Perangkat lunak, framework, dan teknologi yang saya gunakan sehari-hari.
          </p>
        </div>

        {/* Software / Tech Badges Grid */}
        <div className="bento-card p-8 md:p-10 bg-[#121324] border border-[#212448]">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
            {skills.map((s) => (
              <SkillTile key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ about me */

function AboutMeSection() {
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Illustration Card with "Focus Consistency" */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[28px] overflow-hidden border-2 border-lime/40 bg-[#0e1022] shadow-[0_10px_35px_rgba(199,242,0,0.2)]">
              {/* Badge sticker */}
              <div className="absolute top-4 left-4 z-20">
                <span className="hud bg-lime text-navy px-3 py-1 rounded-full text-xs font-black shadow-md">
                  FOCUS & CONSISTENCY
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/about_artist.jpg"
                  alt="Stephen working focused with tablet and code"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Bio & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-heading font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
                ABOUT ME
              </h2>
              <StarDoodle className="w-6 h-6 text-neon-yellow" />
            </div>

            <p className="text-base text-paper/85 leading-relaxed">
              Halo! Saya Stephen, seorang <strong className="text-lime">Full-Stack Web Developer & UI/UX Designer</strong> yang gemar merangkai arsitektur kode yang tangguh sekaligus antarmuka interaktif yang estetik dan playful.
            </p>
            <p className="mt-3 text-base text-paper/75 leading-relaxed">
              Lulusan <strong className="text-cyan">{profile.school}</strong> jurusan {profile.major}. Berpengalaman magang di <strong className="text-pink">{profile.internship}</strong> dan menangani berbagai proyek web dari database schema sampai frontend micro-animations.
            </p>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-bold text-lime hover:underline group"
              >
                <span>Know More About Me</span>
                <span className="transition-transform group-hover:translate-x-1">➔</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#212448] pt-6">
              <div>
                <p className="font-marker-text text-3xl md:text-4xl text-lime">03</p>
                <p className="text-xs text-paper/60 uppercase font-heading">Featured Projects</p>
              </div>
              <div>
                <p className="font-marker-text text-3xl md:text-4xl text-cyan">11+</p>
                <p className="text-xs text-paper/60 uppercase font-heading">Tech Stack</p>
              </div>
              <div>
                <p className="font-marker-text text-3xl md:text-4xl text-pink">100%</p>
                <p className="text-xs text-paper/60 uppercase font-heading">Dedication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer & contact */

function ContactFooter() {
  return (
    <footer id="contact" className="pt-16 pb-12 border-t border-[#212448] bg-[#0c0d1e]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
        {/* Banner callout */}
        <div className="inline-block relative mb-6">
          <SparkleDoodle className="absolute -top-6 -left-8 w-8 h-8 text-cyan" />
          <StarDoodle className="absolute -bottom-4 -right-8 w-8 h-8 text-lime" />
          <h2 className="font-marker-text text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            LET'S CREATE SOMETHING AWESOME!
          </h2>
        </div>

        <p className="max-w-md mx-auto text-sm text-paper/70 mb-8">
          Tertarik berkolaborasi untuk proyek freelance, full-time opportunity, atau sekadar diskusi ide kreatif? Pintu selalu terbuka!
        </p>

        {/* Contact Email Pill */}
        <div className="flex justify-center mb-8">
          <a
            href="mailto:stephen.wijaya.ut@gmail.com"
            className="hud flex items-center gap-3 rounded-full bg-lime px-8 py-3.5 text-sm md:text-base font-black text-navy shadow-[0_0_25px_rgba(199,242,0,0.35)] hover:scale-105 transition-all"
          >
            <span>✉ stephen.wijaya.ut@gmail.com</span>
          </a>
        </div>

        {/* Social links & location */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-paper/80 mb-8">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime transition-colors"
            >
              {s.label}
            </a>
          ))}
          <span className="text-paper/40">•</span>
          <span className="text-paper/70">📍 Indonesia</span>
        </div>

        <p className="text-xs text-paper/50">
          © {new Date().getFullYear()} Stephen Wijaya Utama. Designed & Built with Next.js, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ project detail modal */

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bento-card max-w-2xl w-full p-6 bg-[#121324] border border-[#212448] shadow-2xl"
        >
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="hud text-xs text-lime">{project.category}</span>
            <button onClick={onClose} className="text-paper/60 hover:text-white font-bold">
              ESC / ✕
            </button>
          </div>
          <h3 className="font-heading font-black text-2xl text-white uppercase mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-paper/80 leading-relaxed mb-5">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s) => (
              <span key={s} className="chip text-xs text-paper/90">
                {s}
              </span>
            ))}
          </div>
          <div className="pt-4 border-t border-[#212448] flex justify-between items-center text-xs">
            <span className="text-paper/60">ROLE: {project.role}</span>
            <button
              onClick={onClose}
              className="rounded-full bg-lime px-4 py-2 text-xs font-bold text-navy"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ showreel modal */

function ShowreelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bento-card max-w-4xl w-full p-6 bg-[#121324] border border-[#212448] shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4 border-b border-[#212448] pb-3">
            <h3 className="font-heading font-black text-xl text-white uppercase">
              SHOWREEL 2026
            </h3>
            <button onClick={onClose} className="text-paper/60 hover:text-white font-bold text-sm">
              ✕ CLOSE
            </button>
          </div>
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <Image
              src="/showreel_thumb.jpg"
              alt="Showreel preview"
              fill
              className="object-cover opacity-80"
            />
            <div className="relative z-10 text-center p-6 bg-[#090a16]/80 rounded-2xl border border-lime/30 backdrop-blur-sm">
              <p className="font-heading font-black text-xl text-lime uppercase mb-1">
                SHOWREEL PREVIEW
              </p>
              <p className="text-xs text-paper/80 max-w-sm mb-4">
                Letakkan file showreel Anda di <code className="text-cyan">public/showreel.mp4</code> untuk memutar video asli secara langsung.
              </p>
              <button
                onClick={onClose}
                className="rounded-full bg-lime px-6 py-2 text-xs font-bold text-navy hover:scale-105 transition-transform"
              >
                GREAT!
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ root */

export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!ready && <Intro onDone={() => setReady(true)} />}
      </AnimatePresence>

      <Navbar />

      <main className="min-h-screen">
        <Hero onShowreel={() => setShowreelOpen(true)} />
        <ShowreelSection onWatch={() => setShowreelOpen(true)} />
        <FeaturedProjectsSection onOpenProject={(p) => setSelectedProject(p)} />
        <SkillsSection />
        <AboutMeSection />
      </main>

      <ContactFooter />

      <ShowreelModal open={showreelOpen} onClose={() => setShowreelOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </MotionConfig>
  );
}
