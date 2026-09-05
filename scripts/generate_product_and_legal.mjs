import fs from 'fs';
import path from 'path';
import { SHARED_CSS, renderHeader, renderFooter, ensureDir, GITHUB_REPO, BASE_URL } from './shared_templates.mjs';

// 1. PRICING PAGE
function generatePricing() {
  const dir = path.join(process.cwd(), 'public/pricing');
  ensureDir(dir);

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing &amp; Plans | Jiro Search Platform</title>
  <meta name="description" content="Transparent, predictable pricing for Jiro. 100% Free self-hosted MIT open source, or managed cloud tiers starting at $29/mo for production AI agents.">
  <link rel="canonical" href="${BASE_URL}/pricing/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    .pricing-hero { text-align: center; padding: 70px 24px 40px; max-width: 800px; margin: 0 auto; }
    .pricing-hero h1 { font-family: var(--font-display); font-size: 48px; font-style: italic; color: #fff; margin-bottom: 16px; }
    .pricing-hero p { font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.6; }
    .pricing-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 1160px; margin: 40px auto; padding: 0 24px; }
    @media (min-width: 840px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }
    .pricing-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .pricing-card.featured {
      border-color: var(--gold-base);
      background: linear-gradient(180deg, rgba(255, 102, 0, 0.08), rgba(255, 255, 255, 0.02));
    }
    .featured-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--gold-base);
      color: #000;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
    }
    .plan-title { font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 8px; }
    .plan-desc { font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 20px; height: 38px; }
    .plan-price { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 20px; }
    .plan-price span { font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.5); }
    .plan-features { list-style: none; margin-bottom: 32px; flex: 1; }
    .plan-features li { font-size: 13px; color: rgba(255,255,255,0.75); margin-bottom: 12px; display: flex; align-items: flex-start; gap: 8px; }
    .plan-features li svg { flex-shrink: 0; color: var(--gold-light); margin-top: 3px; }
    .plan-btn {
      display: block;
      text-align: center;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }
    .plan-btn.primary { background: var(--gold-base); color: #000; }
    .plan-btn.primary:hover { background: var(--gold-hover); text-decoration: none; }
    .plan-btn.secondary { background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: #fff; }
    .plan-btn.secondary:hover { background: rgba(255,255,255,0.12); text-decoration: none; }
  </style>
</head>
<body>
  ${renderHeader('pricing')}

  <main>
    <div class="pricing-hero">
      <div style="font-family: var(--font-code); font-size: 11px; color: var(--gold-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">OPEN SOURCE &amp; MANAGED CLOUD TIERS</div>
      <h1>Simple, Predictable Search Pricing</h1>
      <p>Self-host for free with the MIT License forever, or deploy on managed Blackvault cloud infrastructure with dedicated proxy rotation pools and 99.9% SLAs.</p>
    </div>

    <div class="pricing-grid">
      <!-- FREE TIER -->
      <div class="pricing-card">
        <h3 class="plan-title">Community (MIT)</h3>
        <p class="plan-desc">For developers, homelabs, and self-hosted agent research.</p>
        <div class="plan-price">$0 <span>/ forever</span></div>
        <ul class="plan-features">
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited local queries</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> All 9 search engines</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 12 social media scrapers</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Full MCP Server (stdio &amp; SSE)</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Docker &amp; Helm charts</li>
        </ul>
        <a href="${GITHUB_REPO}" target="_blank" rel="noopener" class="plan-btn secondary">Clone from GitHub &rarr;</a>
      </div>

      <!-- STARTER TIER -->
      <div class="pricing-card">
        <h3 class="plan-title">Starter</h3>
        <p class="plan-desc">For early-stage startups and production AI micro-agents.</p>
        <div class="plan-price">$29 <span>/ month</span></div>
        <ul class="plan-features">
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 50,000 queries / month</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 10 concurrent requests</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Managed anti-ban proxy pool</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Automated daily backup</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Community Discord support</li>
        </ul>
        <a href="https://github.com/DevAnimecx/jiro/issues" target="_blank" rel="noopener" class="plan-btn secondary">Get Started</a>
      </div>

      <!-- PRO TIER -->
      <div class="pricing-card featured">
        <span class="featured-badge">MOST POPULAR</span>
        <h3 class="plan-title">Pro Tier</h3>
        <p class="plan-desc">For high-scale agent workflows and automated scraping fleets.</p>
        <div class="plan-price">$99 <span>/ month</span></div>
        <ul class="plan-features">
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 250,000 queries / month</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 50 concurrent requests</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Residential &amp; ISP IP rotation</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Smart intent classification (16 types)</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority developer support</li>
        </ul>
        <a href="https://github.com/DevAnimecx/jiro/issues" target="_blank" rel="noopener" class="plan-btn primary">Upgrade to Pro</a>
      </div>

      <!-- ENTERPRISE TIER -->
      <div class="pricing-card">
        <h3 class="plan-title">Enterprise</h3>
        <p class="plan-desc">For bespoke infrastructure, custom scrapers, and 99.9% SLA.</p>
        <div class="plan-price">$499 <span>/ month</span></div>
        <ul class="plan-features">
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 1,000,000+ queries / month</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited concurrency</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 99.9% Uptime Guarantee</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom platform extractors</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated Slack / Discord channel</li>
        </ul>
        <a href="https://github.com/DevAnimecx/jiro" target="_blank" rel="noopener" class="plan-btn secondary">Contact Sales</a>
      </div>
    </div>
  </main>

  ${renderFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log("Generated /pricing/index.html");
}

// 2. CHANGELOG PAGE (AUTO-SYNC FROM GITHUB)
function generateChangelog() {
  const dir = path.join(process.cwd(), 'public/changelog');
  ensureDir(dir);

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Changelog &amp; Release History | Jiro</title>
  <meta name="description" content="Official changelog for Jiro Search: live synchronized with GitHub releases, commit history, and PyPI updates.">
  <link rel="canonical" href="${BASE_URL}/changelog/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    .changelog-wrap { max-width: 820px; margin: 48px auto; padding: 0 24px; }
    .changelog-header { margin-bottom: 48px; }
    .changelog-header h1 { font-family: var(--font-display); font-size: 42px; font-style: italic; color: #fff; margin-bottom: 12px; }
    .sync-status { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 36px; font-size: 13px; }
    .timeline-item { position: relative; padding-left: 32px; margin-bottom: 48px; border-left: 1px solid var(--border); }
    .timeline-dot { position: absolute; left: -6px; top: 0; width: 11px; height: 11px; border-radius: 50%; background: var(--gold-base); }
    .release-tag { font-family: var(--font-code); font-size: 13px; color: var(--gold-light); font-weight: 600; margin-bottom: 6px; }
    .release-title { font-family: var(--font-display); font-size: 24px; font-style: italic; color: #fff; margin-bottom: 12px; }
    .release-date { font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 16px; }
    .release-body { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; }
    .release-body ul { margin: 12px 0 16px 20px; }
    .release-body li { margin-bottom: 6px; }
  </style>
</head>
<body>
  ${renderHeader('changelog')}

  <main class="changelog-wrap" role="main">
    <div class="changelog-header">
      <div style="font-family: var(--font-code); font-size: 11px; color: var(--gold-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">CONTINUOUS DELIVERY</div>
      <h1>Product Changelog</h1>
      <p style="color: rgba(255,255,255,0.6); font-size: 15px;">Live releases, PyPI bumps, and Git commits from the open-source Jiro repository.</p>
    </div>

    <div class="sync-status">
      <div>
        <span style="color: #4ade80;">&bull;</span> Auto-synced with <a href="${GITHUB_REPO}" target="_blank" rel="noopener">DevAnimecx/jiro</a>
      </div>
      <button onclick="fetchLatestCommits()" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer;">Refresh Commits</button>
    </div>

    <div id="liveCommitsContainer"></div>

    <div class="timeline">
      <!-- RELEASE 0.2.8 -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="release-tag">v0.2.8 (Latest PyPI)</div>
        <h2 class="release-title">PyPI Release Bump &amp; Hybrid Optimization</h2>
        <div class="release-date">September 5, 2026 &bull; Commit cd058e2</div>
        <div class="release-body">
          <p>Official release bump to version 0.2.8 published to PyPI as <code>jirosearch</code>.</p>
          <ul>
            <li>Bump version to 0.2.8 across package manifest and pyproject.toml.</li>
            <li>Optimized Reciprocal Rank Fusion (RRF) CPU memory allocation by 35%.</li>
            <li>Hardened DuckDuckGo HTML parser for fallback edge queries.</li>
          </ul>
        </div>
      </div>

      <!-- RELEASE 0.2.2 -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="release-tag">v0.2.2</div>
        <h2 class="release-title">Model Context Protocol (MCP) &amp; 12 Social Scrapers</h2>
        <div class="release-date">August 28, 2026</div>
        <div class="release-body">
          <p>Added full Model Context Protocol support and social scraping engine expansion.</p>
          <ul>
            <li>Exposed 17 native tools over stdio and SSE transport protocols.</li>
            <li>Added extractors for Reddit, YouTube transcripts, Bluesky, and TikTok.</li>
            <li>Implemented zero-token CPU answer synthesis.</li>
          </ul>
        </div>
      </div>

      <!-- RELEASE 0.2.0 -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="release-tag">v0.2.0</div>
        <h2 class="release-title">Search Intelligence Core Platform Launch</h2>
        <div class="release-date">August 15, 2026</div>
        <div class="release-body">
          <p>Initial public release of Jiro Search engine aggregator with 9 search engines.</p>
        </div>
      </div>
    </div>
  </main>

  ${renderFooter()}

  <script>
    async function fetchLatestCommits() {
      const container = document.getElementById('liveCommitsContainer');
      try {
        const res = await fetch('https://api.github.com/repos/DevAnimecx/jiro/commits?per_page=5');
        if (res.ok) {
          const commits = await res.json();
          let html = '<div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:12px; padding:18px; margin-bottom:36px;">';
          html += '<h3 style="font-size:13px; font-weight:600; color:var(--gold-light); text-transform:uppercase; margin-bottom:12px;">Live Commits from GitHub</h3><ul style="list-style:none;">';
          commits.forEach(c => {
            html += '<li style="margin-bottom:8px; font-size:13px;"><code style="color:var(--gold-light);">' + c.sha.substring(0,7) + '</code> - ' + c.commit.message.split('\\n')[0] + ' <span style="color:rgba(255,255,255,0.4); font-size:11px;">(' + new Date(c.commit.author.date).toLocaleDateString() + ')</span></li>';
          });
          html += '</ul></div>';
          container.innerHTML = html;
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    fetchLatestCommits();
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log("Generated /changelog/index.html");
}

// 4. ROADMAP PAGE
function generateRoadmap() {
  const dir = path.join(process.cwd(), 'public/roadmap');
  ensureDir(dir);

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Public Roadmap | Jiro Search Intelligence</title>
  <meta name="description" content="Explore Jiro engineering roadmap: Phase 1 through Phase 5 completed, and upcoming Phase 6 features for autonomous search agents.">
  <link rel="canonical" href="${BASE_URL}/roadmap/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    .roadmap-wrap { max-width: 900px; margin: 48px auto; padding: 0 24px; }
    .phase-card { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); border-radius: 14px; padding: 28px; margin-bottom: 24px; }
    .phase-status { font-family: var(--font-code); font-size: 11px; padding: 3px 8px; border-radius: 999px; text-transform: uppercase; font-weight: 600; }
    .phase-status.shipped { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
    .phase-status.active { background: rgba(234, 179, 8, 0.15); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.3); }
    .phase-status.planned { background: rgba(255, 102, 0, 0.15); color: var(--gold-light); border: 1px solid rgba(255, 102, 0, 0.3); }
    .phase-title { font-family: var(--font-display); font-size: 26px; font-style: italic; color: #fff; margin: 12px 0; }
    .phase-list { list-style: none; margin-top: 16px; }
    .phase-list li { font-size: 14px; color: rgba(255,255,255,0.75); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
  </style>
</head>
<body>
  ${renderHeader('roadmap')}

  <main class="roadmap-wrap" role="main">
    <div style="text-align: center; margin-bottom: 48px;">
      <div style="font-family: var(--font-code); font-size: 11px; color: var(--gold-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">PUBLIC ARCHITECTURE ROADMAP</div>
      <h1 style="font-family: var(--font-display); font-size: 42px; font-style: italic; color: #fff; margin-bottom: 12px;">Engineering Phases</h1>
      <p style="color: rgba(255,255,255,0.6); font-size: 15px;">Track development across core search capabilities, social extractors, and agent infrastructure.</p>
    </div>

    <!-- PHASE 1 -->
    <div class="phase-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600;">PHASE 1</span>
        <span class="phase-status shipped">Shipped &bull; v0.2.0</span>
      </div>
      <h2 class="phase-title">Search Intelligence Engine</h2>
      <ul class="phase-list">
        <li>&check; 9 Search engines (Google, DuckDuckGo, Bing, Brave, Yahoo, Mojeek, Searx, Startpage, Qwant)</li>
        <li>&check; Reciprocal Rank Fusion (RRF) algorithm</li>
        <li>&check; Extractive answer synthesis on CPU without LLM token fees</li>
        <li>&check; Query-aware snippet highlighting</li>
      </ul>
    </div>

    <!-- PHASE 2 -->
    <div class="phase-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600;">PHASE 2</span>
        <span class="phase-status shipped">Shipped &bull; v0.2.2</span>
      </div>
      <h2 class="phase-title">12 Social Media Scrapers</h2>
      <ul class="phase-list">
        <li>&check; Reddit thread &amp; comment scraper</li>
        <li>&check; YouTube metadata &amp; subtitle transcript extractor</li>
        <li>&check; Bluesky, Twitter/X, and Threads extraction</li>
        <li>&check; TikTok subtitles and Instagram Reels metadata</li>
      </ul>
    </div>

    <!-- PHASE 3 -->
    <div class="phase-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600;">PHASE 3</span>
        <span class="phase-status shipped">Shipped &bull; v0.2.5</span>
      </div>
      <h2 class="phase-title">Advanced Agent Capabilities</h2>
      <ul class="phase-list">
        <li>&check; JSON Schema-based structured data extraction</li>
        <li>&check; Intent classification engine with 16 types and 0ms latency</li>
        <li>&check; Dynamic engine routing based on detected intent</li>
        <li>&check; 5 extensible plugin types (engine, search, datasource, extractor, social)</li>
      </ul>
    </div>

    <!-- PHASE 4 & 5 -->
    <div class="phase-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600;">PHASE 4 &amp; 5</span>
        <span class="phase-status active">Active Development &bull; v0.2.8</span>
      </div>
      <h2 class="phase-title">Pro Tier &amp; Production Readiness</h2>
      <ul class="phase-list">
        <li>&check; API Key authentication &amp; token-bucket rate limiting</li>
        <li>&check; Official Kubernetes Helm chart for distributed deployments</li>
        <li>&check; Docker one-line container execution</li>
        <li>&check; OpenAPI 3.1 schema and client SDK generators</li>
      </ul>
    </div>

    <!-- PHASE 6 -->
    <div class="phase-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600;">PHASE 6</span>
        <span class="phase-status planned">Future RFCs</span>
      </div>
      <h2 class="phase-title">Edge WASM Runtime &amp; Multi-Modal Extraction</h2>
      <ul class="phase-list">
        <li>&bull; WebAssembly runtime for client-side search indexing</li>
        <li>&bull; Multi-modal video frame keyframe extraction</li>
        <li>&bull; Autonomous recursive research agent harness</li>
      </ul>
    </div>
  </main>

  ${renderFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log("Generated /roadmap/index.html");
}

// 5. CONTRIBUTING PAGE
function generateContributing() {
  const dir = path.join(process.cwd(), 'public/contributing');
  ensureDir(dir);

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contributing to Jiro | Developer Guidelines</title>
  <meta name="description" content="Official contributing guide for Jiro: Development setup, writing tests, creating search engine plugins, and pull request workflow.">
  <link rel="canonical" href="${BASE_URL}/contributing/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    .guide-wrap { max-width: 820px; margin: 48px auto; padding: 0 24px; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8); }
    .guide-wrap h1 { font-family: var(--font-display); font-size: 40px; font-style: italic; color: #fff; margin-bottom: 16px; }
    .guide-wrap h2 { font-family: var(--font-display); font-size: 26px; font-style: italic; color: #fff; margin: 36px 0 16px; }
    .guide-wrap pre { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 16px; border-radius: 10px; font-family: var(--font-code); font-size: 13px; margin: 16px 0; }
  </style>
</head>
<body>
  ${renderHeader()}

  <main class="guide-wrap" role="main">
    <h1>Contributing to Jiro</h1>
    <p>We welcome contributions from the open-source community! Whether fixing a bug, adding a new search engine plugin, or optimizing scraping heuristics, your input is valued.</p>

    <h2>1. Local Development Setup</h2>
    <pre><code>git clone ${GITHUB_REPO}.git
cd jiro
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"</code></pre>

    <h2>2. Running the Test Suite</h2>
    <pre><code>pytest tests/ -v
# Run with coverage report
pytest --cov=jiro tests/</code></pre>

    <h2>3. Adding a New Search Engine Plugin</h2>
    <p>Jiro utilizes an extensible plugin registry. Create a new subclass under <code>jiro/engines/</code> implementing the <code>BaseSearchEngine</code> interface and register your engine in <code>__init__.py</code>.</p>

    <h2>4. Pull Request Protocol</h2>
    <ul>
      <li>Create a descriptive topic branch (e.g. <code>feat/engine-startpage</code>).</li>
      <li>Ensure all unit tests pass and code conforms to <code>ruff</code> formatting.</li>
      <li>Submit your PR against the <code>main</code> branch on GitHub.</li>
    </ul>
  </main>

  ${renderFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log("Generated /contributing/index.html");
}

// 6. ALL LEGAL PAGES
function generateLegalPages() {
  const pages = [
    {
      slug: 'terms',
      title: 'Terms of Service | Jiro Controlled Open Source',
      metaDesc: 'Terms of service governing the use of Jiro software, self-hosted binaries, and Blackvault cloud services.',
      heading: 'Terms of Service',
      content: `
        <p>Last updated: September 5, 2026</p>
        <h2>1. Agreement to Terms</h2>
        <p>By accessing or using the Jiro search engine software, Python packages, API services, or websites provided by Blackvault Technology, you agree to be bound by these Terms of Service.</p>
        
        <h2>2. Open Source License vs. Controlled Trademarks</h2>
        <p>The Jiro core source code is licensed under the permissive MIT License. However, the names "Jiro", "Jiro Search", "Blackvault Technology", and associated logos are proprietary trademarks. You may freely fork and modify the code, but you may not use the official trademarks in a manner that implies endorsement or affiliation without written permission.</p>

        <h2>3. Acceptable Use of Search Egress</h2>
        <p>Users who utilize Jiro for web scraping, metasearch, or agentic retrieval must adhere to the laws of their jurisdiction, respect targets' <code>robots.txt</code> files, and refrain from launching Denial of Service (DoS) attacks or bypassing paywalls.</p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>The software is provided "AS IS", without warranty of any kind, express or implied, including but not limited to fitness for a particular purpose.</p>
      `
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy | Local-First & Zero Logs | Jiro',
      metaDesc: 'Jiro is architected as local-first software: zero search query logging, no telemetry, and no third-party ad tracking.',
      heading: 'Privacy Policy',
      content: `
        <p>Last updated: September 5, 2026</p>
        <h2>1. Local-First Architectural Commitment</h2>
        <p>Jiro was built to restore privacy to developer search. When running Jiro self-hosted, your search queries, agent tool calls, and scraped content remain strictly within your local machine or private cloud network. Jiro contains zero telemetry code.</p>

        <h2>2. Information We Do NOT Collect</h2>
        <ul>
          <li>We do NOT log your search queries.</li>
          <li>We do NOT track your IP address or agent behavior.</li>
          <li>We do NOT sell user analytics to third-party ad networks.</li>
        </ul>

        <h2>3. Cloud Managed Tiers</h2>
        <p>For customers utilizing our managed Blackvault Cloud API, queries are processed transiently in-memory and discarded immediately upon response delivery.</p>
      `
    },
    {
      slug: 'acceptable-use',
      title: 'Acceptable Use Policy | Ethical Scraping Guidelines | Jiro',
      metaDesc: 'Acceptable Use Policy defining ethical web scraping guidelines, rate limits, and compliance protocols for Jiro.',
      heading: 'Acceptable Use Policy',
      content: `
        <p>Last updated: September 5, 2026</p>
        <h2>1. Purpose &amp; Scope</h2>
        <p>This Acceptable Use Policy establishes ethical requirements for developers building AI agents and scrapers on top of Jiro.</p>

        <h2>2. Required Conduct</h2>
        <ul>
          <li><strong>Robots.txt Adherence:</strong> Maintain respect for site crawling policies.</li>
          <li><strong>Request Pacing:</strong> Enforce polite pacing intervals (minimum 1 second between requests per domain).</li>
          <li><strong>No Circumvention of Authentication:</strong> Do not use Jiro to bypass authentication gates, CAPTCHAs, or digital rights management mechanisms.</li>
        </ul>
      `
    },
    {
      slug: 'license',
      title: 'MIT License &amp; Trademark Policy | Jiro Search',
      metaDesc: 'Official MIT License text and trademark usage guidelines for the Jiro search intelligence platform.',
      heading: 'MIT License &amp; Trademark Policy',
      content: `
        <h2>MIT License</h2>
        <pre><code>Copyright (c) 2026 Blackvault Technology (Adarsh Kushwah)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</code></pre>

        <h2>Trademark Guidelines</h2>
        <p>While the code is open under MIT, the name "Jiro" and associated logos are trademarks of Blackvault Technology. You are free to redistribute the code, provided you do not brand your modified version as the official "Jiro Search Platform".</p>
      `
    },
    {
      slug: 'security',
      title: 'Security Policy &amp; Vulnerability Disclosure | Jiro',
      metaDesc: 'Responsible vulnerability disclosure program, SSRF protection architecture, and security practices for Jiro.',
      heading: 'Security &amp; Vulnerability Disclosure',
      content: `
        <p>Last updated: September 5, 2026</p>
        <h2>1. Reporting a Vulnerability</h2>
        <p>If you discover a security vulnerability in Jiro, please disclose it responsibly. Do NOT open a public GitHub issue. Instead, email our security team directly at <code>security@jiro.dev</code>.</p>

        <h2>2. SSRF Protection Architecture</h2>
        <p>Jiro features built-in Server-Side Request Forgery (SSRF) circuit breakers that reject private IP ranges (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16) and link-local cloud metadata addresses (169.254.169.254) by default.</p>
      `
    }
  ];

  pages.forEach(p => {
    const pDir = path.join(process.cwd(), 'public', p.slug);
    ensureDir(pDir);

    const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.metaDesc}">
  <link rel="canonical" href="${BASE_URL}/${p.slug}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    .legal-wrap { max-width: 820px; margin: 48px auto; padding: 0 24px; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8); }
    .legal-wrap h1 { font-family: var(--font-display); font-size: 40px; font-style: italic; color: #fff; margin-bottom: 24px; }
    .legal-wrap h2 { font-family: var(--font-display); font-size: 24px; font-style: italic; color: #fff; margin: 32px 0 12px; }
    .legal-wrap pre { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 16px; border-radius: 8px; font-family: var(--font-code); font-size: 12px; margin: 16px 0; overflow-x: auto; }
    .legal-wrap ul { margin: 12px 0 16px 24px; }
    .legal-wrap li { margin-bottom: 8px; }
  </style>
</head>
<body>
  ${renderHeader()}

  <main class="legal-wrap" role="main">
    <h1>${p.heading}</h1>
    ${p.content}
  </main>

  ${renderFooter()}
</body>
</html>`;

    fs.writeFileSync(path.join(pDir, 'index.html'), html, 'utf-8');
    console.log(`Generated /${p.slug}/index.html`);
  });
}

generatePricing();
generateChangelog();
generateRoadmap();
generateContributing();
generateLegalPages();
console.log("Finished generating product and legal pages!");
