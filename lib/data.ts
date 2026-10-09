export const profile = {
  name: "Stephen Wijaya Utama",
  shortName: "Stephen",
  headline: "Halo, aku Stephen!",
  role: "Full-Stack Web Developer & UI/UX Designer",
  school: "Universitas Bina Nusantara (Binus) Malang",
  major: "Web Development & UI/UX Design",
  internship: "Insyst Media Solutions",
  freelance: "MedisonCare",
  location: "Indonesia",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "showreel", label: "Showreel" },
  { id: "projects", label: "Proyek" },
  { id: "skills", label: "Skill" },
  { id: "about", label: "About" },
  { id: "contact", label: "Kontak" },
] as const;

export const typewriterRoles = [
  "Full-Stack Web Developer",
  "UI/UX Designer",
  "Laravel & React Engineer",
  "Explorer AI: LLM & RAG",
];

export const clickLines = [
  "Wih, diklik! *boing*",
  "Ayo bikin sesuatu!",
  "Level up bareng?",
  "Rekrut aku dong!",
];

export const techStack = [
  "Laravel",
  "React",
  "Next.js",
  "Golang",
  "TypeScript",
  "Express.js",
  "Tailwind CSS",
  "Docker",
  "Git",
  "MySQL",
  "PostgreSQL"
];

export type Project = {
  no: string;
  title: string;
  category: string;
  desc: string;
  stack: string[];
  role: string;
  accent: "yellow" | "cyan" | "pink" | "green" | "lime" | "violet";
  image: string;
};

export const projects: Project[] = [
  {
    no: "01",
    title: "MEDISONCARE",
    category: "Web Application • Admin Portal",
    desc: "Aplikasi medis multi-role dengan model database relasional, autentikasi aman, dan antarmuka admin interaktif untuk kelola data pasien.",
    stack: ["Laravel", "MySQL", "Blade", "Tailwind CSS"],
    role: "Backend & UI Admin",
    accent: "yellow",
    image: "/project_hunt.jpg",
  },
  {
    no: "02",
    title: "STUDIOKAYU",
    category: "System Design • Interactive UI",
    desc: "Sistem manajemen akademik terpadu; perancangan class diagram, migrasi database efisien, dan antarmuka responsif ramah pengguna.",
    stack: ["Laravel", "React", "TypeScript", "MySQL"],
    role: "System Design & Frontend",
    accent: "cyan",
    image: "/project_daydreams.jpg",
  },
  {
    no: "03",
    title: "SEKAWAN",
    category: "Data Management • Automated Reports",
    desc: "Sistem pendataan terstruktur dan pelaporan otomatis; model & migrasi data, controller RESTful, dan generator export laporan DomPDF.",
    stack: ["Laravel", "MySQL", "DomPDF", "Blade"],
    role: "Full-Stack Developer",
    accent: "pink",
    image: "/project_lost_signal.jpg",
  },
  {
    no: "04",
    title: "AI AGENT LAB",
    category: "AI Application • RAG Engine",
    desc: "Eksperimen integrasi LLM dan RAG dengan pipeline knowledge retrieval cerdas, automasi reasoning, dan antarmuka interaktif responsif.",
    stack: ["Next.js", "Python", "LangChain", "OpenAI"],
    role: "AI Explorer & Engineer",
    accent: "green",
    image: "/project_groovy.jpg",
  },
];

export type Skill = {
  iconSlug: string;
  name: string;
  level: number;
  note: string;
  color: string;
  type: "code" | "design" | "tools";
};

export const skills: Skill[] = [
  { iconSlug: "laravel", name: "Laravel", level: 5, note: "Eloquent, Artisan, REST API", color: "#FF2D20", type: "code" },
  { iconSlug: "react", name: "React", level: 5, note: "Hooks, Komponen, State", color: "#61DAFB", type: "code" },
  { iconSlug: "nextdotjs", name: "Next.js", level: 4, note: "App Router, SSR, SEO", color: "#FFFFFF", type: "code" },
  { iconSlug: "typescript", name: "TypeScript", level: 4, note: "Strict typing, OOP bersih", color: "#3178C6", type: "code" },
  { iconSlug: "go", name: "Golang", level: 3, note: "Concurrency, Lightweight API", color: "#00ADD8", type: "code" },
  { iconSlug: "tailwindcss", name: "Tailwind CSS", level: 5, note: "Responsive, Design Systems", color: "#38BDF8", type: "code" },
  { iconSlug: "figma", name: "Figma", level: 5, note: "Wireframing, UI/UX, Hi-Fi Prototype", color: "#F24E1E", type: "design" },
  { iconSlug: "docker", name: "Docker", level: 3, note: "Containerization & Dev Env", color: "#2496ED", type: "tools" },
  { iconSlug: "git", name: "Git", level: 5, note: "Branching, PRs, Workflow", color: "#F05032", type: "tools" },
];

export const stats = [
  { value: 3, suffix: "", label: "Featured Project" },
  { value: 11, suffix: "+", label: "Tech Stack Dikuasai" },
  { value: 6, suffix: "", label: "Bulan Pengalaman" },
];

export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/stephenwut", icon: "code" as const },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/stephenwut", icon: "in" as const },
  { id: "email", label: "Email", href: "mailto:stephen.wijaya.ut@gmail.com", icon: "mail" as const },
];

export type Toast = { id: string; title: string; body: string };

export const achievements = {
  hero: { id: "first-contact", title: "First Contact", body: "Stephen membalas sapaanmu!" },
  projects: { id: "project-hunter", title: "Project Hunter", body: "3 proyek unggulan ditemukan." },
  skills: { id: "skill-tree", title: "Skill Tree Unlocked", body: "Pohon skill Stephen terbuka." },
  about: { id: "lore-master", title: "Lore Master", body: "Kisah latar belakang terbuka." },
} satisfies Record<string, Toast>;
