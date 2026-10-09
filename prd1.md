# PRD: Portfolio Interaktif Stephen Wijaya Utama

Versi 1.1 (visual direvisi mengikuti referensi neon comic bento) · Single-page personal portfolio

## 1. Project Objective

Membangun website portfolio satu halaman yang menampilkan Stephen Wijaya Utama (Full-Stack Web Developer & UI/UX Designer) sebagai developer yang menguasai engineering sekaligus desain.

**Tujuan utama**
- Menjadi bukti kemampuan lewat website itu sendiri: animasi halus, interaksi *gamified*, performa baik.
- Memperkenalkan 3 featured project dan tech stack dengan jelas dalam kurang dari 60 detik.
- Mengarahkan pengunjung ke aksi: menghubungi Stephen atau membuka profil sosial.

**Indikator keberhasilan**
- Lighthouse Performance ≥ 90, Accessibility ≥ 95.
- Rata-rata durasi sesi ≥ 90 detik.
- Klik ke social/email ≥ 10% dari pengunjung unik.

## 2. Target Audience

| Segmen | Kebutuhan |
|---|---|
| Recruiter & HR tech | Melihat skill dan proyek cepat, kontak mudah |
| Hiring manager / tech lead | Kedalaman teknis, peran di tiap proyek |
| Klien freelance & startup | Kualitas visual dan kemampuan end-to-end |
| Sesama developer/desainer | Inspirasi, kualitas implementasi animasi |

## 3. Profil Konten

- **Nama:** Stephen Wijaya Utama
- **Role:** Full-Stack Web Developer & UI/UX Designer
- **Background:** Lulusan Universitas Bina Nusantara (Binus) Malang, jurusan Web Development & UI/UX Design. Magang di Insyst Media Solutions (UI/UX, Laravel, Frontend). Tertarik pada eksplorasi AI (LLM, RAG) dan arsitektur sistem.
- **Tech stack:** Laravel, React, Next.js, Golang, TypeScript, Express.js, Tailwind CSS, Docker, Git.
- **Featured projects:**
  1. **MedisonCare**: aplikasi medis; database model, autentikasi, antarmuka admin.
  2. **Studiokayu**: sistem manajemen; class diagram, migrasi database, UI frontend.
  3. **Sekawan**: sistem pendataan; model, migrasi, controller, fitur export.

## 4. Design Guidelines (v1.1: Neon Comic Bento)

### 4.1 Konsep
Dashboard gelap bergaya **bento**: kartu-kartu besar bersudut sangat membulat (`2rem`) di atas latar navy/deep purple yang penuh partikel glow dan doodle neon. Karakter kartun 2D Stephen menjadi pusat perhatian di Hero. Referensi: mockup visual yang diunggah (layout, mood, dan warna).

### 4.2 Palet warna
| Token | Hex | Penggunaan |
|---|---|---|
| `navy` | `#0D0B2A` | Background utama |
| `purple` | `#1B1145` | Gradient Hero, surface |
| `card` | `#1A1A38` | Kartu proyek |
| `violet` | `#3A1D8F` | Blob dan glow sekunder |
| `lime` | `#B6FF2B` | CTA utama, play button, link aksi |
| `neon-yellow` | `#F5FF3B` | Hire Me, bintang, bubble |
| `neon-green` | `#39FF88` | Status, hover |
| `cyan` | `#3BE8FF` | Glow avatar, tombol sekunder |
| `pink` | `#FF4FD8` | Aksen gradient |
| `paper` | `#F4F2FF` | Teks utama |

### 4.3 Tipografi
- **Bangers**: nama di Hero (warna pelangi per huruf, outline tebal, bayangan 3D keras), speech bubble, HUD.
- **Barlow Condensed (bold, uppercase)**: judul seksi, navigasi, tombol.
- **Nunito**: teks isi.

### 4.4 Layout (desktop ≥1024px)
```
+------------------------------------------------------+
| STEPHEN.        Home Projects Skills About  LV  [Hire Me] |
+---------------------------+--------------------------+
| HERO (kartu besar)        | FEATURED PROJECTS        |
| "Hey, I'm" / bubble       | grid 6 kartu (2-3 kolom) |
| STEPHEN (rainbow 3D)      |                          |
| role line + 2 pill CTA    |                          |
| avatar melambai           |                          |
+---------------------------+                          |
| SKILLS (ikon neon)        |                          |
+---------------------------+                          |
| ABOUT ME + line-art       |                          |
+---------------------------+--------------------------+
```
Mobile: satu kolom, urutan Hero, Projects, Skills, About; social links pindah ke bar bawah.

### 4.5 Spesifikasi karakter avatar
Kartun 2D pria muda Asia Timur, rambut hitam belah tengah bervolume, senyum ramah terbuka, tahi lalat kecil di pipi kiri dekat rahang, blazer hitam dengan kemeja putih berkerah terbuka (semi-casual), tangan kanan melambai penuh energi. Glow cyan di sekeliling karakter. Versi *neon line-art* dipakai di About Me.

### 4.6 Prinsip motion
1. Momen utama: orkestrasi Hero setelah intro (bubble, nama per huruf, avatar masuk, tangan melambai).
2. Gerak yang menjawab aksi (hover, drag, klik, buka lightbox).
3. Loop ambient hanya untuk dekorasi (partikel, doodle, ikon skill).
4. Hanya `transform`/`opacity`/`filter`; hormati `prefers-reduced-motion`.

## 5. Functional Requirements

