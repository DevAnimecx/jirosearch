import fs from 'fs';
import path from 'path';
import { SHARED_CSS, renderHeader, renderFooter, ensureDir, GITHUB_REPO, BASE_URL } from './shared_templates.mjs';

console.log("Generating dedicated apps, legal pages, and dashboard...");

// 1. GENERATE DOCS APP (/docs/index.html)
function generateDocsApp() {
  const dir = path.join(process.cwd(), 'public/docs');
  ensureDir(dir);

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentation &amp; API Reference | Jiro Search Intelligence</title>
  <meta name="description" content="Complete documentation for Jiro: Quick start, Python SDK, CLI reference, 9 search engines, 12 social scrapers, MCP server, and Docker deployment.">
  <link rel="canonical" href="${BASE_URL}/docs/">
  <meta property="og:title" content="Jiro Documentation &amp; Developer Guide">
  <meta property="og:description" content="Local-first search intelligence documentation: Python SDK, REST API, MCP server, and self-hosted deployment.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    
    .docs-layout {
      display: flex;
      min-height: calc(100vh - 64px);
    }
    .docs-sidebar {
      width: 280px;
      border-right: 1px solid var(--border);
      background: rgba(10, 10, 10, 0.6);
      padding: 32px 20px;
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      flex-shrink: 0;
    }
    @media (max-width: 860px) {
      .docs-sidebar { display: none; }
    }
    .sidebar-search {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: #fff;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 24px;
      outline: none;
    }
    .sidebar-search:focus {
      border-color: var(--gold-base);
    }
    .sidebar-nav-group {
      margin-bottom: 24px;
    }
    .sidebar-group-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--gold-light);
      margin-bottom: 10px;
    }
    .sidebar-links {
      list-style: none;
    }
    .sidebar-links li {
      margin-bottom: 6px;
    }
    .sidebar-links a {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.65);
      display: block;
      padding: 5px 8px;
      border-radius: 6px;
      transition: all 0.15s;
    }
    .sidebar-links a:hover, .sidebar-links a.active {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
      text-decoration: none;
    }
    .docs-content {
      flex: 1;
      max-width: 900px;
      padding: 40px 48px;
    }
    @media (max-width: 860px) {
      .docs-content { padding: 24px 16px; }
    }
    .docs-content h1 {
      font-family: var(--font-display);
      font-size: 36px;
      font-style: italic;
      color: #fff;
      margin-bottom: 12px;
    }
    .docs-content h2 {
      font-family: var(--font-display);
      font-size: 26px;
      color: #fff;
      margin: 40px 0 16px;
      font-style: italic;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    .docs-content h3 {
      font-size: 18px;
      color: var(--gold-light);
      margin: 24px 0 12px;
    }
    .docs-content p {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 16px;
    }
    .docs-content pre {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      padding: 16px;
      border-radius: 10px;
      font-family: var(--font-code);
      font-size: 13px;
      margin: 16px 0 24px;
      overflow-x: auto;
      position: relative;
    }
    .copy-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.8);
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .copy-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
    .badge-pill {
      font-family: var(--font-code);
      font-size: 11px;
      color: var(--gold-light);
      background: rgba(167, 139, 113, 0.1);
      border: 1px solid rgba(167, 139, 113, 0.2);
      padding: 3px 8px;
      border-radius: 999px;
      display: inline-block;
      margin-bottom: 16px;
    }
    .tab-bar {
      display: flex;
      gap: 8px;
      margin-bottom: -1px;
    }
    .tab-btn {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-bottom: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
    }
    .tab-btn.active {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border-color: var(--gold-base);
    }
  </style>
