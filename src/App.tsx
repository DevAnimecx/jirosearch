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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createParticle(): ParticleData {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      };
    }

    function updateParticle(p: ParticleData) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    }

    function drawParticle(p: ParticleData) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
      ctx.fill();
    }

    function initParticles() {
      particles = [];
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < count; i++) particles.push(createParticle());
    }
    initParticles();

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
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
    const step = target / (duration / 16);
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
  delay = 0,
  enterprise = false,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay?: number;
  enterprise?: boolean;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="glass-card rounded-2xl p-8 card-hover group h-full">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
            enterprise
              ? "bg-gradient-to-br from-orange-500/20 to-orange-500/5"
              : "bg-orange-500/10"
          }`}
        >
          <Icon className="w-7 h-7 text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </FadeIn>
  );
}

// ── Pricing Card ─────────────────────────────────────────────
function PricingCard({
  tier,
  price,
  period,
  features,
  cta,
  ctaHref,
  highlighted = false,
  badge,
  delay = 0,
}: {
  tier: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div
        className={`relative rounded-3xl p-10 card-hover overflow-hidden h-full ${
          highlighted ? "" : "glass-card"
        }`}
      >
        {highlighted && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#111113] to-[#111113] rounded-3xl" />
            <div className="absolute inset-0 rounded-3xl border-gradient" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
          </>
        )}
        {!highlighted && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
        )}
        <div className="relative">
          {badge && (
            <div
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-6 ${
                highlighted
                  ? "badge-enterprise text-white"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              {badge}
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{tier}</h3>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-bold">{price}</span>
            <span className="text-zinc-500">{period}</span>
          </div>
          <ul className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    highlighted ? "bg-orange-500/20" : "bg-emerald-500/20"
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${
                      highlighted ? "text-orange-500" : "text-emerald-400"
                    }`}
                  />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            className={`block w-full text-center py-4 rounded-2xl font-semibold transition-all duration-300 ${
              highlighted
                ? "btn-primary text-white relative z-10"
                : "bg-white text-black hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
            }`}
          >
            {highlighted ? (
              <span className="relative z-10">{cta}</span>
            ) : (
              cta
            )}
          </a>
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

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#09090b] text-white overflow-x-hidden antialiased min-h-screen">
      <Particles />

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#040405]/90 backdrop-blur-xl border-b border-white/5"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform">
              j
            </div>
            <span className="text-xl font-bold tracking-tight">jiro</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">
              Pricing
            </a>
            <a href="#compare" className="hover:text-white transition-colors duration-200">
              Compare
            </a>
            <a
              href="https://github.com/DevAnimecx/jiro"
              className="hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/DevAnimecx/jiro"
              className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-600 text-sm"
            >
              <Github className="w-4 h-4" />
              Star
            </a>
            <a
              href="#get-started"
              className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative z-10"
            >
              <span className="relative z-10">Get Started Free</span>
            </a>
            <button
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#040405]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-3">
            <a href="#features" className="block text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#pricing" className="block text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </a>
            <a href="#compare" className="block text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Compare
            </a>
            <a href="https://github.com/DevAnimecx/jiro" className="block text-zinc-400 hover:text-white">
              GitHub
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-orange-500/[0.02] rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-zinc-300">v0.2.11 — Enterprise tier now available</span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-[1.05] tracking-tight">
              <span className="block text-white">Search Intelligence</span>
              <span className="gradient-text">Platform</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              One API. <span className="text-white font-medium">9 search engines</span>.{" "}
              <span className="text-white font-medium">12 social platforms</span>. AI-powered.{" "}
              <span className="text-orange-500 font-medium">Free forever</span>.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="#get-started"
                className="btn-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold relative z-10 pulse-ring"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
              <a
                href="https://github.com/DevAnimecx/jiro"
                className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-white/5"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="max-w-3xl mx-auto">
              <div className="code-block p-1 glow-orange-sm float">
                <div className="bg-[#0c0c0e] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
                    </div>
                    <span className="text-xs text-zinc-600 font-mono">terminal</span>
                  </div>
                  <div className="text-left text-sm md:text-base font-mono leading-relaxed">
                    <TerminalLine delay={0.5}>
                      <span className="text-zinc-600">$</span>{" "}
                      <span className="text-emerald-400">pip</span> install jirosearch
                    </TerminalLine>
                    <TerminalLine delay={0.7}>
                      <span className="text-zinc-600">$</span>{" "}
                      <span className="text-emerald-400">jiro</span> serve
                    </TerminalLine>
                    <TerminalLine delay={0.9}>
                      <span className="text-zinc-600">→</span>{" "}
                      <span className="text-zinc-500">Jiro v0.2.11 running on</span>{" "}
                      <span className="text-orange-500">http://localhost:8000</span>
                    </TerminalLine>
                    <TerminalLine delay={1.1}>
                      <span className="text-zinc-600">$</span>{" "}
                      <span className="text-emerald-400">curl</span> -X POST localhost:8000/search -d{" "}
                      <span className="text-amber-300">'&#123;"q":"AI research"&#125;'</span>
                    </TerminalLine>
                    <TerminalLine delay={1.3}>
                      <span className="text-zinc-600">→</span>{" "}
                      <span className="text-zinc-500">&#123;</span>{" "}
                      <span className="text-zinc-400">"results"</span>:{" "}
                      <span className="text-orange-500">[...]</span>
                      <span className="text-zinc-500">,</span>{" "}
                      <span className="text-zinc-400">"engine"</span>:{" "}
                      <span className="text-emerald-400">"google"</span>
                      <span className="text-zinc-500"> &#125;</span>
                    </TerminalLine>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <section className="py-6 border-y border-white/5 bg-[#040405]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <FadeIn>
              <div className="text-3xl md:text-4xl font-bold text-white">
                <Counter target={9} />
              </div>
              <div className="text-sm text-zinc-500 mt-1">Search Engines</div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="text-3xl md:text-4xl font-bold text-white">
                <Counter target={12} />
              </div>
              <div className="text-sm text-zinc-500 mt-1">Social Platforms</div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-3xl md:text-4xl font-bold text-white">
                <Counter target={75} />
              </div>
              <div className="text-sm text-zinc-500 mt-1">API Endpoints</div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-3xl md:text-4xl font-bold text-orange-500">
                $<Counter target={0} />
              </div>
              <div className="text-sm text-zinc-500 mt-1">/mo Free Tier</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium mb-4">
                FEATURES
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Everything you need
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Search intelligence that scales from prototype to production. No vendor lock-in.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Search}
              title="Hybrid Search"
              description="Combines keyword, semantic, and freshness signals for the most relevant results across 9 engines."
              delay={0}
            />
            <FeatureCard
              icon={Globe}
              title="12 Social Platforms"
              description="Reddit, Twitter/X, YouTube, LinkedIn, TikTok, Instagram, Facebook, Threads, Hacker News, Bluesky, Telegram, Pinterest."
              delay={0.1}
            />
            <FeatureCard
              icon={Brain}
              title="Smart Search"
              description="Intent-aware auto-routing picks the best engine for every query. 16 intent types supported."
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Structured Extraction"
              description="Extract structured JSON data from any web page using JSON schemas. LLM-assisted extraction."
              delay={0.3}
            />
            <FeatureCard
              icon={Bot}
              title="MCP Integration"
              description="16 tools for Claude Desktop, Cursor, and any MCP-compatible client. AI agents love Jiro."
              delay={0.4}
            />
            <FeatureCard
              icon={Building2}
              title="Enterprise Ready"
              description="Multi-tenant isolation, SOC2 compliance, SLA monitoring, HMAC license tokens, webhooks, batch jobs."
              delay={0.5}
              enterprise
            />
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium mb-4">
                HOW IT WORKS
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Three lines to start
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-orange-500">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Install</h3>
                <div className="code-block p-4 text-left">
                  <code className="text-sm font-mono">
                    <span className="text-emerald-400">pip</span> install jirosearch
                  </code>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-orange-500">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Start</h3>
                <div className="code-block p-4 text-left">
                  <code className="text-sm font-mono">
                    <span className="text-emerald-400">jiro</span> serve
                  </code>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-orange-500">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Search</h3>
                <div className="code-block p-4 text-left">
                  <code className="text-sm font-mono">
                    <span className="text-emerald-400">curl</span> localhost:8000/search
                  </code>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ── Pricing ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium mb-4">
                PRICING
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Simple, transparent pricing
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Start free. Scale when you're ready. No hidden fees.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              tier="Free"
              price="$0"
              period="/forever"
              badge="MOST POPULAR"
              features={[
                "100 requests/minute",
                "10,000 requests/day",
                "9 search engines",
                "12 social platforms",
                "Hybrid search & smart routing",
                "MCP integration (16 tools)",
              ]}
              cta="Get Started Free"
              ctaHref="#get-started"
              delay={0}
            />
            <PricingCard
              tier="Enterprise"
              price="$499"
              period="/month"
              badge="ENTERPRISE"
              highlighted
              features={[
                "1,000 requests/minute",
                "1,000,000 requests/day",
                "AI-powered agentic research",
                "Custom LLM models",
                "White-label + commercial license",
                "SOC2 + premium support",
              ]}
              cta="Contact Sales"
              ctaHref="mailto:sales@jiro.ai"
              delay={0.15}
            />
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ── Comparison ───────────────────────────────────────────── */}
      <section id="compare" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium mb-4">
                COMPARISON
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Why switch to Jiro?
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                More features. Better pricing. Fully self-hosted.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="py-5 px-6 text-zinc-400 font-medium">Feature</th>
                      <th className="py-5 px-6 text-center">
                        <span className="text-orange-500 font-bold text-lg">Jiro</span>
                      </th>
                      <th className="py-5 px-6 text-center text-zinc-500 font-medium">SerpAPI</th>
                      <th className="py-5 px-6 text-center text-zinc-500 font-medium">ScraperAPI</th>
                      <th className="py-5 px-6 text-center text-zinc-500 font-medium">Bright Data</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <ComparisonRow
                      feature="Self-hosted"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="Free tier"
                      jiro="10K RPD"
                      serpApi="100/mo"
                      scraperApi="5K/mo"
                      brightData="Trial"
                    />
                    <ComparisonRow
                      feature="Search engines"
                      jiro="9"
                      serpApi="8"
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      brightData="50+"
                    />
                    <ComparisonRow
                      feature="Social platforms"
                      jiro="12"
                      serpApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      brightData="Limited"
                    />
                    <ComparisonRow
                      feature="Hybrid search"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="MCP integration"
                      jiro={<Check className="w-5 h-5 text-emerald-400 mx-auto" />}
                      serpApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      scraperApi={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                      brightData={<XIcon className="w-5 h-5 text-red-400/60 mx-auto" />}
                    />
                    <ComparisonRow
                      feature="Paid tier"
                      jiro="$499/mo"
                      serpApi="$50/mo"
                      scraperApi="$49/mo"
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

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section id="get-started" className="py-28 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Start building today
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl text-zinc-400 mb-12">
              No credit card required. No rate limits on local usage.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="code-block p-6 text-left max-w-2xl mx-auto mb-12 glow-orange-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
              </div>
              <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
                <code>
                  <span className="text-zinc-600">$</span>{" "}
                  <span className="text-emerald-400">pip</span> install jirosearch{"\n"}
                  <span className="text-zinc-600">$</span>{" "}
                  <span className="text-emerald-400">jiro</span> serve{"\n"}
                  <span className="text-zinc-600">→</span>{" "}
                  <span className="text-zinc-500">Jiro v0.2.11 running on</span>{" "}
                  <span className="text-orange-500">http://localhost:8000</span>{"\n"}
                  <span className="text-zinc-600">→</span>{" "}
                  <span className="text-zinc-500">Docs:</span>{" "}
                  <span className="text-zinc-400">http://localhost:8000/docs</span>
                </code>
              </pre>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/DevAnimecx/jiro"
                className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-white/5"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
              <a
                href="https://discord.gg/jiro"
                className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-white/5"
              >
                Join Discord
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                j
              </div>
              <span className="font-bold">jiro</span>
              <span className="text-sm text-zinc-600">v0.2.11</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="https://github.com/DevAnimecx/jiro" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://discord.gg/jiro" className="hover:text-white transition-colors">
                Discord
              </a>
              <a href="https://twitter.com/jirosearch" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="/docs" className="hover:text-white transition-colors">
                Docs
              </a>
              <a href="/openapi.json" className="hover:text-white transition-colors">
                API
              </a>
            </div>
            <div className="text-sm text-zinc-600">&copy; 2026 Blackvault Technology</div>
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
