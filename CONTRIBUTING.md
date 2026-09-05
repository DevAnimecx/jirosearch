# Contributing to Jiro Landing Page

Thank you for your interest in contributing to the Jiro landing page! This guide covers how to set up the project and submit changes.

## Quick Start

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/your-username/jirosearch.git`
3. **Install dependencies**: `npm install`
4. **Start dev server**: `npm run dev`
5. **Make your changes**
6. **Submit a PR**

## Development

```bash
# Start dev server on port 3000
npm run dev

# Build for production
npm run build

# Type check
npm run lint
```

## Project Structure

- `src/App.tsx` — Main landing page component
- `src/index.css` — Tailwind CSS + custom styles
- `index.html` — HTML template with SEO meta tags
- `public/` — Static assets (docs pages, blog, sitemap)

## Code Style

- **TypeScript** with strict mode
- **Tailwind CSS** for styling (no CSS modules)
- **Framer Motion** for animations
- **Lucide React** for icons

### Conventions

- Use functional components with hooks
- Keep components in `App.tsx` (single-file architecture)
- Use `FadeIn` for scroll animations
- Use `motion` for entrance animations
- Prefix custom CSS classes with semantic names

## Pull Request Guidelines

### Before Submitting

- [ ] TypeScript compiles (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations perform well (60fps)

### PR Title Format

```
feat: add new section to landing page
fix: resolve mobile layout issue
style: update color palette
docs: update README
```

## Reporting Issues

### Bug Reports

Include:
- Browser and version
- Screen size / device
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

- Clear use case description
- Mockups or examples if possible
- Why this benefits the project

## Community

- **GitHub Issues**: [DevAnimecx/jirosearch/issues](https://github.com/DevAnimecx/jirosearch/issues)
- **Discord**: [discord.gg/jiro](https://discord.gg/jiro)
- **Twitter**: [@jirosearch](https://twitter.com/jirosearch)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
