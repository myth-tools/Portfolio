<div align="center">

# Shesher Hasan

### Full-Stack Engineer — System Architect — Technical Strategist

**[shesher.work.gd](https://shesher.work.gd)**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-2.5-60A5FA?style=for-the-badge&logo=biome)](https://biomejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br/>

A cinematic, data-driven portfolio engineered for zero-compromise performance and visual precision.
Fully static, edge-deployed, and content-managed through a type-safe YAML pipeline.

[**Live Site**](https://shesher.work.gd) · [**Resume**](https://shesher.work.gd/resume) · [**Contact**](mailto:contact@shesher.work.gd)

</div>

---

## Architecture

This portfolio is built on a **decoupled content-driven engine** — the UI is a pure presentation layer with zero knowledge of its data source. All content is managed through a single YAML file, validated at build time via Zod schemas, and rendered as a fully static export deployed to Cloudflare Pages.

```
Content (YAML) → Schema Validation (Zod) → Type-Safe Components → Static Export → Edge Deployment
```

### Core Principles

| Principle | Implementation |
|-----------|---------------|
| **Type Safety** | 100% TypeScript with strict mode. Every component prop, data field, and API contract is fully typed. |
| **Schema Enforcement** | 14 Zod schemas validate all data at build time — invalid content fails the build, never the user. |
| **GPU-Accelerated Motion** | Complex animations powered by Framer Motion with `transform-gpu` optimizations for 60fps on all devices. |
| **Content Independence** | The entire portfolio recalibrates from `content/portfolio.yml`. Zero code changes for content updates. |
| **Static-First** | Full static export via `output: "export"` — no server runtime, no cold starts, instant edge delivery. |

---

## Features

### Visual System — "Void & Incandescence"

- **Cinematic Glassmorphism** — High-fidelity surfaces with real-time blur and custom lighting orchestrations
- **Orbital Tech Constellation** — GPU-accelerated SVG visualization driven by golden-ratio spiral mathematics
- **Liquid Ambient Energy** — Multi-layered gradient blobs that respond to mouse position and scroll depth
- **HUD Information Architecture** — High-density technical displays optimized for rapid scanning

### Engineering

- **Data-Driven Architecture** — Single YAML source of truth with Zod schema validation at build time
- **Component Isolation** — 15 client components with strategic `"use client"` boundaries to minimize main-thread blocking
- **Atomic Design System** — Reusable UI primitives (`Magnetic`, `SectionReveal`, `PremiumAlert`, `Logo`)
- **Responsive Typography** — Tailwind breakpoint system with display fonts (Syne, Playfair Display, JetBrains Mono)
- **Accessibility-First** — ARIA labels, semantic HTML, `prefers-reduced-motion` support, and screen-reader annotations
- **SEO Optimized** — JSON-LD structured data, OpenGraph/Twitter cards, dynamic sitemap, and robots.txt

### Pages

| Route | Description |
|-------|-------------|
| `/` | Main portfolio — Hero, About, Skills, Experience, Projects, Testimonials, Contact |
| `/resume` | Printable resume with sidebar layout and ATS-friendly structure |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 | App Router, static export, build pipeline |
| **UI** | React 19 | Component architecture, hooks, concurrent features |
| **Language** | TypeScript 5.9 | Strict mode, full type coverage |
| **Styling** | Tailwind CSS 4 | Utility-first CSS, CSS-based config via `@theme` |
| **Animation** | Framer Motion | Spring physics, layout animations, scroll-linked effects |
| **Icons** | Lucide + React Icons | 60+ icons across tech stack, social, and UI elements |
| **Validation** | Zod | Runtime schema validation for all content data |
| **Linting** | Biome 2.5 | Formatting, linting, and safe auto-fixes |
| **Deployment** | Cloudflare Pages | Global edge network, custom domain, instant deploys |
| **Package Mgmt** | pnpm 11 | Fast, disk-efficient dependency management |

---

## Project Structure

```
Portfolio/
├── app/
│   ├── globals.css              # Tailwind config, custom animations, design tokens
│   ├── layout.tsx               # Root layout, metadata, JSON-LD, font loading
│   ├── page.tsx                 # Main portfolio — composes all sections
│   ├── robots.ts                # Dynamic robots.txt generation
│   ├── sitemap.ts               # Dynamic sitemap generation
│   └── resume/
│       └── page.tsx             # Resume page with metadata
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Fixed navigation with scroll detection
│   │   ├── Footer.tsx           # Footer with social links and directory
│   │   └── Preloader.tsx        # Full-screen loading animation
│   │
│   ├── sections/
│   │   ├── Hero.tsx             # Constellation visualization, typing animation, parallax
│   │   ├── About.tsx            # Profile panel, certifications, philosophy cards
│   │   ├── Skills.tsx           # Interactive skill cards with level indicators
│   │   ├── Experience.tsx       # Timeline with scroll-linked progress
│   │   ├── Projects.tsx         # Digital showroom with gradient cards
│   │   ├── Testimonials.tsx     # Client testimonial carousel
│   │   └── Contact.tsx          # Form with Formspree integration
│   │
│   ├── ui/
│   │   ├── Logo.tsx             # Animated monogram logo
│   │   ├── Magnetic.tsx         # Cursor-following magnetic interaction
│   │   ├── SectionReveal.tsx    # Scroll-triggered entrance animations
│   │   └── PremiumAlert.tsx     # Context-aware alert system
│   │
│   └── resume/
│       └── ResumeClient.tsx     # Resume renderer with sidebar layout
│
├── content/
│   └── portfolio.yml            # Single source of truth for all content
│
├── lib/
│   ├── schema.ts                # 14 Zod schemas + TypeScript type exports
│   ├── data.ts                  # YAML reader with build-time validation
│   └── utils.ts                 # cn() utility (clsx + tailwind-merge)
│
├── public/
│   ├── avatar.webp              # Profile photo
│   ├── favicon.svg              # SVG favicon
│   ├── logo.svg                 # SVG logo mark
│   └── CNAME                    # Cloudflare Pages custom domain
│
├── cloudflare-deploy.sh         # Cloudflare Pages deployment script
├── github-deploy.sh             # GitHub Pages deployment script
├── Makefile                     # Build automation (dev, build, lint, deploy)
├── biome.json                   # Biome linter/formatter config
├── next.config.ts               # Next.js config (static export)
├── postcss.config.mjs           # PostCSS config (Tailwind v4)
└── tsconfig.json                # TypeScript config (strict mode)
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 11

### Installation

```bash
git clone https://github.com/myth-tools/Portfolio.git
cd Portfolio
pnpm install
```

### Development

```bash
make dev          # Start dev server at localhost:3000
```

### Quality Checks

```bash
make check        # Biome lint + TypeScript type-check
make lint-ui      # Full pipeline: Biome → TypeScript → Production build
make fmt          # Auto-format all files
make fix          # Auto-fix lint + formatting issues
```

### Build & Deploy

```bash
make build        # Production build → out/
make start        # Serve static export locally
make deploy-cf    # Deploy to Cloudflare Pages
make deploy-gh    # Deploy to GitHub Pages
```

Run `make help` for the full list of available targets.

---

## Content Management

The entire portfolio is driven by a single file: **`content/portfolio.yml`**.

No code changes required — edit the YAML, push, and the site rebuilds automatically.

```yaml
personalInfo:
  name: "Shesher Hasan"
  title: "Full-Stack Engineer"
  tagline: "Building high-performance systems and scalable web applications"
  email: "contact@shesher.work.gd"
  github: "https://github.com/myth-tools"
  linkedin: "https://bd.linkedin.com/in/shesher-hasan-600007390"
```

### Adding a Project

```yaml
projects:
  - id: 6
    title: "New Project"
    description: "Short description"
    longDescription: "Detailed description for the showcase"
    category: "Full-Stack"
    tags: ["Next.js", "TypeScript", "PostgreSQL"]
    github: "https://github.com/myth-tools/project"
    live: "https://project.example.com"
    featured: true
    gradient: "from-violet-500 to-indigo-600"
    icon: "SiNextdotjs"
```

### Adding a Skill

```yaml
skillCategories:
  - category: "Frontend"
    color: "#61DAFB"
    skills:
      - name: "React"
        icon: "SiReact"
        level: 95
```

---

## Performance

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Static export, optimized assets, font preloading |
| **FID** | < 100ms | Strategic `"use client"` boundaries, minimal JS |
| **CLS** | < 0.1 | Reserved dimensions, font-display: swap |
| **TTI** | < 3.5s | Code splitting, lazy section rendering |
| **Build** | < 10s | Turbopack, parallel static generation |

---

## License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

<div align="center">

**Engineered by Shesher Hasan**

*Built with obsessive attention to detail and a refusal to compromise on quality.*

</div>
