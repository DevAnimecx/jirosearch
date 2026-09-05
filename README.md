<div align="center">

# Jiro — Landing Page

**The official website for [jiro.dev](https://jiro.dev)**

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

---

## About

This is the source code for [jiro.dev](https://jiro.dev), the official landing page for Jiro Search — The Search Intelligence Platform.

Built with React 19, Tailwind CSS 4, Framer Motion, and Vite.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (motion)
- **Icons**: Lucide React
- **Build**: Vite 6
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Type check
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite and deploys

Or deploy with Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

### Custom Domain

After deployment, add your custom domain in Vercel dashboard:

1. Go to **Settings → Domains**
2. Add `jiro.dev`
3. Configure DNS as instructed

## Project Structure

```
jirosearch/
├── src/
│   ├── App.tsx          # Main landing page component
│   ├── main.tsx         # React entry point
│   └── index.css        # Tailwind + custom styles
├── public/              # Static assets (docs, blog, sitemap)
├── index.html           # HTML template with SEO meta tags
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## SEO

The landing page includes:

- OpenGraph & Twitter Card meta tags
- Structured data (JSON-LD): SoftwareApplication, Organization, FAQPage, BreadcrumbList
- Semantic HTML with ARIA labels
- Canonical URLs
- Sitemap & RSS feed

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Part of the [Jiro Search](https://github.com/DevAnimecx/jiro) ecosystem**

[jiro.dev](https://jiro.dev) · [GitHub](https://github.com/DevAnimecx/jirosearch) · [Discord](https://discord.gg/jiro)

</div>
