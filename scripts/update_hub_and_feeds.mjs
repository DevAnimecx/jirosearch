import fs from 'fs';
import path from 'path';
import { SHARED_CSS, renderHeader, renderFooter, ensureDir, BASE_URL } from './shared_templates.mjs';

const ALL_POSTS = [
  // Original 12
  {
    slug: 'serpapi-alternative',
    title: 'The Free SerpAPI Alternative: How Jiro Compares in 2026',
    desc: 'Compare Jiro and SerpAPI on price, speed, privacy, and engine support. Learn how self-hosting gives you unlimited Google and Bing searches for $0.',
    category: 'Comparisons',
    date: '2026-09-04',
    readTime: '8 min read'
  },
  {
    slug: 'tavily-alternative',
    title: 'The Free Tavily Alternative: AI Search API Comparison',
    desc: 'Tavily charges $0.008/search. Jiro gives you local AI search with 0-key extractive answers, 9 engines, and an MCP server for free. Full comparison.',
    category: 'Comparisons',
    date: '2026-09-04',
    readTime: '7 min read'
  },
  {
    slug: 'mcp-server-guide',
    title: 'How to Give Claude Desktop Web Search with an MCP Server',
    desc: 'Step-by-step guide to configuring Claude Desktop with Jiro MCP server for free, local web search across 9 engines. No API keys, no subscriptions.',
    category: 'MCP & Agents',
    date: '2026-09-04',
    readTime: '5 min read'
  },
  {
    slug: 'social-media-scraping',
    title: 'Scraping 12 Social Platforms with One Python API (No API Keys)',
    desc: 'Extract posts, comments, transcripts, and engagement from Reddit, YouTube, Bluesky, TikTok, and 8 more platforms using Jiro with zero API keys.',
    category: 'Scraping',
    date: '2026-09-04',
    readTime: '9 min read'
  },
  {
    slug: 'hybrid-search-explained',
    title: 'Hybrid Search Explained: Keyword + Semantic + SERP in One API',
    desc: 'Learn how hybrid search combines BM25 keyword matching, vector embeddings, and live SERP results with Reciprocal Rank Fusion for 98.4% precision.',
    category: 'Architecture',
    date: '2026-09-04',
    readTime: '8 min read'
  },
  {
    slug: 'open-source-search-api',
    title: 'Why We Built an Open Source Search API (And Why MIT Matters)',
    desc: 'The search API market is dominated by closed, expensive SaaS. Here is why we built Jiro under the MIT license and how it changes search for developers.',
    category: 'Open Source',
    date: '2026-09-04',
    readTime: '6 min read'
  },
  {
    slug: 'ai-search-without-api-keys',
    title: 'AI Search Without API Keys: How Extractive Synthesis Works',
    desc: 'How Jiro generates instant answers from search results in 8ms using CPU-friendly extractive NLP without calling OpenAI, Anthropic, or any paid LLM.',
    category: 'AI Search',
    date: '2026-09-04',
    readTime: '7 min read'
  },
  {
    slug: 'python-web-scraping-2026',
    title: 'Python Web Scraping in 2026: The Complete Developer Guide',
    desc: 'From requests and BeautifulSoup to anti-bot evasion and headless browsers. Everything you need to know about modern web scraping in Python.',
    category: 'Tutorials',
    date: '2026-09-04',
    readTime: '12 min read'
  },
  {
    slug: 'docker-search-api',
    title: 'Deploying a Search API with Docker and Kubernetes',
    desc: 'Deploy Jiro as a self-hosted search API in production with Docker, Docker Compose, and Kubernetes Helm charts. Scale to millions of queries/day.',
    category: 'DevOps',
    date: '2026-09-04',
    readTime: '8 min read'
  },
  {
    slug: 'intent-classification',
    title: 'How Intent Classification Makes Search Smarter (16 Types, 0ms Latency)',
    desc: 'How Jiro classifies search intent into 16 categories using zero-dependency heuristic pattern matching and routes queries to the optimal engine.',
    category: 'AI Search',
    date: '2026-09-04',
    readTime: '6 min read'
  },
  {
    slug: 'structured-data-extraction',
    title: 'Structured Data Extraction from Search Results with JSON Schema',
    desc: 'Extract typed, validated data from search results using JSON Schema. Turn unstructured web pages into clean data pipelines with Jiro.',
    category: 'Data Engineering',
    date: '2026-09-04',
    readTime: '8 min read'
  },
  {
    slug: 'web-scraping-compliance',
    title: 'Web Scraping Compliance in 2026: robots.txt, ToS, and SSRF',
    desc: 'The legal and ethical landscape of web scraping: hiQ v. LinkedIn, EU copyright directive, robots.txt compliance, SSRF protection, and best practices.',
    category: 'Security',
    date: '2026-09-04',
    readTime: '10 min read'
  },
  // 12 New Posts
  {
    slug: 'gemini-cli-agent-search',
    title: 'Powering Gemini & Claude CLI Agents with Local Search MCP',
    desc: 'Connect Google Gemini CLI, Claude Desktop, and autonomous terminal agents to 9 search engines via local Model Context Protocol (MCP) without commercial API keys.',
    category: 'MCP & Agents',
    date: '2026-09-05',
    readTime: '9 min read'
  },
  {
    slug: 'self-hosted-duckduckgo-scraper',
    title: 'Building a Zero-Token DuckDuckGo & Bing SERP Extractor in Python',
    desc: 'How to build a high-concurrency, resilient SERP extraction engine for DuckDuckGo and Bing using Python, HTTP/2 multiplexing, and anti-ban header rotation.',
    category: 'Tutorials',
    date: '2026-09-05',
    readTime: '11 min read'
  },
  {
    slug: 'cross-encoder-reranking',
    title: 'CPU-Optimized Cross-Encoder Reranking: How Jiro Scores 98.4% Precision',
    desc: 'Explore how Jiro utilizes an 80MB quantized ONNX cross-encoder model to re-rank multi-engine search results on standard CPU hardware with sub-15ms overhead.',
    category: 'Architecture',
    date: '2026-09-04',
    readTime: '10 min read'
  },
  {
    slug: 'reddit-api-alternatives',
    title: 'Scraping Reddit & Subreddits Without OAuth2 App Approval in 2026',
    desc: 'Comprehensive guide to extracting Reddit threads, comments, and upvote metrics without commercial API key fees or complex OAuth2 app approval verification.',
    category: 'Scraping',
    date: '2026-09-04',
    readTime: '8 min read'
  },
  {
    slug: 'kubernetes-scraping-cluster',
    title: 'Deploying a Distributed Web Scraping Cluster with K8s and Jiro',
    desc: 'Production blueprint for orchestrating high-availability Jiro search and scraping pods with Kubernetes Helm charts, HPA scaling, and egress proxy routing.',
    category: 'DevOps',
    date: '2026-09-03',
    readTime: '12 min read'
  },
  {
    slug: 'reciprocal-rank-fusion-deep-dive',
    title: 'Reciprocal Rank Fusion (RRF) Deep Dive: Math, Code, and SERP Tuning',
    desc: 'Master the mathematics and implementation of Reciprocal Rank Fusion (RRF) for merging multi-engine search results into an optimal unified SERP ranking.',
    category: 'Architecture',
    date: '2026-09-03',
    readTime: '10 min read'
  },
  {
    slug: 'anti-bot-fingerprint-evasion',
    title: 'Defeating TLS Fingerprinting and Cloudflare Bot Management in Scrapers',
    desc: 'How modern anti-bot systems detect scrapers via JA3/JA4 TLS fingerprints and HTTP/2 settings frames, and how Jiro impersonates legitimate browser handshakes.',
    category: 'Security',
    date: '2026-09-02',
    readTime: '11 min read'
  },
  {
    slug: 'local-deep-research-agent',
    title: 'Build an Open-Source Deep Research Agent with Jiro and Ollama',
    desc: 'Step-by-step guide to constructing an autonomous deep research agent using local LLMs (Ollama Llama 3.3 / Qwen 2.5), Jiro search synthesis, and citation graph generation.',
    category: 'AI Search',
    date: '2026-09-02',
    readTime: '13 min read'
  },
  {
    slug: 'tiktok-instagram-scraper-api',
    title: 'Extracting Video Transcripts and Metadata from TikTok & Instagram',
    desc: 'Learn how to scrape captions, video transcripts, creator metrics, and audio metadata from TikTok and Instagram Reels using Jiro social extraction endpoints.',
    category: 'Scraping',
    date: '2026-09-01',
    readTime: '9 min read'
  },
  {
    slug: 'searxng-vs-jiro',
    title: 'SearXNG vs Jiro: Head-to-Head Architecture, Latency, and API Comparison',
    desc: 'Detailed engineering comparison between SearXNG and Jiro: metasearch mechanics, memory consumption, MCP integration, and native LLM agent readiness.',
    category: 'Comparisons',
    date: '2026-09-01',
    readTime: '11 min read'
  },
  {
    slug: 'enterprise-search-proxy',
    title: 'Building a High-Throughput Search Proxy with Rate Limiting and Caching',
    desc: 'How to build an enterprise-grade search proxy cluster using Jiro, Redis token buckets, and tier-based API key quotas for scalable AI infrastructure.',
    category: 'Architecture',
    date: '2026-08-31',
    readTime: '10 min read'
  },
  {
    slug: 'async-python-search-sdk',
    title: 'Designing High-Concurrency Async Python SDKs with httpx and Pydantic',
    desc: 'Engineering guide to building strongly-typed, asynchronous search SDK clients in Python with automatic retry backoff, Pydantic validation, and streaming.',
    category: 'Tutorials',
    date: '2026-08-30',
    readTime: '10 min read'
  }
];