</head>
<body>
  ${renderHeader('docs')}

  <div class="docs-layout">
    <!-- SIDEBAR -->
    <aside class="docs-sidebar" role="navigation" aria-label="Documentation Sidebar">
      <input type="text" id="docSearchInput" class="sidebar-search" placeholder="Search documentation...">

      <div class="sidebar-nav-group">
        <div class="sidebar-group-title">GETTING STARTED</div>
        <ul class="sidebar-links">
          <li><a href="#overview" class="active">Overview &amp; Architecture</a></li>
          <li><a href="#installation">Installation (PyPI &amp; Source)</a></li>
          <li><a href="#quickstart">Quick Start &amp; CLI</a></li>
          <li><a href="#cli-update">Check &amp; Auto-Update</a></li>
        </ul>
      </div>

      <div class="sidebar-nav-group">
        <div class="sidebar-group-title">CORE CAPABILITIES</div>
        <ul class="sidebar-links">
          <li><a href="#python-sdk">Python SDK Guide</a></li>
          <li><a href="#rest-api">REST API Endpoints</a></li>
          <li><a href="#engines">9 Search Engines</a></li>
          <li><a href="#social-scrapers">12 Social Media Scrapers</a></li>
          <li><a href="#mcp-protocol">Model Context Protocol (MCP)</a></li>
          <li><a href="#extractive-answers">Extractive AI Answers (0-Key)</a></li>
          <li><a href="#hybrid-search">Hybrid Search &amp; Reranking</a></li>
        </ul>
      </div>

      <div class="sidebar-nav-group">
        <div class="sidebar-group-title">PRODUCTION &amp; DEVOPS</div>
        <ul class="sidebar-links">
          <li><a href="#docker-deployment">Docker &amp; Compose</a></li>
          <li><a href="#kubernetes-helm">Kubernetes Helm Chart</a></li>
          <li><a href="#auth-rate-limiting">API Key &amp; Rate Limits</a></li>
          <li><a href="#legal-compliance">robots.txt &amp; Compliance</a></li>
        </ul>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="docs-content" role="main">
      <div class="badge-pill">OFFICIAL JIRO DEVELOPER DOCUMENTATION &bull; VERSION 0.2.8</div>
      <h1>Jiro Search Intelligence Platform</h1>
      <p>
        Jiro is an open-source, local-first web search and scraping API designed from the ground up for autonomous AI agents, LLM tool loops, and high-concurrency developer pipelines.
      </p>

      <!-- SECTION: OVERVIEW -->
      <section id="overview">
        <h2>1. Overview &amp; Architecture</h2>
        <p>
          Unlike legacy scraping services that lock developers into costly per-query fees ($50–$500/month), Jiro runs entirely on your infrastructure (or managed cloud clusters). It aggregates results across 9 distinct search backends, scrapes 12 social media platforms, executes 8ms CPU extractive synthesis, and seamlessly exposes 17 native tools to Claude Desktop and Cursor via the Model Context Protocol.
        </p>
      </section>

      <!-- SECTION: INSTALLATION -->
      <section id="installation">
        <h2>2. Installation</h2>
        <p>Install the official package directly from PyPI, or clone the repository from GitHub:</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code># Install from PyPI
pip install jirosearch

# Or clone and install in editable mode
git clone https://github.com/DevAnimecx/jiro.git
cd jiro
pip install -e .</code></pre>
      </section>

      <!-- SECTION: QUICKSTART & CLI -->
      <section id="quickstart">
        <h2>3. Quick Start &amp; CLI Reference</h2>
        <p>Jiro features an intuitive CLI for local server management, updates, and dashboard hosting:</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code># Start the REST API server (port 8000)
jiro serve

# Start on custom host &amp; port
jiro serve --host 0.0.0.0 --port 8000

# Launch the live developer dashboard
jiro dashboard

# Start the Model Context Protocol (MCP) server for Claude Desktop
jiro mcp --transport stdio</code></pre>
      </section>

      <!-- SECTION: UPDATE MECHANISM -->
      <section id="cli-update">
        <h2>4. Automatic Updates from GitHub</h2>
        <p>Jiro includes built-in commands to query the GitHub repository for updates and perform verified self-updates:</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code># Check if a new version is released on GitHub / PyPI
jiro check-update

# Update to latest version with automated health checks
jiro update

# Force reinstall current version without running tests
jiro update --no-tests --force</code></pre>
      </section>

      <!-- SECTION: PYTHON SDK -->
      <section id="python-sdk">
        <h2>5. Python SDK Reference</h2>
        <p>The <code>jiro</code> Python library provides both synchronous and asynchronous clients:</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code>from jiro import JiroClient

client = JiroClient(base_url="http://localhost:8000")

# 1. Standard Web Search
response = client.search(
    q="latest developments in quantum computing",
    engine="google",
    max_results=5,
    answer=True
)
print("Answer:", response.answer)
for r in response.results:
    print(f"- {r.title} ({r.url})")