### 5.1 Global
| ID | Kebutuhan |
|---|---|
| G-1 | **Navbar** tetap di atas: logo "STEPHEN.", menu Home/Projects/Skills/About/Contact dengan highlight yang meluncur (shared layout), chip level LV 1–5, tombol "Hire Me". |
| G-2 | **XP bar** tipis di bawah navbar mengikuti progres scroll. |
| G-3 | **Intro loading** (counter persen) lalu tirai terbuka. |
| G-4 | **Partikel glow** melayang di latar (ungu, biru, hijau, kuning). |
| G-5 | **Cursor follower** (desktop) membesar saat hover elemen interaktif. |
| G-6 | **Achievement toast** saat seksi Skills ditemukan. |

### 5.2 Hero
- Bubble "Hey, I'm" dan "Hi, I'm STEPHEN!" muncul dengan spring dan melayang pelan.
- Nama **STEPHEN** besar: tiap huruf berwarna pelangi (kuning, hijau, biru, ungu, pink, oranye), outline dan bayangan 3D, muncul per huruf lalu bergoyang bergantian. Garis gradient di bawahnya tergambar.
- Baris peran: "Full-Stack Developer • UI/UX Designer • Laravel & React Builder • AI Explorer", dengan panah doodle yang tergambar (path drawing).
- Dua tombol pill: **Watch Showreel** (lime, glow berdenyut, membuka lightbox) dan **Explore Projects** (biru gelap berpendar, scroll ke Projects).
- Avatar: pupil mengikuti kursor, berkedip, melayang, tangan melambai terus-menerus, klik membuat melompat dengan teks "BOING!".
- Doodle bintang, petir, squiggle mengambang; blob gradient bernapas di latar.

### 5.3 Showreel
- Dibuka dari tombol **Watch Showreel** dan kartu "Showreel 2026".
- Lightbox: backdrop blur, scale-spring, tutup via Esc, klik backdrop, atau tombol X.

### 5.4 Featured Projects
- Panel besar di kanan dengan judul "FEATURED PROJECTS" (garis gradient tergambar) dan link "View Projects →".
- Grid 6 kartu: **MedisonCare**, **Studiokayu**, **Sekawan** (proyek utama), **Showreel 2026**, **UI/UX Design** (karya magang), **AI Lab** (eksplorasi LLM & RAG).
- Tiap kartu: thumbnail ilustratif berwarna, judul, tag kategori, tombol play bulat lime dengan ring berdenyut.
- Hover: kartu terangkat, thumbnail zoom, glow lime di tepi. Masuk viewport dengan stagger spring.
- Catatan: tiga kartu terakhir adalah placeholder yang perlu diisi konten asli.

### 5.5 Skills
- Deretan ikon neon (Laravel, React, Next.js, Golang, TypeScript, Express.js, Tailwind, Docker, Git), masing-masing dengan warna glow sendiri.
- Ikon melayang, **tooltip** (nama, level, catatan) saat hover/fokus, bisa di-**drag** dan memantul kembali ke posisi.

### 5.6 About Me
- Ilustrasi **neon line-art** yang tergambar saat masuk viewport, dengan sticker "Hi! I'm a web developer!".
- Teks latar belakang (Binus Malang, Insyst Media Solutions, minat AI & arsitektur sistem).
- Tiga counter animasi dan link "Get in touch! →" yang bergeser saat hover.

### 5.7 Floating Social Links
- Tetap di sisi kiri (desktop) atau bar bawah (mobile), masuk dengan stagger spring, label meluncur saat hover.

## 6. Non-Functional Requirements

| Kategori | Target |
|---|---|
| Performa | LCP < 2,5 s, CLS < 0,1, INP < 200 ms; bundle JS awal < 200 KB gzip |
| Animasi | 60fps; hanya `transform`/`opacity`; `will-change` seperlunya |
| Aksesibilitas | WCAG 2.1 AA, fokus keyboard terlihat, `aria-label`, lightbox dengan focus trap, `prefers-reduced-motion` dihormati |
| Responsif | 360px sampai 1920px; sentuhan menggantikan hover/cursor di perangkat touch |
| SEO | Metadata, Open Graph, semantic HTML, `sitemap` |
| Browser | 2 versi terbaru Chrome, Edge, Firefox, Safari; iOS Safari 16+ |
| Keamanan | Header keamanan dasar, tautan eksternal `rel="noopener noreferrer"` |
| Maintainability | TypeScript strict, data konten dipisah dari komponen |

## 7. Tech Stack Architecture

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS (token warna kustom) |
| Animasi | Framer Motion (`MotionConfig`, `AnimatePresence`, `useScroll`, `useSpring`, `useInView`) |
| Font | `next/font/google` (Bangers, Barlow Condensed, Nunito) |
| Deployment | Vercel; opsional Docker |
| Kontrol versi | Git |

**Struktur direktori**
```
app/
  layout.tsx      # font, metadata
  globals.css     # token, utilitas komik
  page.tsx        # render <Portfolio />
components/
  Portfolio.tsx   # semua seksi dan animasi
public/
  showreel.mp4    # ganti dengan video sendiri
```

## 8. Rencana Rilis

| Fase | Cakupan |
|---|---|
| MVP | Semua seksi, animasi inti, responsif |
| v1.1 | Konten asli (screenshot proyek, video showreel), SEO, analytics |
| v1.2 | Mode kuis mini-game, halaman detail proyek, chat demo RAG |

## 9. Risiko

| Risiko | Mitigasi |
|---|---|
| Animasi berlebihan menurunkan performa | Batasi ke transform/opacity, uji di perangkat low-end |
| Gangguan bagi pengguna sensitif gerak | `reducedMotion="user"` |
| Video showreel berat | Lazy load, poster statis, kompresi |