// Sort posts by date descending
ALL_POSTS.sort((a, b) => new Date(b.date) - new Date(a.date));

// 1. GENERATE BLOG INDEX (/public/blog/index.html)
function generateBlogIndex() {
  const dir = path.join(process.cwd(), 'public/blog');
  ensureDir(dir);

  const categories = ['All', ...new Set(ALL_POSTS.map(p => p.category))];

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Blog &amp; Search Guides (24 Articles) | Jiro</title>
  <meta name="description" content="In-depth technical guides, architecture breakdowns, comparisons, and benchmarks for web search, scraping, MCP servers, and AI agents. Written by Jiro engineers.">
  <link rel="canonical" href="${BASE_URL}/blog/">
  <meta property="og:title" content="Jiro Engineering Blog &amp; Search Architecture">
  <meta property="og:description" content="24 in-depth guides on local-first search, SerpAPI/Tavily alternatives, MCP server setup, and high-concurrency web scraping.">
  <meta property="og:url" content="${BASE_URL}/blog/">
  <meta property="og:type" content="website">
  <link rel="alternate" type="application/rss+xml" title="Jiro Engineering Blog RSS" href="/blog/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    .blog-hero { padding: 64px 24px 32px; text-align: center; max-width: 800px; margin: 0 auto; }
    .blog-hero h1 { font-family: var(--font-display); font-size: 46px; font-style: italic; color: #fff; margin-bottom: 16px; }
    .blog-hero p { font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.6; }
    
    .filter-bar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 32px auto; max-width: 1000px; padding: 0 24px; }
    .filter-chip {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      color: rgba(255, 255, 255, 0.7);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-chip.active, .filter-chip:hover {
      background: rgba(167, 139, 113, 0.15);
      border-color: var(--gold-base);
      color: #fff;
    }

    .search-input-wrap { max-width: 500px; margin: 0 auto 40px; padding: 0 24px; }
    .search-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 18px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }
    .search-input:focus { border-color: var(--gold-base); }

    .posts-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      max-width: 1160px;
      margin: 0 auto 64px;
      padding: 0 24px;
    }
    @media (min-width: 640px) { .posts-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 992px) { .posts-grid { grid-template-columns: repeat(3, 1fr); } }

    .post-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      transition: all 0.2s;
    }
    .post-card:hover {
      border-color: rgba(167, 139, 113, 0.4);
      transform: translateY(-2px);
      text-decoration: none;
    }
    .card-cat { font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--gold-base); letter-spacing: 0.1em; margin-bottom: 8px; }
    .card-title { font-family: var(--font-display); font-size: 20px; color: #fff; line-height: 1.25; margin-bottom: 12px; font-style: italic; }
    .card-desc { font-size: 13px; color: rgba(255, 255, 255, 0.6); line-height: 1.5; margin-bottom: 20px; flex: 1; }
    .card-meta { display: flex; justify-content: space-between; font-size: 11px; color: rgba(255, 255, 255, 0.4); font-family: var(--font-code); }
  </style>
</head>
<body>
  ${renderHeader('blog')}

  <main>
    <div class="blog-hero">
      <div style="font-family: var(--font-code); font-size: 11px; color: var(--gold-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">ENGINEERING HUB &bull; 24 TECHNICAL GUIDES</div>
      <h1>Jiro Engineering Blog</h1>
      <p>In-depth architectural breakdowns, algorithmic tutorials, SerpAPI/Tavily comparisons, and scraping guides for autonomous AI agents.</p>
    </div>

    <!-- SEARCH INPUT -->
    <div class="search-input-wrap">
      <input type="text" id="blogSearch" class="search-input" placeholder="Search 24 engineering articles...">
    </div>

    <!-- FILTER CHIPS -->
    <div class="filter-bar">
      ${categories.map(c => `<button class="filter-chip ${c === 'All' ? 'active' : ''}" onclick="filterCategory('${c}', this)">${c}</button>`).join('')}
    </div>

    <!-- POSTS GRID -->
    <div class="posts-grid" id="postsGrid">
      ${ALL_POSTS.map(p => `
        <a href="/blog/${p.slug}/" class="post-card" data-category="${p.category}" data-search="${(p.title + ' ' + p.desc + ' ' + p.category).toLowerCase()}">
          <div>
            <div class="card-cat">${p.category}</div>
            <h2 class="card-title">${p.title}</h2>
            <p class="card-desc">${p.desc}</p>
          </div>
          <div class="card-meta">
            <span>${p.readTime}</span>
            <time datetime="${p.date}">${p.date}</time>
          </div>
        </a>
      `).join('')}
    </div>
  </main>

  ${renderFooter()}

  <script>
    let activeCat = 'All';

    function filterCategory(cat, btn) {
      activeCat = cat;
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }

    document.getElementById('blogSearch').addEventListener('input', applyFilters);

    function applyFilters() {
      const q = document.getElementById('blogSearch').value.toLowerCase();
      document.querySelectorAll('.post-card').forEach(card => {
        const matchesCat = activeCat === 'All' || card.dataset.category === activeCat;
        const matchesSearch = !q || card.dataset.search.includes(q);
        card.style.display = (matchesCat && matchesSearch) ? 'flex' : 'none';
      });
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log("Generated /blog/index.html with all 24 posts!");
}

// 2. GENERATE XML SITEMAP (/public/sitemap.xml)
function generateSitemap() {
  const staticPages = [
    '',
    'docs/',
    'pricing/',
    'dashboard/',
    'changelog/',
    'roadmap/',
    'contributing/',
    'terms/',
    'privacy/',
    'acceptable-use/',
    'license/',
    'security/',
    'blog/'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticPages.forEach(p => {
    xml += `  <url>\n    <loc>${BASE_URL}/${p}</loc>\n    <lastmod>2026-09-05</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  ALL_POSTS.forEach(p => {
    xml += `  <url>\n    <loc>${BASE_URL}/blog/${p.slug}/</loc>\n    <lastmod>${p.date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), xml, 'utf-8');
  console.log("Generated /sitemap.xml with all 24 posts + static pages!");
}

// 3. GENERATE RSS FEEDS (/public/blog/feed.xml and /public/feed.xml)
function generateRssFeeds() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n`;
  xml += `  <title>Jiro Engineering Blog</title>\n`;
  xml += `  <link>${BASE_URL}/blog/</link>\n`;
  xml += `  <description>Technical guides on web search, scraping, MCP servers, and AI agent architectures.</description>\n`;
  xml += `  <language>en</language>\n`;
  xml += `  <lastBuildDate>Sat, 05 Sep 2026 00:00:00 GMT</lastBuildDate>\n`;
  xml += `  <atom:link href="${BASE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>\n`;

  ALL_POSTS.forEach(p => {
    xml += `  <item>\n`;
    xml += `    <title><![CDATA[${p.title}]]></title>\n`;
    xml += `    <link>${BASE_URL}/blog/${p.slug}/</link>\n`;
    xml += `    <guid>${BASE_URL}/blog/${p.slug}/</guid>\n`;
    xml += `    <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n`;
    xml += `    <description><![CDATA[${p.desc}]]></description>\n`;
    xml += `    <category>${p.category}</category>\n`;
    xml += `  </item>\n`;
  });

  xml += `</channel>\n</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/blog/feed.xml'), xml, 'utf-8');
  fs.writeFileSync(path.join(process.cwd(), 'public/feed.xml'), xml, 'utf-8');
  console.log("Generated /blog/feed.xml and /feed.xml with 24 posts!");
}

generateBlogIndex();
generateSitemap();
generateRssFeeds();
console.log("Finished hub and feed generation!");