# 2. Scrape Social Media Post
reddit_post = client.scrape_social("https://reddit.com/r/MachineLearning/comments/example")
print("Post Title:", reddit_post["title"])
print("Upvotes:", reddit_post["score"])</code></pre>
      </section>

      <!-- SECTION: REST API -->
      <section id="rest-api">
        <h2>6. REST API Endpoints</h2>
        <h3>POST /v1/search</h3>
        <p>Executes multi-engine search with optional hybrid fusion and extractive answer generation.</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code>curl -X POST http://localhost:8000/v1/search \\
  -H "Content-Type: application/json" \\
  -d '{
    "q": "python web scraping best practices",
    "engine": "google",
    "max_results": 10,
    "hybrid": true,
    "answer": true,
    "highlights": true
  }'</code></pre>

        <h3>POST /v1/social</h3>
        <p>Scrapes any supported social platform URL into a clean, normalized JSON schema without requiring platform API keys.</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code>curl -X POST http://localhost:8000/v1/social \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "extract_transcript": true
  }'</code></pre>
      </section>

      <!-- SECTION: 9 ENGINES -->
      <section id="engines">
        <h2>7. The 9 Supported Search Engines</h2>
        <p>Jiro routes queries dynamically or statically across 9 search providers:</p>
        <ul style="margin: 16px 0 24px 24px; color: rgba(255,255,255,0.8);">
          <li><strong>Google:</strong> Full web SERP, knowledge panels, and rich snippets.</li>
          <li><strong>DuckDuckGo:</strong> Fast, privacy-oriented HTML endpoint.</li>
          <li><strong>Bing:</strong> Enterprise-grade web index and technical documentation.</li>
          <li><strong>Brave Search:</strong> Independent index with no search tracking.</li>
          <li><strong>Yahoo:</strong> Traditional web index with strong international localized results.</li>
          <li><strong>Mojeek:</strong> Completely independent European index crawler.</li>
          <li><strong>SearXNG:</strong> Metasearch proxy aggregation.</li>
          <li><strong>Startpage:</strong> Google-powered search with enhanced privacy proxying.</li>
          <li><strong>Qwant:</strong> European search engine prioritizing strict privacy standards.</li>
        </ul>
      </section>

      <!-- SECTION: 12 SOCIAL SCRAPERS -->
      <section id="social-scrapers">
        <h2>8. The 12 Social Media Scrapers</h2>
        <p>Extract public metadata, transcripts, threads, and engagement statistics from:</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 16px 0 24px;">
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Reddit Discussions</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Hacker News</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; YouTube &amp; Transcripts</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Bluesky Social</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Twitter / X</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Threads by Meta</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Instagram Reels</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; TikTok Subtitles</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; LinkedIn Public Posts</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Facebook Public Feeds</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Telegram Channels</div>
          <div style="background: rgba(255,255,255,0.03); border:1px solid var(--border); padding:10px; border-radius:8px;">&bull; Pinterest Boards</div>
        </div>
      </section>

      <!-- SECTION: MCP PROTOCOL -->
      <section id="mcp-protocol">
        <h2>9. Model Context Protocol (MCP) Setup</h2>
        <p>Give Claude Desktop or Cursor native search capabilities by editing your configuration file:</p>

        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code>{
  "mcpServers": {
    "jiro": {
      "command": "jiro",
      "args": ["mcp", "--transport", "stdio"]
    }
  }
}</code></pre>
      </section>

      <!-- SECTION: DOCKER DEPLOYMENT -->
      <section id="docker-deployment">
        <h2>10. Docker &amp; Kubernetes Deployment</h2>
        <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code># Run pre-built Docker image
docker run -d -p 8000:8000 --name jiro devanimecx/jiro:latest

# Deploy via Docker Compose
docker-compose up -d</code></pre>
      </section>
    </main>
  </div>

  ${renderFooter()}

  <script>
    function copyCode(btn) {
      const code = btn.parentElement.querySelector('code').innerText;
      navigator.clipboard.writeText(code);
      btn.innerText = 'Copied!';
      setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
    }

    // Sidebar search filter
    document.getElementById('docSearchInput').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.sidebar-links li').forEach(li => {
        const text = li.innerText.toLowerCase();
        li.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log("Generated /docs/index.html");
}

generateDocsApp();
