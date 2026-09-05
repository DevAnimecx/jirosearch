/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, type ReactNode, type ComponentType } from "react";
import { motion, useInView } from "motion/react";
import {
  Search,
  Globe,
  Brain,
  BarChart3,
  Bot,
  Building2,
  Github,
  Menu,
  X,
  ArrowRight,
  Check,
  XIcon,
  Terminal,
  Copy,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  ExternalLink,
  BookOpen,
  Boxes,
  FileCode,
  Share2,
  Database,
  Server,
  KeyRound,
  FileCheck2,
  Lock,
} from "lucide-react";

// ── Particle Background ──────────────────────────────────────
interface ParticleData {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: ParticleData[] = [];
    let animationId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createParticle(): ParticleData {
      return {
        x: Math.random() * (canvas?.width || window.innerWidth),
        y: Math.random() * (canvas?.height || window.innerHeight),
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      };
    }

    function updateParticle(p: ParticleData) {
      if (!canvas) return;
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    }

    function drawParticle(p: ParticleData) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
      ctx.fill();
    }

    function initParticles() {
      if (!canvas) return;
      particles = [];
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < count; i++) particles.push(createParticle());
    }
    initParticles();

    function connectParticles() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.035 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
      });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

// ── Animated Counter ─────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 1500;
    const step = target === 0 ? 0 : target / (duration / 16);
    if (target === 0) {
      setCount(0);
      return;
    }
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// ── Fade In Section ──────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 30 }
      : direction === "left"
      ? { opacity: 0, x: -40 }
      : { opacity: 0, x: 40 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Feature Card ─────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  delay = 0,
  enterprise = false,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  delay?: number;
  enterprise?: boolean;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="glass-card rounded-2xl p-8 card-hover group h-full relative overflow-hidden flex flex-col justify-between">
        {enterprise && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        )}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                enterprise
                  ? "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30"
                  : "bg-orange-500/10 border border-orange-500/20"
              }`}
            >
              <Icon className="w-7 h-7 text-orange-500" />
            </div>
            {badge && (
              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Comparison Row ───────────────────────────────────────────
function ComparisonRow({
  feature,
  jiro,
  serpApi,
  scraperApi,
  brightData,
  isLast = false,
}: {
  feature: string;
  jiro: string | ReactNode;
  serpApi: string | ReactNode;
  scraperApi: string | ReactNode;
  brightData: string | ReactNode;
  isLast?: boolean;
}) {
  return (
    <tr
      className={`hover:bg-white/[0.02] transition-colors ${
        !isLast ? "border-b border-white/5" : ""
      }`}
    >
      <td
        className={`px-6 text-zinc-300 ${isLast ? "py-5 font-semibold text-white" : "py-4"}`}
      >
        {feature}
      </td>
      <td
        className={`px-6 text-center ${
          isLast ? "py-5 text-orange-500 font-bold text-lg" : "py-4 text-emerald-400 font-semibold"
        }`}
      >
        {jiro}
      </td>
      <td
        className={`px-6 text-center ${isLast ? "py-5" : "py-4"} text-zinc-500`}
      >
        {serpApi}
      </td>
      <td
        className={`px-6 text-center ${isLast ? "py-5" : "py-4"} text-zinc-500`}
      >
        {scraperApi}
      </td>
      <td
        className={`px-6 text-center ${isLast ? "py-5" : "py-4"} text-zinc-500`}
      >
        {brightData}
      </td>
    </tr>
  );
}

// ── Search Engine Pill ─────────────────────────────────────────
const SEARCH_ENGINES = [
  { name: "Google", desc: "Global web SERP & snippets" },
  { name: "Bing", desc: "Microsoft enterprise index" },
  { name: "Brave", desc: "Independent privacy index" },
  { name: "DuckDuckGo", desc: "Zero-tracking anonymous" },
  { name: "YouTube", desc: "Video search & transcripts" },
  { name: "Amazon", desc: "E-commerce product data" },
  { name: "eBay", desc: "Auction & live marketplace" },
  { name: "Yandex", desc: "Eastern European & CIS" },
  { name: "Baidu", desc: "East Asian web index" },
];

const SOCIAL_PLATFORMS = [
  { name: "Reddit", tag: "Threads & Comments" },
  { name: "Twitter / X", tag: "Posts & Profiles" },
  { name: "YouTube", tag: "Channels & VODs" },
  { name: "LinkedIn", tag: "Profiles & Posts" },
  { name: "TikTok", tag: "Tags & Profiles" },
  { name: "Instagram", tag: "Reels & Profiles" },
  { name: "Facebook", tag: "Public Groups" },
  { name: "Threads", tag: "Microblogging" },
  { name: "Hacker News", tag: "Tech Discussions" },
  { name: "Bluesky", tag: "AT Protocol" },
  { name: "Telegram", tag: "Public Channels" },
  { name: "Pinterest", tag: "Visual Pins" },
];

// ── 16 MCP Tools Matrix ────────────────────────────────────────
interface MCPToolInfo {
  name: string;
  tier: "Free" | "Enterprise";
  description: string;
}

const MCP_TOOLS: MCPToolInfo[] = [
  { name: "search", tier: "Free", description: "Search 9 engines with automatic fallback" },
  { name: "scrape", tier: "Free", description: "Scrape any URL directly to clean Markdown" },
  { name: "smart_classify", tier: "Free", description: "Classify search intent across 16 intent types" },
  { name: "compare_engines", tier: "Free", description: "Compare results side-by-side across engines" },
  { name: "list_engines", tier: "Free", description: "List all supported web search engines" },
  { name: "list_social_platforms", tier: "Free", description: "List all 12 supported social platforms" },
  { name: "monitor_status", tier: "Free", description: "Retrieve circuit breaker & health metrics" },
  { name: "health_check", tier: "Free", description: "Quick server liveness and readiness check" },
  { name: "cache_stats", tier: "Free", description: "Inspect cache hit rates and memory metrics" },
  { name: "ai_search", tier: "Enterprise", description: "Agentic research with citations and synthesis" },
  { name: "search_hybrid", tier: "Enterprise", description: "Hybrid multi-signal keyword + semantic search" },
  { name: "search_structured", tier: "Enterprise", description: "Structured data extraction with JSON Schema" },
  { name: "social_scrape", tier: "Enterprise", description: "Scrape social media posts, comments & threads" },
  { name: "social_search", tier: "Enterprise", description: "Search posts across 12 social platforms" },
  { name: "social_batch", tier: "Enterprise", description: "Batch scrape up to 500 URLs concurrently" },
  { name: "smart_search", tier: "Enterprise", description: "Intent-aware routing with cross-encoder ranking" },
];

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeApiTab, setActiveApiTab] = useState<"search" | "hybrid" | "scrape" | "social" | "smart">("search");
  const [activeMcpFilter, setActiveMcpFilter] = useState<"all" | "Free" | "Enterprise">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredMcpTools = activeMcpFilter === "all" 
    ? MCP_TOOLS 
    : MCP_TOOLS.filter((t) => t.tier === activeMcpFilter);

  return (
    <div className="bg-[#09090b] text-white overflow-x-hidden antialiased min-h-screen selection:bg-orange-500 selection:text-white">
      <Particles />

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#040405]/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
              j
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">jiro</span>
              <span className="text-[10px] text-zinc-500 font-mono mt-0.5">search intelligence</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#examples" className="hover:text-white transition-colors duration-200">
              API Examples
            </a>
            <a href="#mcp" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <span>MCP</span>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-mono">16 tools</span>
            </a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">
              Pricing
            </a>
            <a href="#compare" className="hover:text-white transition-colors duration-200">
              Compare
            </a>
            <a href="/docs" className="hover:text-white transition-colors duration-200 flex items-center gap-1">
              Docs
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/DevAnimecx/jiro"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-zinc-300 hover:text-white transition-colors px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-zinc-600 text-sm bg-zinc-900/50"
            >
              <Github className="w-4 h-4 text-orange-500" />
              <span>GitHub</span>
            </a>
            <a
              href="#get-started"
              className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative z-10 shadow-lg shadow-orange-500/20"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <button
              className="md:hidden text-zinc-400 hover:text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#040405]/95 backdrop-blur-xl border-t border-white/10 px-6 py-5 space-y-3">
            <a href="#features" className="block text-zinc-300 hover:text-white py-1" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#examples" className="block text-zinc-300 hover:text-white py-1" onClick={() => setMobileMenuOpen(false)}>
              API Examples
            </a>
            <a href="#mcp" className="block text-zinc-300 hover:text-white py-1" onClick={() => setMobileMenuOpen(false)}>
              MCP Integration (16 Tools)
            </a>
            <a href="#pricing" className="block text-zinc-300 hover:text-white py-1" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </a>
            <a href="#compare" className="block text-zinc-300 hover:text-white py-1" onClick={() => setMobileMenuOpen(false)}>
              Compare
            </a>
            <a href="/docs" className="block text-zinc-300 hover:text-white py-1">
              Documentation
            </a>
            <a href="/blog" className="block text-zinc-300 hover:text-white py-1">
              Engineering Blog
            </a>
            <a href="https://github.com/DevAnimecx/jiro" target="_blank" rel="noreferrer" className="block text-orange-400 font-medium py-1">
              GitHub Repository →
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.07] rounded-full blur-[140px]" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-orange-500/[0.03] rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 border border-white/10 hover:border-orange-500/40 transition-colors">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-zinc-300">v0.2.11 — 9 Search Engines &bull; 12 Social Platforms</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight text-white">
              The Search Intelligence <br />
              <span className="gradient-text">Platform</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              One API. <span className="text-white font-medium">9 search engines</span>.{" "}
              <span className="text-white font-medium">12 social platforms</span>. AI-powered.{" "}
              <span className="text-orange-500 font-semibold">Free forever</span>.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <a
                href="#get-started"
                className="btn-primary text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold relative z-10 pulse-ring shadow-xl shadow-orange-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
              <a
                href="https://github.com/DevAnimecx/jiro"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/60 text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white/5"
              >
                <Github className="w-5 h-5 text-orange-500" />
                <span>Star on GitHub</span>
              </a>
              <a
                href="/docs"
                className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 text-zinc-300 hover:text-white px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>API Docs</span>
              </a>
            </div>
          </FadeIn>

          {/* Quick Terminal Demo */}
          <FadeIn delay={0.4}>
            <div className="max-w-3xl mx-auto">
              <div className="code-block p-1 glow-orange-sm shadow-2xl">
                <div className="bg-[#0c0c0e] rounded-2xl p-5 sm:p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500 font-mono">bash — 30s quickstart</span>
                      <button
                        onClick={() => copyToClipboard("pip install jirosearch && jiro serve", "quickstart")}
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="Copy Quickstart Command"
                      >
                        {copiedKey === "quickstart" ? (
                          <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                            <Check className="w-3.5 h-3.5" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-left text-xs sm:text-sm font-mono leading-relaxed space-y-1.5 overflow-x-auto">
                    <TerminalLine delay={0.5}>
                      <span className="text-zinc-600 select-none">$</span>{" "}
                      <span className="text-emerald-400">pip</span> install jirosearch
                    </TerminalLine>
                    <TerminalLine delay={0.7}>
                      <span className="text-zinc-600 select-none">$</span>{" "}
                      <span className="text-emerald-400">jiro</span> serve
                    </TerminalLine>
                    <TerminalLine delay={0.9}>
                      <span className="text-zinc-600 select-none">→</span>{" "}
                      <span className="text-zinc-500">Jiro v0.2.11 running on</span>{" "}
                      <span className="text-orange-500 font-semibold">http://localhost:8000</span>
                    </TerminalLine>
                    <TerminalLine delay={1.1}>
                      <span className="text-zinc-600 select-none">$</span>{" "}
                      <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/search -H <span className="text-amber-300">"Content-Type: application/json"</span> -d <span className="text-amber-300">'&#123;"q":"latest AI research", "engine":"google"&#125;'</span>
                    </TerminalLine>
                    <TerminalLine delay={1.3}>
                      <span className="text-zinc-600 select-none">→</span>{" "}
                      <span className="text-zinc-400">&#123;</span>{" "}
                      <span className="text-orange-400">"status"</span>: <span className="text-emerald-400">"ok"</span>,{" "}
                      <span className="text-orange-400">"engine"</span>: <span className="text-emerald-400">"google"</span>,{" "}
                      <span className="text-orange-400">"results"</span>: <span className="text-zinc-400">[ ... 10 ranked items ... ]</span>{" "}
                      <span className="text-zinc-400">&#125;</span>
                    </TerminalLine>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <section className="py-8 border-y border-white/5 bg-[#040405]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <FadeIn>
              <div className="text-3xl md:text-4xl font-extrabold text-white">
                <Counter target={9} />
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">Search Engines</div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="text-3xl md:text-4xl font-extrabold text-white">
                <Counter target={12} />
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">Social Platforms</div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-3xl md:text-4xl font-extrabold text-white">
                <Counter target={16} />
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">MCP Tools</div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-3xl md:text-4xl font-extrabold text-white">
                <Counter target={75} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">API Endpoints</div>
            </FadeIn>
            <FadeIn delay={0.4} className="col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">
                $<Counter target={0} />
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">Free Forever (10K RPD)</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Search Engines & Social Platforms Showcase ─────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                WIDE COVERAGE
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                9 Search Engines &bull; 12 Social Platforms
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                Self-hosted, resilient scrapers with automatic engine circuit breakers and zero API key requirements.
              </p>
            </FadeIn>
          </div>

          {/* 9 Search Engines */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-500" />
                <span>9 Web & Commercial Search Engines</span>
              </h3>
              <span className="text-xs font-mono text-zinc-500">Sub-50ms fallback</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {SEARCH_ENGINES.map((engine, i) => (
                <div key={engine.name} className="glass-card p-4 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-white">{engine.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-zinc-400">{engine.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 12 Social Platforms */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-500" />
                <span>12 Social Media Intelligence Scrapers</span>
              </h3>
              <span className="text-xs font-mono text-zinc-500">No API keys required</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SOCIAL_PLATFORMS.map((platform) => (
                <div key={platform.name} className="glass-card p-3.5 rounded-xl border border-white/5 text-center hover:border-orange-500/30 transition-all">
                  <span className="block font-semibold text-xs text-white mb-1">{platform.name}</span>
                  <span className="text-[10px] text-zinc-500 block truncate">{platform.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                FEATURES
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-extrabold mb-5 tracking-tight text-white">
                Everything you need
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light">
                Search intelligence that scales from prototype to production with zero vendor lock-in.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Search}
              title="Hybrid Search"
              description="Combines keyword matching (BM25), dense semantic vector similarity, and SERP freshness signals into a single unified ranking."
              badge="Cross-Encoder"
              delay={0}
            />
            <FeatureCard
              icon={Globe}
              title="12 Social Platforms"
              description="Reddit, Twitter/X, YouTube, LinkedIn, TikTok, Instagram, Facebook, Threads, Hacker News, Bluesky, Telegram, and Pinterest with zero keys."
              badge="Multi-Source"
              delay={0.1}
            />
            <FeatureCard
              icon={Brain}
              title="Smart Search Auto-Routing"
              description="Intent-aware classifier auto-detects query intent across 16 categories and routes directly to the optimal specialized engine in sub-1ms."
              badge="16 Intents"
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Structured Extraction"
              description="Transform unstructured HTML into strictly validated JSON data matching custom JSON Schemas with optional local LLM synthesis."
              badge="JSON Schema"
              delay={0.3}
            />
            <FeatureCard
              icon={Bot}
              title="16 MCP Server Tools"
              description="Seamless Model Context Protocol integration supporting Claude Desktop, Cursor, and Continue.dev across stdio and SSE transports."
              badge="16 Tools"
              delay={0.4}
            />
            <FeatureCard
              icon={Building2}
              title="Enterprise Ready"
              description="Multi-tenant isolation, SOC2 compliance audit logging, SLA latency monitoring (p50/p95/p99), HMAC license tokens, webhooks, and batch jobs."
              badge="Enterprise"
              delay={0.5}
              enterprise
            />
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── Interactive API Examples ─────────────────────────────── */}
      <section id="examples" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                DEVELOPER FIRST
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight text-white">
                Simple, powerful API endpoints
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                Explore standard cURL requests across web search, hybrid synthesis, URL scraping, social media, and smart intent routing.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center gap-2 p-4 bg-zinc-900/60 border-b border-white/5">
                {[
                  { key: "search", label: "Web Search (/search)" },
                  { key: "hybrid", label: "Hybrid + Answer (/search)" },
                  { key: "scrape", label: "URL & Batch Scrape (/scrape)" },
                  { key: "social", label: "Social Media (/social)" },
                  { key: "smart", label: "Smart Routing (/v1/smart)" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveApiTab(tab.key as any)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      activeApiTab === tab.key
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code Panel */}
              <div className="p-6 bg-[#0c0c0e]">
                {activeApiTab === "search" && (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-zinc-500 font-mono">
                      <span>Basic web search across 9 engines</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `curl -X POST http://localhost:8000/search \\\n  -H "Content-Type: application/json" \\\n  -d '{"q": "python web scraping", "engine": "google", "num": 10}'`,
                            "api-search"
                          )
                        }
                        className="text-zinc-400 hover:text-white flex items-center gap-1.5"
                      >
                        {copiedKey === "api-search" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === "api-search" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                      <code>
                        <span className="text-zinc-500"># Basic search</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/search \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"q": "python web scraping", "engine": "google", "num": 10&#125;'</span>
                      </code>
                    </pre>
                  </div>
                )}

                {activeApiTab === "hybrid" && (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-zinc-500 font-mono">
                      <span>Hybrid ranking + extractive answer synthesis</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `curl -X POST http://localhost:8000/search \\\n  -H "Content-Type: application/json" \\\n  -d '{"q": "latest AI research", "hybrid": true, "answer": true}'`,
                            "api-hybrid"
                          )
                        }
                        className="text-zinc-400 hover:text-white flex items-center gap-1.5"
                      >
                        {copiedKey === "api-hybrid" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === "api-hybrid" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                      <code>
                        <span className="text-zinc-500"># Hybrid search with answer synthesis</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/search \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"q": "latest AI research", "hybrid": true, "answer": true&#125;'</span>
                      </code>
                    </pre>
                  </div>
                )}

                {activeApiTab === "scrape" && (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-zinc-500 font-mono">
                      <span>URL to markdown and multi-URL batch scraping</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `curl -X POST http://localhost:8000/scrape \\\n  -H "Content-Type: application/json" \\\n  -d '{"url": "https://docs.python.org", "format": "markdown"}'`,
                            "api-scrape"
                          )
                        }
                        className="text-zinc-400 hover:text-white flex items-center gap-1.5"
                      >
                        {copiedKey === "api-scrape" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === "api-scrape" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                      <code>
                        <span className="text-zinc-500"># Scrape single URL to Markdown</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/scrape \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"url": "https://docs.python.org", "format": "markdown"&#125;'</span>{"\n\n"}
                        <span className="text-zinc-500"># Batch scrape multiple URLs concurrently</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/scrape/batch \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"urls": ["https://example.com", "https://docs.python.org"]&#125;'</span>
                      </code>
                    </pre>
                  </div>
                )}

                {activeApiTab === "social" && (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-zinc-500 font-mono">
                      <span>Extract post/thread comments or search across 12 platforms</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `curl -X POST http://localhost:8000/social \\\n  -H "Content-Type: application/json" \\\n  -d '{"url": "https://reddit.com/r/programming/comments/abc123"}'`,
                            "api-social"
                          )
                        }
                        className="text-zinc-400 hover:text-white flex items-center gap-1.5"
                      >
                        {copiedKey === "api-social" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === "api-social" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                      <code>
                        <span className="text-zinc-500"># Scrape a Reddit post with comments</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/social \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"url": "https://reddit.com/r/programming/comments/abc123"&#125;'</span>{"\n\n"}
                        <span className="text-zinc-500"># Search across platforms (e.g. reddit, twitter, bluesky)</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/social/search \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"query": "machine learning", "platform": "reddit", "limit": 10&#125;'</span>
                      </code>
                    </pre>
                  </div>
                )}

                {activeApiTab === "smart" && (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-zinc-500 font-mono">
                      <span>Auto-detect intent and route to optimal specialized engine</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `curl -X POST http://localhost:8000/v1/smart \\\n  -H "Content-Type: application/json" \\\n  -d '{"query": "github.com/fastapi"}'`,
                            "api-smart"
                          )
                        }
                        className="text-zinc-400 hover:text-white flex items-center gap-1.5"
                      >
                        {copiedKey === "api-smart" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === "api-smart" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                      <code>
                        <span className="text-zinc-500"># Auto-detect intent and route to best engine</span>{"\n"}
                        <span className="text-emerald-400">curl</span> -X POST http://localhost:8000/v1/smart \{"\n"}
                        {"  "}-H <span className="text-amber-300">"Content-Type: application/json"</span> \{"\n"}
                        {"  "}-d <span className="text-amber-300">'&#123;"query": "github.com/fastapi"&#125;'</span>
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── MCP Integration (16 Tools) ──────────────────────────── */}
      <section id="mcp" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                AI AGENT READY
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight text-white">
                16 MCP Tools for AI Agents
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                Works seamlessly with Claude Desktop, Cursor, Continue.dev, and any Model Context Protocol compatible client.
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Configuration Box */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn direction="left">
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-orange-500" />
                    <span>Client Configuration</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Add Jiro to your Claude Desktop (<code className="text-orange-400">claude_desktop_config.json</code>) or Cursor settings:
                  </p>
                  <div className="code-block p-4 relative">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(
                            {
                              mcpServers: {
                                jiro: {
                                  command: "jiro",
                                  args: ["mcp"],
                                },
                              },
                            },
                            null,
                            2
                          ),
                          "mcp-config"
                        )
                      }
                      className="absolute top-3 right-3 text-zinc-400 hover:text-white"
                      title="Copy MCP Config"
                    >
                      {copiedKey === "mcp-config" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <pre className="text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                      <code>
                        &#123;{"\n"}
                        {"  "}<span className="text-orange-400">"mcpServers"</span>: &#123;{"\n"}
                        {"    "}<span className="text-orange-400">"jiro"</span>: &#123;{"\n"}
                        {"      "}<span className="text-emerald-400">"command"</span>: <span className="text-amber-300">"jiro"</span>,{"\n"}
                        {"      "}<span className="text-emerald-400">"args"</span>: [<span className="text-amber-300">"mcp"</span>]{"\n"}
                        {"    "}&#125;{"\n"}
                        {"  "}&#125;{"\n"}
                        &#125;
                      </code>
                    </pre>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <span>Supported Transports:</span>
                    <span className="font-mono text-orange-400">stdio &bull; Streamable HTTP &bull; SSE</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: 16 Tools Matrix Table */}
            <div className="lg:col-span-7">
              <FadeIn direction="right">
                <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between p-4 bg-zinc-900/50 border-b border-white/5">
                    <span className="text-sm font-semibold text-white">Tool Reference (16 Tools)</span>
                    <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-white/5">
                      {(["all", "Free", "Enterprise"] as const).map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setActiveMcpFilter(tier)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            activeMcpFilter === tier
                              ? "bg-orange-500 text-white"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {tier === "all" ? "All (16)" : tier}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="max-h-[440px] overflow-y-auto divide-y divide-white/5">
                    {filteredMcpTools.map((tool) => (
                      <div key={tool.name} className="p-3.5 hover:bg-white/[0.02] flex items-center justify-between gap-4 transition-colors">
                        <div className="flex items-center gap-3">
                          <code className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                            {tool.name}
                          </code>
                          <span className="text-xs text-zinc-300">{tool.description}</span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                            tool.tier === "Enterprise"
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {tool.tier}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── Architecture Directory Tree ─────────────────────────── */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                MODULAR ARCHITECTURE
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight text-white">
                Engineered for resilience
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                Explore the modular codebase structure powering FastAPI routers, hybrid rankers, scraper engines, and MCP tools.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-white/10 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-x-auto">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5 text-zinc-500 text-xs">
                <span>jiro/ repository layout</span>
                <span>FastAPI &bull; Python 3.11+</span>
              </div>
              <pre className="text-zinc-300">
                <span className="text-orange-500 font-bold">jiro/</span>{"\n"}
                ├── <span className="text-emerald-400 font-semibold">server/</span>           FastAPI core application{"\n"}
                │   └── <span className="text-emerald-400">routers/</span>      API endpoints (75+ routes across search, scrape, social, MCP){"\n"}
                ├── <span className="text-emerald-400 font-semibold">search/</span>           Search intelligence pipeline{"\n"}
                │   ├── <span className="text-zinc-400">hybrid.py</span>     Multi-signal keyword + semantic fusion{"\n"}
                │   ├── <span className="text-zinc-400">reranker.py</span>   Cross-encoder CPU result reranking{"\n"}
                │   └── <span className="text-zinc-400">multiquery.py</span> Parallel query expansion{"\n"}
                ├── <span className="text-emerald-400 font-semibold">scraping/</span>         Resilient web scraping engine{"\n"}
                │   ├── <span className="text-zinc-400">engines.py</span>    9 search engines (Google, Bing, Brave, DDG, YT, Amazon...){"\n"}
                │   └── <span className="text-zinc-400">social/</span>       12 social platforms (Reddit, Twitter, TikTok, LinkedIn...){"\n"}
                ├── <span className="text-emerald-400 font-semibold">ai/</span>               AI synthesis & local extractive summarizer{"\n"}
                ├── <span className="text-emerald-400 font-semibold">mcp.py</span>            Model Context Protocol server (16 tools){"\n"}
                ├── <span className="text-emerald-400 font-semibold">pro.py</span>            Tier management & rate limiting{"\n"}
                ├── <span className="text-emerald-400 font-semibold">licensing.py</span>      HMAC cryptographically signed license tokens{"\n"}
                ├── <span className="text-emerald-400 font-semibold">db.py</span>             SQLite & PostgreSQL storage backends{"\n"}
                └── <span className="text-emerald-400 font-semibold">dashboard.py</span>      Built-in management Web UI
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── Pricing ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                PRICING
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight text-white">
                Simple, transparent pricing
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light">
                Start free forever with 10,000 requests/day. Scale to Enterprise when ready.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Tier */}
            <FadeIn delay={0}>
              <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
                    MOST POPULAR &bull; FREE FOREVER
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-extrabold text-white">$0</span>
                    <span className="text-zinc-500">/forever</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm text-zinc-300">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>100 requests/minute</strong> (10,000 RPD)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>9 search engines</strong> with auto-fallback</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>12 social platforms</strong> scraping</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Hybrid search & smart auto-routing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>MCP integration (9 Free tools)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Social batch (up to 5/batch)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Basic self-learning engine</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#get-started"
                  className="block w-full text-center py-3.5 rounded-2xl font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
                >
                  Get Started Free
                </a>
              </div>
            </FadeIn>

            {/* Enterprise Tier */}
            <FadeIn delay={0.15}>
              <div className="relative rounded-3xl p-8 sm:p-10 border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-[#111113] to-[#111113] h-full flex flex-col justify-between shadow-2xl shadow-orange-500/10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/30 mb-6">
                    ENTERPRISE POWER
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-extrabold text-white">$499</span>
                    <span className="text-zinc-500">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm text-zinc-300">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span><strong>1,000 RPM</strong> / <strong>1,000,000 RPD</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span><strong>AI-powered agentic research</strong> with citations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Custom LLM models & embeddings</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>All 16 MCP tools (Full Suite)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Social batch (500/batch concurrency)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>White-label & commercial license</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>SOC2 compliance & premium support</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="/pricing"
                  className="btn-primary text-white block w-full text-center py-3.5 rounded-2xl font-semibold relative z-10 shadow-lg shadow-orange-500/20"
                >
                  <span className="relative z-10">Get Enterprise Tier</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Full Free vs Enterprise Comparison Table */}
          <FadeIn>
            <div className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="p-4 bg-zinc-900/50 border-b border-white/5 font-semibold text-sm text-white">
                Detailed Feature Breakdown: Free vs Enterprise
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-zinc-400">
                      <th className="py-3.5 px-6 font-medium">Feature</th>
                      <th className="py-3.5 px-6 text-center font-medium">Free Tier</th>
                      <th className="py-3.5 px-6 text-center font-medium text-orange-400">Enterprise Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    <tr>
                      <td className="py-3 px-6 font-medium text-white">Rate Limits</td>
                      <td className="py-3 px-6 text-center">100 RPM / 10K RPD</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">1,000 RPM / 1M RPD</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Search Engines</td>
                      <td className="py-3 px-6 text-center">9 engines</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">9 engines</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Social Platforms</td>
                      <td className="py-3 px-6 text-center">12 platforms</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">12 platforms</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Hybrid Search</td>
                      <td className="py-3 px-6 text-center text-emerald-400">✅ Included</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Smart Intent Auto-Routing</td>
                      <td className="py-3 px-6 text-center text-emerald-400">✅ Included</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Structured Extraction</td>
                      <td className="py-3 px-6 text-center text-emerald-400">✅ Included</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Social Batch Scrape</td>
                      <td className="py-3 px-6 text-center">5 / batch</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">500 / batch</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Self-Learning Engine</td>
                      <td className="py-3 px-6 text-center">Basic</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">Advanced</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">AI Agentic Research with Citations</td>
                      <td className="py-3 px-6 text-center text-zinc-600">❌</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Full Access</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Advanced Self-Healing Scrapers</td>
                      <td className="py-3 px-6 text-center text-zinc-600">❌</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Custom LLM Models</td>
                      <td className="py-3 px-6 text-center text-zinc-600">❌</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Commercial Use & White Label</td>
                      <td className="py-3 px-6 text-center text-zinc-600">❌</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Premium SLA & Dedicated Support</td>
                      <td className="py-3 px-6 text-center text-zinc-600">❌</td>
                      <td className="py-3 px-6 text-center font-bold text-orange-400">✅ 24/7 SLA</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="py-4 px-6 font-bold text-white">Price</td>
                      <td className="py-4 px-6 text-center font-bold text-white">$0 forever</td>
                      <td className="py-4 px-6 text-center font-bold text-orange-400 text-base">$499 / mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── Competitor Comparison ────────────────────────────────── */}
      <section id="compare" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                COMPARE
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight text-white">
                Why switch to Jiro?
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                More features. 10x higher free tier allowances. Fully self-hosted with no vendor lock-in.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-zinc-900/40">
                      <th className="py-4 px-6 text-zinc-400 font-medium">Feature</th>
                      <th className="py-4 px-6 text-center">
                        <span className="text-orange-500 font-bold text-lg">Jiro</span>
                      </th>
                      <th className="py-4 px-6 text-center text-zinc-500 font-medium">SerpAPI</th>
                      <th className="py-4 px-6 text-center text-zinc-500 font-medium">ScraperAPI</th>
                      <th className="py-4 px-6 text-center text-zinc-500 font-medium">Bright Data</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    <ComparisonRow
                      feature="Self-Hosted / Local Run"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="Free Tier Allowance"
                      jiro="10,000 RPD"
                      serpApi="100 / mo"
                      scraperApi="5,000 / mo"
                      brightData="Trial Only"
                    />
                    <ComparisonRow
                      feature="Search Engines"
                      jiro="9 engines"
                      serpApi="8 engines"
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      brightData="50+ (via proxies)"
                    />
                    <ComparisonRow
                      feature="Social Media Scrapers"
                      jiro="12 platforms"
                      serpApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      brightData="Limited"
                    />
                    <ComparisonRow
                      feature="Hybrid Multi-Signal Search"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="MCP Server (16 Tools)"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="AI Agentic Research"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/50 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="Paid Tier Entry Price"
                      jiro="$499/mo (Enterprise)"
                      serpApi="$50/mo (Limited)"
                      scraperApi="$49/mo (Limited)"
                      brightData="$500+/mo"
                      isLast
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── Deployment Options ──────────────────────────────────── */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
                DEPLOY ANYWHERE
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight text-white">
                Deploy in seconds
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                Run locally with Python, orchestrate in Docker containers, or deploy across Kubernetes clusters via Helm.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FadeIn delay={0}>
              <div className="glass-card p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Local Python CLI</h3>
                  <p className="text-xs text-zinc-400 mb-4">Instant startup on your laptop or server with standard pip.</p>
                </div>
                <div className="code-block p-3 text-xs font-mono">
                  <span className="text-emerald-400">pip</span> install jirosearch{"\n"}
                  <span className="text-emerald-400">jiro</span> serve --port 8000
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="glass-card p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Docker Compose</h3>
                  <p className="text-xs text-zinc-400 mb-4">Containerized with redis caching and postgres persistence.</p>
                </div>
                <div className="code-block p-3 text-xs font-mono">
                  <span className="text-zinc-500"># Start container stack</span>{"\n"}
                  <span className="text-emerald-400">docker-compose</span> up -d
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-card p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Kubernetes Helm</h3>
                  <p className="text-xs text-zinc-400 mb-4">Production auto-scaling cluster with Prometheus metrics.</p>
                </div>
                <div className="code-block p-3 text-xs font-mono">
                  <span className="text-emerald-400">helm</span> install jiro ./helm/jiro
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ── CTA / Get Started ────────────────────────────────────── */}
      <section id="get-started" className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/[0.08] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight text-white">
              Start building today
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-zinc-400 mb-10 font-light">
              No credit card required. Free forever with 10,000 requests per day.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="code-block p-6 text-left max-w-2xl mx-auto mb-10 glow-orange-sm">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
                </div>
                <span className="text-xs text-zinc-500 font-mono">quickstart.sh</span>
              </div>
              <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-zinc-600 select-none">$</span>{" "}
                  <span className="text-emerald-400">pip</span> install jirosearch{"\n"}
                  <span className="text-zinc-600 select-none">$</span>{" "}
                  <span className="text-emerald-400">jiro</span> serve{"\n"}
                  <span className="text-zinc-600 select-none">→</span>{" "}
                  <span className="text-zinc-500">Jiro v0.2.11 running on</span>{" "}
                  <span className="text-orange-500 font-bold">http://localhost:8000</span>{"\n"}
                  <span className="text-zinc-600 select-none">→</span>{" "}
                  <span className="text-zinc-500">Docs:</span>{" "}
                  <span className="text-zinc-400">http://localhost:8000/docs</span>
                </code>
              </pre>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/DevAnimecx/jiro"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 shadow-xl shadow-orange-500/20"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
              <a
                href="https://discord.gg/jiro"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white/5"
              >
                <span>Join Discord Community</span>
              </a>
              <a
                href="/docs"
                className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:bg-white/5"
              >
                <span>API Documentation →</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="py-16 border-t border-white/5 bg-[#040405]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  j
                </div>
                <span className="font-bold text-lg text-white">jiro</span>
                <span className="text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">v0.2.11</span>
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-4">
                The Search Intelligence Platform. 9 search engines, 12 social platforms, hybrid ranking, and MCP tools for AI agents. Free forever under MIT license.
              </p>
              <div className="text-xs text-zinc-500 font-mono">
                Built with ❤️ by Blackvault Technology
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">Product</div>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="#features" className="hover:text-orange-400 transition-colors">Features</a></li>
                <li><a href="#examples" className="hover:text-orange-400 transition-colors">API Examples</a></li>
                <li><a href="#mcp" className="hover:text-orange-400 transition-colors">16 MCP Tools</a></li>
                <li><a href="/pricing" className="hover:text-orange-400 transition-colors">Pricing & Enterprise</a></li>
                <li><a href="/changelog" className="hover:text-orange-400 transition-colors">Changelog</a></li>
                <li><a href="/roadmap" className="hover:text-orange-400 transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">Resources</div>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="/docs" className="hover:text-orange-400 transition-colors">Documentation</a></li>
                <li><a href="/blog" className="hover:text-orange-400 transition-colors">Engineering Blog (24 Guides)</a></li>
                <li><a href="/openapi.json" className="hover:text-orange-400 transition-colors">OpenAPI 3.1 Spec</a></li>
                <li><a href="/sitemap.xml" className="hover:text-orange-400 transition-colors">Sitemap</a></li>
                <li><a href="/blog/feed.xml" className="hover:text-orange-400 transition-colors">RSS Feed</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">Community & Legal</div>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="https://github.com/DevAnimecx/jiro" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">GitHub</a></li>
                <li><a href="https://discord.gg/jiro" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Discord</a></li>
                <li><a href="https://twitter.com/jirosearch" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Twitter / X</a></li>
                <li><a href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/security" className="hover:text-orange-400 transition-colors">Security Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>&copy; 2026 Blackvault Technology. MIT Licensed.</div>
            <div className="flex items-center gap-6">
              <a href="/license" className="hover:text-zinc-300">License</a>
              <a href="/acceptable-use" className="hover:text-zinc-300">Acceptable Use</a>
              <a href="/contributing" className="hover:text-zinc-300">Contributing</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Terminal Line ─────────────────────────────────────────────
function TerminalLine({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="mb-1"
    >
      {children}
    </motion.div>
  );
}
