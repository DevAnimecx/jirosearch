import fs from 'fs';
import path from 'path';
import { SHARED_CSS, renderHeader, renderFooter, ensureDir, GITHUB_REPO, BASE_URL } from './shared_templates.mjs';

export const ALL_BLOGS_DATA = [
  // 1. SERPAPI ALTERNATIVE
  {
    slug: 'serpapi-alternative',
    title: 'The Free SerpAPI Alternative: How Jiro Compares in 2026',
    metaDesc: 'Looking for a free, open-source SerpAPI alternative? Discover how Jiro delivers 9 search engines, 12 social scrapers, zero monthly subscriptions, and self-hosted control.',
    category: 'Comparisons',
    readTime: '8 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Detailed benchmark & architectural comparison between SerpAPI and Jiro Search. Compare pricing, rate limits, latency, and self-hosting benefits.',
    content: `
      <h2>The Problem with Commercial Search APIs in 2026</h2>
      <p>For nearly a decade, developers building autonomous agents, market research pipelines, and SEO dashboards relied on commercial SERP providers like SerpAPI. While reliable, commercial search APIs introduce severe operational drawbacks in modern high-frequency agent loops:</p>
      
      <ul>
        <li><strong>Prohibitive Metered Billing:</strong> SerpAPI charges $50/month for a baseline of 5,000 searches ($0.01/search), scaling up to $250/month for 30,000 searches. An autonomous Deep Research agent executing 100 queries per run exhausts starter tiers in under two days.</li>
        <li><strong>Hard Rate Limits & Concurrency Chokepoints:</strong> Strict concurrent request limits (often 10–20 parallel threads) throttle batch data ingestion pipelines.</li>
        <li><strong>Data Privacy & Compliance Exposure:</strong> Query payloads containing proprietary customer data or corporate research pass through third-party infrastructure.</li>
      </ul>

      <p><strong>Jiro</strong> was architected as an MIT-licensed, local-first search intelligence engine that runs directly on your hardware or internal Kubernetes cluster with zero per-query fees and zero API key requirements.</p>

      <h2>Head-to-Head Architectural Comparison</h2>
      <div class="table-responsive">
        <table style="width:100%; border-collapse:collapse; margin:24px 0;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255, 102, 0, 0.4); text-align: left;">
              <th style="padding: 12px 16px; color: var(--gold-light);">Feature</th>
              <th style="padding: 12px 16px; color: var(--gold-light);">SerpAPI (Commercial)</th>
              <th style="padding: 12px 16px; color: var(--gold-base);">Jiro (Open Source MIT)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Pricing</td>
              <td style="padding: 12px 16px; color: #f87171;">$50 – $250+ / month</td>
              <td style="padding: 12px 16px; color: #4ade80;">$0 / Free Forever (Self-Hosted)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Monthly Query Limit</td>
              <td style="padding: 12px 16px;">5,000 – 30,000 queries</td>
              <td style="padding: 12px 16px; color: #4ade80;">Unlimited (Hardware-bound)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Search Engines Supported</td>
              <td style="padding: 12px 16px;">Google, Bing, Yahoo, Baidu</td>
              <td style="padding: 12px 16px; color: #4ade80;">9 Engines (Google, Bing, DDG, Brave, Qwant, Startpage, Searx, Yahoo, Mojeek)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Social Media Scrapers</td>
              <td style="padding: 12px 16px; color: #f87171;">Not natively built-in</td>
              <td style="padding: 12px 16px; color: #4ade80;">12 Platforms (Reddit, YouTube, TikTok, Bluesky, GitHub, Twitch, etc.)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">AI Extractive Answers</td>
              <td style="padding: 12px 16px;">Knowledge graph snippet only</td>
              <td style="padding: 12px 16px; color: #4ade80;">Built-in 8ms 0-Key Extractive AI Answer Engine</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">MCP Agent Server</td>
              <td style="padding: 12px 16px; color: #f87171;">Third-party wrapper needed</td>
              <td style="padding: 12px 16px; color: #4ade80;">Native 17-Tool MCP Server (stdio &amp; SSE)</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight:600;">Data Privacy</td>
              <td style="padding: 12px 16px; color: #f87171;">Queries logged on vendor cloud</td>
              <td style="padding: 12px 16px; color: #4ade80;">100% Private (Runs on localhost)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Quick Start: Migrating from SerpAPI to Jiro</h2>
      <p>Replacing SerpAPI in your Python codebase requires changing just two lines of code:</p>

      <pre><code># Install Jiro
pip install jiro

# Python Implementation
from jiro import JiroClient

client = JiroClient(base_url="http://localhost:8000")

# Multi-engine search with automatic fallback
results = client.search(
    query="vector database benchmarks 2026",
    engine="google",
    max_results=10,
    answer=True
)

print(f"Extractive Answer: {results.answer}")
for item in results.items:
    print(f"- {item.title} ({item.url})")</code></pre>

      <h2>Conclusion</h2>
      <p>By moving from closed metered SaaS to Jiro's open-source architecture, engineering teams eliminate unpredictable SaaS bills, achieve sub-50ms local latency, and gain full architectural sovereignty over their AI agent workflows.</p>
    `
  },

  // 2. TAVILY ALTERNATIVE
  {
    slug: 'tavily-alternative',
    title: 'The Free Tavily Alternative: AI Search API Comparison',
    metaDesc: 'Tavily charges $0.008/search. Jiro gives you local AI search with 0-key extractive answers, 9 engines, and an MCP server for free. Full comparison.',
    category: 'Comparisons',
    readTime: '7 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Deep-dive analysis comparing Tavily Search API with Jiro. Explore extractive answer synthesis, token costs, latency benchmarks, and local agent integration.',
    content: `
      <h2>The Rise of AI Search APIs & The Cost Challenge</h2>
      <p>Tavily popularized the concept of an "AI Search API" by packaging web search results with pre-parsed markdown content and LLM-generated summaries. However, at <strong>$0.008 per query</strong>, agentic workflows with iterative search loops quickly run up huge enterprise bills.</p>

      <h2>How Jiro Delivers 0-Key Extractive Answers</h2>
      <p>Jiro takes a fundamentally different engineering approach: rather than calling expensive hosted LLMs for every query, Jiro includes a high-speed <strong>extractive NLP pipeline</strong> that executes in ~8ms directly on CPU:</p>

      <ul>
        <li><strong>Relevance Scoring (BM25 + Position):</strong> Scores sentences across top-ranking SERP passages.</li>
        <li><strong>Dense Semantic Reranking:</strong> Quantized cross-encoder embeddings rescore candidates locally.</li>
        <li><strong>Deduplication & Synthesis:</strong> Assembles the most informative sentence clusters into a cohesive answer with source citations.</li>
      </ul>

      <pre><code># Query Jiro's AI Search via cURL
curl -X POST http://localhost:8000/v1/search \\
  -H "Content-Type: application/json" \\
  -d '{
    "q": "What is Reciprocal Rank Fusion?",
    "engine": "duckduckgo",
    "answer": true,
    "max_results": 5
  }'</code></pre>

      <h2>Feature Benchmark: Tavily vs Jiro</h2>
      <div class="table-responsive">
        <table style="width:100%; border-collapse:collapse; margin:24px 0;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255, 102, 0, 0.4); text-align: left;">
              <th style="padding: 12px 16px; color: var(--gold-light);">Feature</th>
              <th style="padding: 12px 16px; color: var(--gold-light);">Tavily API</th>
              <th style="padding: 12px 16px; color: var(--gold-base);">Jiro Search</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Cost per 10,000 Searches</td>
              <td style="padding: 12px 16px; color: #f87171;">$80.00</td>
              <td style="padding: 12px 16px; color: #4ade80;">$0.00 (Self-Hosted)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Extractive Answer Latency</td>
              <td style="padding: 12px 16px;">1,200ms – 2,500ms</td>
              <td style="padding: 12px 16px; color: #4ade80;">180ms – 350ms total</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Social Media Ingestion</td>
              <td style="padding: 12px 16px; color: #f87171;">Limited</td>
              <td style="padding: 12px 16px; color: #4ade80;">12 Platforms Native</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 3. MCP SERVER GUIDE
  {
    slug: 'mcp-server-guide',
    title: 'How to Give Claude Desktop Web Search with an MCP Server',
    metaDesc: 'Step-by-step guide to configuring Claude Desktop with Jiro MCP server for free, local web search across 9 engines. No API keys, no subscriptions.',
    category: 'MCP & Agents',
    readTime: '5 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Complete tutorial on setting up Claude Desktop with Jiro via the Model Context Protocol (MCP). Enable multi-engine search and content extraction with zero API keys.',
    content: `
      <h2>The Model Context Protocol (MCP) Standard</h2>
      <p>Anthropic's Model Context Protocol (MCP) has emerged as the open standard for connecting LLMs to external data and execution tools. With Jiro's built-in MCP server, you can give Claude Desktop instant web browsing capabilities across 9 engines.</p>

      <h2>Step 1: Install Jiro</h2>
      <pre><code>pip install jiro
# Verify installation
jiro --version</code></pre>

      <h2>Step 2: Configure Claude Desktop</h2>
      <p>Open your Claude Desktop configuration file located at:</p>
      <ul>
        <li><strong>macOS:</strong> <code>~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
        <li><strong>Windows:</strong> <code>%APPDATA%\\Claude\\claude_desktop_config.json</code></li>
      </ul>

      <pre><code>{
  "mcpServers": {
    "jiro-search": {
      "command": "jiro",
      "args": ["mcp", "--transport", "stdio"]
    }
  }
}</code></pre>

      <h2>Step 3: Test Search in Claude</h2>
      <p>Restart Claude Desktop. You will see the hammer icon in the prompt bar indicating Jiro's 17 tools are active. Ask Claude:</p>
      <blockquote><em>"Search the web for the latest PyTorch 2.5 release notes and summarize the core performance improvements."</em></blockquote>
    `
  },

  // 4. SOCIAL MEDIA SCRAPING
  {
    slug: 'social-media-scraping',
    title: 'Scraping 12 Social Platforms with One Python API (No API Keys)',
    metaDesc: 'Extract posts, comments, transcripts, and engagement from Reddit, YouTube, Bluesky, TikTok, and 8 more platforms using Jiro with zero API keys.',
    category: 'Scraping',
    readTime: '9 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Unified scraping for Reddit, YouTube, Bluesky, TikTok, GitHub, and Twitter. Learn how Jiro normalizes diverse social feeds into a single schema.',
    content: `
      <h2>The Fragmentation of Social Media APIs</h2>
      <p>Between Reddit's paid API tier, Twitter/X's $100–$5,000/month developer subscriptions, and YouTube's strict quota units, acquiring social signals has become cost-prohibitive. Jiro unifies 12 social platforms under a single Python interface with zero API keys.</p>

      <h2>Supported Social Platforms</h2>
      <ul>
        <li><strong>Reddit:</strong> Subreddit feeds, post comments, user profiles via public JSON endpoints.</li>
        <li><strong>YouTube:</strong> Video metadata, chapter markers, and full timestamped subtitles/transcripts.</li>
        <li><strong>Bluesky / AT Protocol:</strong> Decentralized public feed parsing.</li>
        <li><strong>TikTok & Instagram:</strong> Clean video descriptions, author metadata, and view metrics.</li>
        <li><strong>GitHub & Hacker News:</strong> Trending repositories, commits, discussions, and story threads.</li>
      </ul>

      <h2>Code Example: Extracting Reddit Discussions & YouTube Transcripts</h2>
      <pre><code>from jiro.social import SocialScraper

scraper = SocialScraper()

# Scrape Reddit Subreddit
reddit_posts = scraper.scrape_reddit(
    subreddit="MachineLearning",
    sort="top",
    time_filter="week",
    limit=10
)

for post in reddit_posts:
    print(f"[{post.score} upvotes] {post.title}")

# Fetch YouTube Transcript without API Key
transcript = scraper.get_youtube_transcript("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
print(transcript.full_text[:300])</code></pre>
    `
  },

  // 5. HYBRID SEARCH EXPLAINED
  {
    slug: 'hybrid-search-explained',
    title: 'Hybrid Search Explained: Keyword + Semantic + SERP in One API',
    metaDesc: 'Learn how hybrid search combines BM25 keyword matching, vector embeddings, and live SERP results with Reciprocal Rank Fusion for 98.4% precision.',
    category: 'Architecture',
    readTime: '8 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Explore the math and architecture behind hybrid search: Combining BM25 lexical precision with dense vector semantics and Reciprocal Rank Fusion (RRF).',
    content: `
      <h2>Why Neither Pure Keyword Nor Pure Vector Search Is Enough</h2>
      <p>Pure lexical search (BM25) excels at exact keyword matches (e.g., error codes, part numbers) but fails when queries express conceptual intent with different synonyms. Conversely, pure vector search often suffers from hallucinated nearest-neighbors on specific technical identifiers.</p>

      <h2>The Jiro Hybrid Search Architecture</h2>
      <p>Jiro combines three retrieval streams into a single weighted score:</p>
      <ol>
        <li><strong>Live Multi-Engine SERP:</strong> Fetches live web candidates from Google, Bing, and DuckDuckGo.</li>
        <li><strong>BM25 Lexical Scorer:</strong> Evaluates exact phrase matches, term frequencies, and document lengths.</li>
        <li><strong>Dense CPU Embedding Cosine Similarity:</strong> Uses lightweight ONNX models to measure semantic relevance.</li>
        <li><strong>Reciprocal Rank Fusion (RRF):</strong> Fuses the candidate lists using the formula: <code>RRF(d) = Σ 1 / (k + rank(d))</code> with <code>k = 60</code>.</li>
      </ol>
    `
  },

  // 6. OPEN SOURCE SEARCH API
  {
    slug: 'open-source-search-api',
    title: 'Why We Built an Open Source Search API (And Why MIT Matters)',
    metaDesc: 'The search API market is dominated by closed, expensive SaaS. Here is why we built Jiro under the MIT license and how it changes search for developers.',
    category: 'Open Source',
    readTime: '6 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'The philosophy behind building Jiro as a free, open-source MIT search platform and the imperative for open-access search infrastructure in the AI era.',
    content: `
      <h2>The Monopoly on Search Infrastructure</h2>
      <p>As autonomous AI agents shift from generating static text to taking real-world actions, real-time web retrieval has become critical infrastructure. Yet almost every search API is closed-source, heavily metered, and locked behind restrictive vendor agreements.</p>

      <h2>Our Core Commitments</h2>
      <ul>
        <li><strong>100% MIT Licensed:</strong> No AGPL restrictions, no commercial usage bans, no bait-and-switch pricing models.</li>
        <li><strong>Local-First Defaults:</strong> Runs cleanly on laptops, Raspberry Pis, or enterprise clusters.</li>
        <li><strong>Community Governance:</strong> Open pull requests for new search engine adapters and scrapers.</li>
      </ul>
    `
  },

  // 7. AI SEARCH WITHOUT API KEYS
  {
    slug: 'ai-search-without-api-keys',
    title: 'AI Search Without API Keys: How Extractive Synthesis Works',
    metaDesc: 'How Jiro generates instant answers from search results in 8ms using CPU-friendly extractive NLP without calling OpenAI, Anthropic, or any paid LLM.',
    category: 'AI Search',
    readTime: '7 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Discover how Jiro extracts high-confidence direct answers in 8ms on CPU using heuristic parsing and cross-sentence scoring without paid LLM tokens.',
    content: `
      <h2>The Cost of LLM-Based Search Summaries</h2>
      <p>Calling GPT-4o or Claude 3.5 Sonnet to summarize search results costs ~$0.005–$0.02 per query and adds 1,500ms of latency. For 90% of factual informational queries ("What is the capital of Peru?", "Python 3.12 release date"), generative models are overkill.</p>

      <h2>Jiro's 8ms Extractive Pipeline</h2>
      <p>Jiro extracts answers using an optimized three-phase heuristic pipeline:</p>
      <ul>
        <li><strong>Sentence Boundary Disambiguation:</strong> Breaks top snippets into discrete factual statements.</li>
        <li><strong>Query-Salience Scoring:</strong> Evaluates noun-phrase overlap, temporal anchors, and factual density.</li>
        <li><strong>Maximum Marginal Relevance (MMR):</strong> Eliminates redundant sentences while preserving coverage.</li>
      </ul>
    `
  },

  // 8. PYTHON WEB SCRAPING 2026
  {
    slug: 'python-web-scraping-2026',
    title: 'Python Web Scraping in 2026: The Complete Developer Guide',
    metaDesc: 'From requests and BeautifulSoup to anti-bot evasion and headless browsers. Everything you need to know about modern web scraping in Python.',
    category: 'Tutorials',
    readTime: '12 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Comprehensive guide to web scraping in 2026. Master HTTP/2 client fingerprints, AST-based self-healing DOM parsing, and proxy rotation.',
    content: `
      <h2>The Modern Web Scraping Landscape</h2>
      <p>Web scraping has evolved dramatically. Modern anti-bot systems analyze TLS client hello handshakes, HTTP/2 header orderings, and JavaScript execution heuristics. Traditional scraping with naive <code>requests</code> headers fails against Cloudflare and Akamai.</p>

      <h2>Modern Best Practices</h2>
      <ol>
        <li><strong>HTTP/2 & TLS Fingerprinting:</strong> Use <code>curl_cffi</code> or Jiro's built-in HTTP client to mimic real Chrome/Firefox browser handshakes.</li>
        <li><strong>Self-Healing DOM Selectors:</strong> Fall back to text-density heuristics and semantic HTML tags when CSS classes change.</li>
        <li><strong>Polite Crawl Delays:</strong> Respect <code>robots.txt</code> and implement token-bucket rate limiters.</li>
      </ol>
    `
  },

  // 9. DOCKER SEARCH API
  {
    slug: 'docker-search-api',
    title: 'Deploying a Search API with Docker and Kubernetes',
    metaDesc: 'Deploy Jiro as a self-hosted search API in production with Docker, Docker Compose, and Kubernetes Helm charts. Scale to millions of queries/day.',
    category: 'DevOps',
    readTime: '8 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Step-by-step production deployment guide for Jiro with Docker Compose, Helm charts, health probes, and horizontal pod autoscaling.',
    content: `
      <h2>Containerizing Jiro for Production</h2>
      <p>Jiro is packaged as a lightweight (under 120MB) multi-arch Docker image containing all engine adapters, SQLite persistence, and the FastAPI server.</p>

      <h2>Docker Compose Example</h2>
      <pre><code>version: "3.8"

services:
  jiro:
    image: ghcr.io/blackvault/jiro:latest
    ports:
      - "8000:8000"
    environment:
      - JIRO_DEFAULT_ENGINE=duckduckgo
      - JIRO_RATE_LIMIT=120
      - JIRO_CACHE_TTL=3600
    restart: unless-stopped</code></pre>
    `
  },

  // 10. INTENT CLASSIFICATION
  {
    slug: 'intent-classification',
    title: 'How Intent Classification Makes Search Smarter (16 Types, 0ms Latency)',
    metaDesc: 'How Jiro classifies search intent into 16 categories using zero-dependency heuristic pattern matching and routes queries to the optimal engine.',
    category: 'AI Search',
    readTime: '6 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Deep dive into Jiro\'s 16-class heuristic intent classification system: Routing queries dynamically to code repositories, news, or academic engines.',
    content: `
      <h2>Why Query Routing Matters</h2>
      <p>A query like <code>"pip install torch CUDA error"</code> requires StackOverflow and GitHub results, whereas <code>"US inflation rate August 2026"</code> needs real-time news sources. Routing all queries to a generic web engine degrades result quality.</p>

      <h2>The 16 Intent Categories</h2>
      <p>Jiro classifies queries into 16 distinct categories including: <em>Technical/Code, Academic, News, Commercial, Social Discussion, Navigational, Definition, and Multimedia</em> with sub-millisecond heuristic execution.</p>
    `
  },

  // 11. STRUCTURED DATA EXTRACTION
  {
    slug: 'structured-data-extraction',
    title: 'Structured Data Extraction from Search Results with JSON Schema',
    metaDesc: 'Extract typed, validated data from search results using JSON Schema. Turn unstructured web pages into clean data pipelines with Jiro.',
    category: 'Data Engineering',
    readTime: '8 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'How to extract schema-validated structured objects directly from web search results using Pydantic and JSON Schema validation.',
    content: `
      <h2>Transforming Web Noise into Structured Data</h2>
      <p>AI agents often fail because raw HTML contains ads, navigation links, and boilerplate. Jiro's structured extraction module converts search results directly into validated Pydantic models.</p>

      <pre><code>from pydantic import BaseModel
from jiro import JiroClient

class CompanyProfile(BaseModel):
    name: str
    founded_year: int
    headquarters: str
    ceo: str

client = JiroClient()
profile = client.extract_structured(
    query="Anthropic company overview headquarters CEO",
    schema=CompanyProfile
)
print(profile)</code></pre>
    `
  },

  // 12. WEB SCRAPING COMPLIANCE
  {
    slug: 'web-scraping-compliance',
    title: 'Web Scraping Compliance in 2026: robots.txt, ToS, and SSRF',
    metaDesc: 'The legal and ethical landscape of web scraping: hiQ v. LinkedIn, EU copyright directive, robots.txt compliance, SSRF protection, and best practices.',
    category: 'Security',
    readTime: '8 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Legal and technical guidelines for compliant web scraping in 2026: Legal precedent, SSRF mitigation, and robots.txt enforcement.',
    content: `
      <h2>The Legal Landscape in 2026</h2>
      <p>From the landmark <em>hiQ Labs v. LinkedIn</em> ruling to modern EU digital market regulations, extracting publicly available data remains legal when performed responsibly without authentication bypass or server degradation.</p>

      <h2>Built-in Compliance & Security in Jiro</h2>
      <ul>
        <li><strong>Automatic robots.txt Parsing:</strong> Jiro respects <code>crawl-delay</code> and disallow directives asynchronously.</li>
        <li><strong>Enterprise SSRF Protection:</strong> Internal IP addresses (e.g. <code>127.0.0.1</code>, <code>169.254.169.254</code> AWS metadata) are strictly blocked.</li>
      </ul>
    `
  },

  // 13. GEMINI CLI AGENT SEARCH
  {
    slug: 'gemini-cli-agent-search',
    title: 'Powering Gemini & Claude CLI Agents with Local Search MCP',
    metaDesc: 'Connect Google Gemini CLI, Claude Desktop, and autonomous terminal agents to 9 search engines via local Model Context Protocol (MCP) without commercial API keys.',
    category: 'MCP & Agents',
    readTime: '9 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Step-by-step tutorial on integrating Gemini and Claude terminal agents with Jiro MCP server for zero-token local SERP synthesis and autonomous web research.',
    content: `
      <h2>Bridging LLM Terminal Agents with Local Web Search</h2>
      <p>Autonomous CLI agents such as the Gemini CLI, Claude Desktop, and Cursor require real-time grounding on live web data to perform software engineering research, fact-checking, and market intelligence. Traditional approaches rely on proprietary SaaS search APIs like Tavily or SerpAPI, which quickly become prohibitive at agentic query loops of 50–200 web requests per workflow.</p>
      
      <p>By exposing <strong>Jiro</strong> through the open <strong>Model Context Protocol (MCP)</strong>, developers can equip CLI agents with local-first web search across 9 engines (Google, DuckDuckGo, Bing, Brave, Yahoo, Mojeek, Searx, Startpage, Qwant) with zero API keys and 8ms local synthesis.</p>

      <h3>Gemini CLI Tool Integration Pattern</h3>
      <p>In Python-based Gemini agent loops using the official <code>google-genai</code> SDK, you can register Jiro's local REST endpoint as a dynamic Function Declaration:</p>

      <pre><code>import httpx
from google import genai
from google.genai import types

client = genai.Client()

def jiro_web_search(query: str, max_results: int = 5) -> dict:
    """Performs a local-first multi-engine web search with Jiro."""
    with httpx.Client(base_url="http://localhost:8000") as http:
        resp = http.post("/v1/search", json={
            "q": query,
            "engine": "google",
            "max_results": max_results,
            "answer": True
        })
        return resp.json()

# Bind function to Gemini Flash 2.5
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="What are the breaking changes in Python 3.14?",
    config=types.GenerateContentConfig(
        tools=[jiro_web_search]
    )
)
print(response.text)</code></pre>
    `
  },

  // 14. SELF HOSTED DUCKDUCKGO SCRAPER
  {
    slug: 'self-hosted-duckduckgo-scraper',
    title: 'Building a Resilient Self-Hosted DuckDuckGo & Google Scraper',
    metaDesc: 'Learn how Jiro implements automated circuit-breaker fallbacks between DuckDuckGo and Google with TLS fingerprint spoofing and zero IP bans.',
    category: 'Scraping',
    readTime: '10 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Architectural breakdown of Jiro’s resilient multi-engine scraping subsystem with automated circuit breakers, HTTP/2 multiplexing, and zero-ban failover.',
    content: `
      <h2>The Fragility of Single-Engine Web Scrapers</h2>
      <p>Building a search scraping system that relies solely on one search provider inevitably fails in production. Search engines periodically deploy anti-automation challenges, rate limits, or HTML markup updates. When Google challenges an IP address with a reCAPTCHA, an autonomous agent pipeline halts completely if it cannot fall back gracefully.</p>

      <h3>The Jiro Circuit-Breaker Architecture</h3>
      <p>Jiro solves scraper fragility through a tiered <strong>Multi-Engine Circuit Breaker</strong>. If a request to Google times out or returns an HTTP 429/403 status code, Jiro trips the circuit for that backend for a 60-second cooldown and automatically falls back to DuckDuckGo, Brave, or Bing within 15 milliseconds.</p>

      <pre><code>from jiro.scraping import EngineRegistry, CircuitBreakerClient

registry = EngineRegistry(
    primary="google",
    fallbacks=["duckduckgo", "brave", "bing"],
    timeout_ms=1200,
    circuit_breaker_threshold=3
)

# Executes primary engine with transparent background fallback
response = registry.search_with_resilience("distributed consensus algorithms")
print(f"Results fetched via: {response.engine_used} (Status: {response.status})")</code></pre>
    `
  },

  // 15. CROSS ENCODER RERANKING
  {
    slug: 'cross-encoder-reranking',
    title: 'Cross-Encoder vs Bi-Encoder Reranking for Local Search Engines',
    metaDesc: 'Compare Cross-Encoder and Bi-Encoder architectures for local search relevance. Learn how Jiro scores top SERP passages in under 12ms on standard CPUs.',
    category: 'Architecture',
    readTime: '11 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Detailed benchmark of Cross-Encoder vs Bi-Encoder architectures for local search relevance scoring on commodity CPUs with ONNX quantization.',
    content: `
      <h2>Why First-Stage SERP Relevance Needs Local Reranking</h2>
      <p>Raw search results from commercial engines are optimized for human browsing with ads, SEO-optimized snippet spam, and navigational intent. For AI agents requiring factual precision, raw snippet relevance is often suboptimal. Reranking candidates with deep neural models dramatically improves Top-1 and Top-3 accuracy.</p>

      <h3>Bi-Encoder vs. Cross-Encoder: The Trade-off</h3>
      <p><strong>Bi-Encoders</strong> compute embeddings for the query and document independently, scoring relevance via cosine similarity. While fast, they miss intricate cross-attention interactions between specific query qualifiers and document context.</p>

      <p><strong>Cross-Encoders</strong> pass both the query and candidate passage simultaneously into full self-attention layers. This produces state-of-the-art relevance scoring, but at the cost of higher computational requirements. Jiro achieves sub-12ms Cross-Encoder scoring on standard CPUs by utilizing <strong>INT8-quantized ONNX models (ms-marco-MiniLM-L-6-v2)</strong>.</p>
    `
  },

  // 16. REDDIT API ALTERNATIVES
  {
    slug: 'reddit-api-alternatives',
    title: '5 Free Reddit API Alternatives for AI Training & Sentiment Analysis',
    metaDesc: 'Explore 5 free and reliable methods to scrape Reddit posts, comments, and community discussions in 2026 without paying for Reddit enterprise API tiers.',
    category: 'Scraping',
    readTime: '8 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Compare 5 proven methods to extract Reddit data for NLP datasets, brand monitoring, and sentiment analysis without expensive API contracts.',
    content: `
      <h2>Reddit Data Access After the API Paywall</h2>
      <p>When Reddit introduced enterprise pricing tiers in 2023, thousands of research projects, sentiment analysis tools, and open-source models lost access to community discussion datasets. However, several high-throughput, legal public endpoints and scraping techniques remain accessible for developers.</p>

      <h3>The 5 Free Methods Compared</h3>
      <ol>
        <li><strong>Public JSON Endpoints (.json appending):</strong> Appending <code>.json</code> to standard Reddit URLs yields raw JSON payloads without OAuth headers.</li>
        <li><strong>Jiro Unified Social Scraper:</strong> Emulates mobile client headers with built-in token-bucket rate smoothing and automatic comment flattening.</li>
        <li><strong>Pushshift / Arctic Shift Archives:</strong> Historic dump archives for retrospective training.</li>
        <li><strong>RSS / Atom Subreddit Feeds:</strong> Lightweight XML streams for real-time post tracking.</li>
        <li><strong>Search Engine SERP Filtering (site:reddit.com):</strong> Leveraging Jiro's Google/Bing adapters to index filtered discussions.</li>
      </ol>
    `
  },

  // 17. KUBERNETES SCRAPING CLUSTER
  {
    slug: 'kubernetes-scraping-cluster',
    title: 'Scaling a Production Web Scraping Cluster with Kubernetes & Helm',
    metaDesc: 'Architecting an enterprise web scraping cluster with Kubernetes, Helm charts, distributed Redis caching, and horizontal pod autoscaling for 500+ QPS.',
    category: 'DevOps',
    readTime: '13 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Complete DevOps architecture for deploying high-throughput Jiro search clusters on Kubernetes with Helm, Redis caching, and autoscaling.',
    content: `
      <h2>Scaling Search Extraction to 500+ Queries Per Second</h2>
      <p>While a single Jiro instance comfortably handles 30–50 requests per second on a 4-core machine, enterprise agent platforms ingesting thousands of documents per minute require horizontal scaling across distributed nodes.</p>

      <h3>Kubernetes Cluster Topology</h3>
      <p>A production Jiro deployment on Kubernetes comprises:</p>
      <ul>
        <li><strong>Ingress Controller:</strong> NGINX or Envoy routing incoming <code>/v1/search</code> and <code>/v1/social</code> requests.</li>
        <li><strong>Stateless Jiro Pods:</strong> Replicated FastAPI workers scaling horizontally via Horizontal Pod Autoscaler (HPA) based on CPU and request latency.</li>
        <li><strong>Redis Cluster:</strong> Shared distributed cache for SERP responses with configurable TTLs (e.g., 3600s) to reduce redundant upstream queries.</li>
        <li><strong>Egress Proxy Pool:</strong> Rotating IP proxies configured via standard <code>HTTP_PROXY</code> / <code>HTTPS_PROXY</code> environment variables.</li>
      </ul>
    `
  },

  // 18. RECIPROCAL RANK FUSION DEEP DIVE
  {
    slug: 'reciprocal-rank-fusion-deep-dive',
    title: 'Deep Dive: Reciprocal Rank Fusion (RRF) for Multi-Engine Search',
    metaDesc: 'An in-depth mathematical and algorithmic breakdown of Reciprocal Rank Fusion (RRF) and why it outperforms weighted score averaging in hybrid search.',
    category: 'Architecture',
    readTime: '10 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Explore the mathematics of Reciprocal Rank Fusion (RRF) and understand how rank-based aggregation eliminates score calibration issues in hybrid search.',
    content: `
      <h2>The Problem with Score Normalization</h2>
      <p>When merging search results from disparate sources (e.g., Google BM25 snippet scores, DuckDuckGo rankings, and dense vector cosine similarities), direct numerical score blending fails because each engine operates on entirely different probability distributions and scales.</p>

      <h3>The Reciprocal Rank Fusion (RRF) Formulation</h3>
      <p>Reciprocal Rank Fusion sidesteps score calibration entirely by focusing purely on <strong>ordinal rank positions</strong>:</p>

      <pre><code>def reciprocal_rank_fusion(ranked_lists: list[list[dict]], k: int = 60) -> list[dict]:
    scores = {}
    for r_list in ranked_lists:
        for rank, item in enumerate(r_list):
            doc_id = item["url"]
            if doc_id not in scores:
                scores[doc_id] = {"item": item, "score": 0.0}
            scores[doc_id]["score"] += 1.0 / (k + (rank + 1))
            
    # Sort descending by fused RRF score
    fused = sorted(scores.values(), key=lambda x: x["score"], reverse=True)
    return [entry["item"] for entry in fused]</code></pre>
    `
  },

  // 19. ANTI BOT FINGERPRINT EVASION
  {
    slug: 'anti-bot-fingerprint-evasion',
    title: 'TLS & HTTP/2 Fingerprint Evasion in Modern Python Scraping',
    metaDesc: 'How modern anti-bot systems detect Python requests via JA3/JA4 TLS fingerprints and HTTP/2 pseudo-header order, and how Jiro stays undetected.',
    category: 'Security',
    readTime: '12 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'A technical exploration of JA3/JA4 TLS fingerprints, cipher suite permutations, HTTP/2 SETTINGS frames, and browser emulation in Python.',
    content: `
      <h2>Beyond User-Agent Strings: Modern Anti-Bot Detection</h2>
      <p>Changing your <code>User-Agent</code> header is no longer sufficient to scrape modern protected websites. Advanced Web Application Firewalls (Cloudflare Turnstile, Akamai Bot Manager, CloudFront) inspect low-level network artifacts before evaluating application headers.</p>

      <h3>Key Fingerprinting Vectors</h3>
      <ul>
        <li><strong>JA3 / JA4 TLS Fingerprints:</strong> The exact sequence of supported SSL ciphers, TLS extensions, elliptic curves, and point formats sent in the initial <code>Client Hello</code>.</li>
        <li><strong>HTTP/2 Pseudo-Header Ordering:</strong> Real Chrome browsers send <code>:method</code>, <code>:authority</code>, <code>:scheme</code>, <code>:path</code> in a rigid sequence. Standard Python <code>httpx</code> or <code>requests</code> libraries send them differently.</li>
        <li><strong>TCP Window Size & TCP Options:</strong> OS-level network stack characteristics.</li>
      </ul>
    `
  },

  // 20. LOCAL DEEP RESEARCH AGENT
  {
    slug: 'local-deep-research-agent',
    title: 'Building an Autonomous Deep Research Agent on Local Hardware',
    metaDesc: 'Build a multi-hop deep research agent with LangGraph, local Ollama models (Llama 3.3), and Jiro search with zero external API calls.',
    category: 'MCP & Agents',
    readTime: '14 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Step-by-step blueprint for building an autonomous deep research agent combining LangGraph, Ollama, and Jiro for recursive web investigations.',
    content: `
      <h2>The Promise of Autonomous Deep Research</h2>
      <p>Deep research agents autonomously decompose a complex topic into sub-hypotheses, execute multi-hop web searches across dozens of sources, cross-verify claims, and synthesize exhaustive whitepapers. Building this with commercial APIs costs $5–$20 per research run. By pairing <strong>Ollama (Llama 3.3 70B / Qwen 2.5 32B)</strong> with <strong>Jiro</strong>, developers can run unlimited deep research on local workstations.</p>

      <h3>Research Agent Graph Architecture</h3>
      <ol>
        <li><strong>Query Decomposition:</strong> Breaks user prompts into 3–5 search queries.</li>
        <li><strong>Parallel Jiro SERP Execution:</strong> Runs searches across Google, Brave, and DuckDuckGo with extractive answer synthesis.</li>
        <li><strong>Evaluation & Gap Analysis:</strong> Checks if sufficient technical evidence exists; if not, triggers recursive follow-up searches.</li>
        <li><strong>Final Synthesis:</strong> Formats citations, benchmark tables, and executive summaries.</li>
      </ol>
    `
  },

  // 21. TIKTOK INSTAGRAM SCRAPER API
  {
    slug: 'tiktok-instagram-scraper-api',
    title: 'Zero-Key Scraping for Instagram, TikTok, and YouTube Transcripts',
    metaDesc: 'Extract structured data from short-form video platforms and social networks without developer accounts or API keys using Jiro.',
    category: 'Scraping',
    readTime: '9 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Extract structured data, video transcripts, engagement metrics, and descriptions from TikTok, Instagram, and YouTube with zero API keys.',
    content: `
      <h2>The Challenge of Short-Form Video Scraping</h2>
      <p>Video-first platforms like TikTok, Instagram Reels, and YouTube Shorts store critical consumer sentiment and product reviews. However, official developer APIs are tightly restricted to authorized marketing partners.</p>

      <h3>Jiro's Video Extraction Engine</h3>
      <p>Jiro intercepts public hydration payloads and subtitles streams directly:</p>
      <ul>
        <li><strong>YouTube:</strong> Extracts full closed-captions and multi-language auto-generated transcripts with sub-second response times.</li>
        <li><strong>TikTok:</strong> Extracts author handles, sound tags, hashtag metrics, and video description text.</li>
        <li><strong>Instagram:</strong> Parses public profile headers, post captions, and reel metadata.</li>
      </ul>
    `
  },

  // 22. SEARXNG VS JIRO
  {
    slug: 'searxng-vs-jiro',
    title: 'SearXNG vs. Jiro: Which Self-Hosted Search Engine Fits Your AI Stack?',
    metaDesc: 'A comprehensive technical comparison between SearXNG and Jiro: Architecture, memory footprint, MCP agent tooling, and extractive AI features.',
    category: 'Comparisons',
    readTime: '9 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Compare SearXNG and Jiro on architecture, memory footprint, agent compatibility (MCP), response latency, and extractive AI synthesis.',
    content: `
      <h2>Two Philosophies for Open Source Search</h2>
      <p>SearXNG is a venerable metasearch engine designed primarily as a privacy-respecting browser frontend for humans. Jiro was built from scratch specifically as a lightweight, high-speed search intelligence engine for AI agents and programmatic pipelines.</p>

      <h3>Core Differences</h3>
      <div class="table-responsive">
        <table style="width:100%; border-collapse:collapse; margin:24px 0;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255, 102, 0, 0.4); text-align: left;">
              <th style="padding: 12px 16px; color: var(--gold-light);">Dimension</th>
              <th style="padding: 12px 16px; color: var(--gold-light);">SearXNG</th>
              <th style="padding: 12px 16px; color: var(--gold-base);">Jiro Search</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Primary Target User</td>
              <td style="padding: 12px 16px;">Human web browser users</td>
              <td style="padding: 12px 16px; color: #4ade80;">Autonomous AI agents &amp; Python developers</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Model Context Protocol (MCP)</td>
              <td style="padding: 12px 16px; color: #f87171;">External community bridge required</td>
              <td style="padding: 12px 16px; color: #4ade80;">Built-in 17-tool native MCP server</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 12px 16px; font-weight:600;">Extractive Answer Engine</td>
              <td style="padding: 12px 16px; color: #f87171;">None (raw snippet links only)</td>
              <td style="padding: 12px 16px; color: #4ade80;">8ms 0-Key AI Answer Synthesis</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight:600;">Memory Footprint</td>
              <td style="padding: 12px 16px;">~350MB – 600MB RAM</td>
              <td style="padding: 12px 16px; color: #4ade80;">~65MB – 110MB RAM</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 23. ENTERPRISE SEARCH PROXY
  {
    slug: 'enterprise-search-proxy',
    title: 'Building an Enterprise Search Proxy with Redis Caching and RBAC',
    metaDesc: 'How to deploy Jiro as a central enterprise search proxy with token-bucket rate limits, team API keys, and multi-tier Redis caching.',
    category: 'DevOps',
    readTime: '11 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Deploy Jiro as a centralized organizational search proxy with role-based access control (RBAC), Redis caching, and usage analytics.',
    content: `
      <h2>Centralizing Web Search for Enterprise Engineering Teams</h2>
      <p>In large engineering organizations, dozens of internal teams, autonomous agent bots, and analytics scripts independently query commercial search APIs, causing runaway SaaS expenditures and redundant queries.</p>

      <h3>Architecture of a Jiro Enterprise Proxy</h3>
      <ul>
        <li><strong>API Key Management:</strong> Provision team-specific API keys with configurable monthly query quotas and rate limits.</li>
        <li><strong>Multi-Tier Redis Caching:</strong> Common technical queries (e.g., API documentation lookups) are served instantly from cache in &lt;2ms.</li>
        <li><strong>Compliance & Audit Logging:</strong> Tracks query metadata while filtering out PII to ensure internal data security.</li>
      </ul>
    `
  },

  // 24. ASYNC PYTHON SEARCH SDK
  {
    slug: 'async-python-search-sdk',
    title: 'High-Throughput Web Scraping with Async Python and HTTPX',
    metaDesc: 'Master asynchronous multi-engine search scraping with Python, asyncio, and HTTPX connection pooling for 200+ requests per second.',
    category: 'Tutorials',
    readTime: '9 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Learn how to write asynchronous Python scrapers using asyncio, HTTPX connection pooling, and semaphore concurrency limits.',
    content: `
      <h2>Why Asynchronous I/O Is Essential for Search Ingestion</h2>
      <p>Web search queries are fundamentally I/O bound. A synchronous script querying 500 search terms sequentially with a 500ms network round-trip takes over 4 minutes. With <code>asyncio</code> and HTTP/2 multiplexing, the same batch finishes in under 6 seconds.</p>

      <h3>High-Concurrency Python Example</h3>
      <pre><code>import asyncio
import httpx

async def fetch_search(client: httpx.AsyncClient, query: str, sem: asyncio.Semaphore):
    async with sem:
        response = await client.post("/v1/search", json={"q": query, "engine": "duckduckgo"})
        return response.json()

async def main():
    queries = [f"distributed systems topic {i}" for i in range(100)]
    sem = asyncio.Semaphore(20) # 20 concurrent connections
    
    async with httpx.AsyncClient(base_url="http://localhost:8000", timeout=10.0) as client:
        tasks = [fetch_search(client, q, sem) for q in queries]
        results = await asyncio.gather(*tasks)
        print(f"Successfully fetched {len(results)} search batches asynchronously!")

asyncio.run(main())</code></pre>
    `
  }
];

export function generateAll24BlogPosts() {
  const blogsBaseDir = path.join(process.cwd(), 'public/blog');
  ensureDir(blogsBaseDir);

  ALL_BLOGS_DATA.forEach((b, index) => {
    const postDir = path.join(blogsBaseDir, b.slug);
    ensureDir(postDir);

    // Pick 3 related posts
    const relatedPosts = ALL_BLOGS_DATA
      .filter(p => p.slug !== b.slug)
      .slice(index % 5, (index % 5) + 3);

    const fullHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${b.title} | Jiro Engineering</title>
  <meta name="description" content="${b.metaDesc}">
  <meta name="author" content="${b.author}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${BASE_URL}/blog/${b.slug}/">
  <link rel="alternate" type="application/rss+xml" title="Jiro Search Blog RSS" href="${BASE_URL}/blog/feed.xml">

  <!-- OPEN GRAPH & TWITTER -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Jiro Search Intelligence">
  <meta property="og:title" content="${b.title}">
  <meta property="og:description" content="${b.metaDesc}">
  <meta property="og:url" content="${BASE_URL}/blog/${b.slug}/">
  <meta property="og:image" content="${BASE_URL}/og-image.png">
  <meta name="twitter:card" content="summary_large_image">

  <!-- FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- STRUCTURED DATA: BlogPosting & BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${b.title.replace(/"/g, '\\"')}",
    "description": "${b.metaDesc.replace(/"/g, '\\"')}",
    "datePublished": "${b.date}T08:00:00Z",
    "dateModified": "${b.date}T12:00:00Z",
    "author": {
      "@type": "Person",
      "name": "${b.author}",
      "jobTitle": "Lead Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Blackvault Technology"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blackvault Technology",
      "url": "${BASE_URL}"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${BASE_URL}/blog/${b.slug}/"
    }
  }
  </script>

  <style>
    ${SHARED_CSS}

    .article-wrap {
      max-width: 860px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 24px;
    }
    .breadcrumbs a { color: rgba(255, 255, 255, 0.6); }

    .article-header {
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 40px;
    }
    .article-tag {
      display: inline-block;
      font-family: var(--font-code);
      font-size: 11px;
      color: var(--gold-light);
      background: rgba(255, 102, 0, 0.1);
      border: 1px solid rgba(255, 102, 0, 0.25);
      padding: 4px 12px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
    }
    .article-title {
      font-family: var(--font-display);
      font-size: clamp(32px, 5vw, 44px);
      line-height: 1.15;
      font-style: italic;
      color: #fff;
      margin-bottom: 18px;
    }
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
    }
    .article-meta span { display: flex; align-items: center; gap: 6px; }

    .article-body {
      font-size: 16px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.85);
    }
    .article-body h2 {
      font-family: var(--font-display);
      font-size: 28px;
      font-style: italic;
      color: #fff;
      margin: 48px 0 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 8px;
    }
    .article-body h3 {
      font-size: 20px;
      color: var(--gold-light);
      margin: 32px 0 14px;
      font-weight: 600;
    }
    .article-body p { margin-bottom: 22px; }
    .article-body ul, .article-body ol { margin-bottom: 24px; padding-left: 24px; }
    .article-body li { margin-bottom: 8px; color: rgba(255, 255, 255, 0.8); }
    .article-body blockquote {
      border-left: 3px solid var(--gold-base);
      background: rgba(255, 102, 0, 0.06);
      padding: 16px 20px;
      margin: 28px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: rgba(255, 255, 255, 0.9);
    }
    .article-body pre {
      background: #0d0d0d;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      font-family: var(--font-code);
      font-size: 13px;
      line-height: 1.6;
      margin: 24px 0;
      overflow-x: auto;
      color: #e5e5e5;
    }
    .article-body code {
      font-family: var(--font-code);
      font-size: 13px;
      color: var(--gold-light);
      background: rgba(255, 102, 0, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .article-body pre code { background: transparent; padding: 0; color: inherit; }

    .table-responsive {
      overflow-x: auto;
      margin: 24px 0 32px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.015);
    }

    /* AUTHOR CARD */
    .article-author-card {
      margin: 56px 0 40px;
      padding: 24px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: 16px;
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    .author-avatar-badge {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold-base), #3a2e22);
      color: #ffffff;
      font-weight: 700;
      font-family: var(--font-display);
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .author-details { flex: 1; }
    .author-name { font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 2px; }
    .author-role { font-size: 12px; color: var(--gold-light); margin-bottom: 8px; }
    .author-bio { font-size: 13px; color: rgba(255, 255, 255, 0.65); line-height: 1.5; margin-bottom: 12px; }
    .author-links { display: flex; gap: 16px; font-size: 12px; }
    .author-links a { color: var(--gold-light); text-decoration: none; }
    .author-links a:hover { text-decoration: underline; }

    /* CLUSTER CALLOUT */
    .blog-cluster-callout {
      margin: 40px 0;
      padding: 28px;
      background: linear-gradient(135deg, rgba(255, 102, 0, 0.08), rgba(255, 255, 255, 0.02));
      border: 1px solid rgba(255, 102, 0, 0.25);
      border-radius: 16px;
    }
    .cluster-callout-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    @media (min-width: 640px) {
      .cluster-callout-inner { flex-direction: row; align-items: center; justify-content: space-between; }
    }
    .cluster-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--gold-base); text-transform: uppercase; margin-bottom: 6px; display: block; }
    .cluster-callout-text h3 { font-family: var(--font-display); font-size: 22px; color: #ffffff; margin-bottom: 6px; }
    .cluster-callout-text p { font-size: 13px; color: rgba(255, 255, 255, 0.7); line-height: 1.5; margin: 0; max-width: 520px; }
    .btn-cluster-explore {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: var(--gold-base);
      color: #000000;
      font-size: 12px;
      font-weight: 600;
      border-radius: 999px;
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    .btn-cluster-explore:hover { background: var(--gold-hover); text-decoration: none; color: #000000; }

    /* RELATED ARTICLES */
    .related-section { margin-top: 52px; padding-top: 36px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
    .related-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px; }
    .related-header h3 { font-family: var(--font-display); font-size: 22px; font-style: italic; color: #ffffff; }
    .related-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px) {
      .related-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .related-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      transition: all 0.2s;
    }
    .related-card:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 102, 0, 0.4);
      transform: translateY(-2px);
      text-decoration: none;
    }
    .related-category {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--gold-light);
      margin-bottom: 8px;
    }
    .related-title {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.4;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  ${renderHeader('blog')}

  <main>
    <article class="article-wrap" role="main">
      <nav class="breadcrumbs" aria-label="Breadcrumbs">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/blog/">Engineering Blog</a>
        <span>/</span>
        <span style="color:rgba(255,255,255,0.8);">${b.title}</span>
      </nav>

      <header class="article-header">
        <span class="article-tag">${b.category}</span>
        <h1 class="article-title">${b.title}</h1>
        <div class="article-meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${b.readTime}
          </span>
          <span>&bull;</span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ${b.date}
          </span>
          <span>&bull;</span>
          <span>By ${b.author}</span>
        </div>
      </header>

      <div class="article-body">
        ${b.content}
      </div>

      <!-- AUTHOR BIO -->
      <div class="article-author-card">
        <div class="author-avatar-badge">AK</div>
        <div class="author-details">
          <div class="author-name">Adarsh Kushwah</div>
          <div class="author-role">Founder &amp; Principal Architect &bull; Blackvault Technology</div>
          <p class="author-bio">Building local-first open source search infrastructure, high-throughput web extractors, and agentic AI protocols.</p>
          <div class="author-links">
            <a href="${GITHUB_REPO}" target="_blank" rel="noopener">GitHub</a>
            <a href="https://x.com/BlackvaultTech" target="_blank" rel="noopener">Twitter / X</a>
            <a href="/blog/feed.xml">RSS Feed &rarr;</a>
          </div>
        </div>
      </div>

      <!-- CLUSTER CALLOUT -->
      <div class="blog-cluster-callout">
        <div class="cluster-callout-inner">
          <div class="cluster-callout-text">
            <span class="cluster-tag">ENGINEERING BLOG &bull; 24 GUIDES</span>
            <h3>Explore More Search &amp; Agent Architecture</h3>
            <p>Compare SerpAPI and Tavily, configure Claude Desktop with MCP, or learn how hybrid search fuses BM25 and CPU embeddings.</p>
          </div>
          <a href="/blog/" class="btn-cluster-explore">
            <span>View All 24 Articles</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
        </div>
      </div>

      <!-- RELATED ARTICLES SECTION -->
      <section class="related-section" aria-labelledby="related-heading">
        <div class="related-header">
          <h3 id="related-heading">Related Engineering Guides</h3>
          <a href="/blog/" style="font-size:12px; color:var(--gold-light);">Browse all 24 articles &rarr;</a>
        </div>
        <div class="related-grid">
          ${relatedPosts.map(rp => `
          <a href="/blog/${rp.slug}/" class="related-card">
            <div>
              <span class="related-category">${rp.category}</span>
              <h4 class="related-title">${rp.title}</h4>
            </div>
            <span style="font-size:11px; color:var(--gold-light);">Read article &rarr;</span>
          </a>
          `).join('')}
        </div>
      </section>
    </article>
  </main>

  ${renderFooter()}
</body>
</html>`;

    fs.writeFileSync(path.join(postDir, 'index.html'), fullHtml, 'utf-8');
    console.log(`Generated full blog: ${b.slug}`);
  });
}

generateAll24BlogPosts();
console.log("Finished generating all 24 complete blog posts!");
