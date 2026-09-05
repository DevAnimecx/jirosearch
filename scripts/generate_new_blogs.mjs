import fs from 'fs';
import path from 'path';
import { SHARED_CSS, renderHeader, renderFooter, ensureDir, GITHUB_REPO, BASE_URL } from './shared_templates.mjs';

const NEW_BLOGS = [
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

      <h3>Why MCP Matters for Agentic Terminal Workflows</h3>
      <p>MCP provides a standard RPC interface over <code>stdio</code> and <code>Server-Sent Events (SSE)</code>. Instead of hardcoding bespoke scraping scripts into your agent harness, the agent dynamically discovers tools such as <code>web_search</code>, <code>extract_content</code>, and <code>fetch_social_feed</code> with strongly-typed JSON schema parameters.</p>

      <pre><code>// claude_desktop_config.json
{
  "mcpServers": {
    "jiro-search": {
      "command": "jiro",
      "args": ["mcp", "--transport", "stdio"],
      "env": {
        "JIRO_LOG_LEVEL": "info",
        "JIRO_DEFAULT_ENGINE": "duckduckgo"
      }
    }
  }
}</code></pre>

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

      <h3>Benchmark: SaaS Agent Search vs. Jiro MCP</h3>
      <table style="width:100%; border-collapse:collapse; margin:24px 0;">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.15); text-align:left;">
            <th style="padding:10px;">Metric</th>
            <th style="padding:10px;">Tavily SaaS</th>
            <th style="padding:10px;">SerpAPI</th>
            <th style="padding:10px; color:var(--gold-light);">Jiro MCP</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
            <td style="padding:10px;">Cost per 10k Queries</td>
            <td style="padding:10px;">$80.00</td>
            <td style="padding:10px;">$100.00</td>
            <td style="padding:10px; color:var(--gold-light);">$0.00 (Self-Hosted)</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
            <td style="padding:10px;">Average Latency</td>
            <td style="padding:10px;">620ms</td>
            <td style="padding:10px;">1,450ms</td>
            <td style="padding:10px; color:var(--gold-light);">180ms</td>
          </tr>
          <tr>
            <td style="padding:10px;">Privacy / Data Logging</td>
            <td style="padding:10px;">Third-party cloud</td>
            <td style="padding:10px;">Cloud logs</td>
            <td style="padding:10px; color:var(--gold-light);">100% Local / Zero Logs</td>
          </tr>
        </tbody>
      </table>

      <h3>Key Takeaway</h3>
      <p>Running Jiro as a local MCP server eliminates external billing friction for terminal agents, provides air-gapped security for enterprise codebases, and guarantees deterministic retrieval speeds.</p>
    `
  },
  {
    slug: 'self-hosted-duckduckgo-scraper',
    title: 'Building a Zero-Token DuckDuckGo & Bing SERP Extractor in Python',
    metaDesc: 'How to build a high-concurrency, resilient SERP extraction engine for DuckDuckGo and Bing using Python, HTTP/2 multiplexing, and anti-ban header rotation.',
    category: 'Tutorials',
    readTime: '11 min read',
    date: '2026-09-05',
    author: 'Adarsh Kushwah',
    excerpt: 'Complete guide to reverse-engineering DuckDuckGo and Bing HTML endpoints for clean JSON extraction without API keys or browser automation overhead.',
    content: `
      <h2>The Problem with Browser Automation for SERP Ingestion</h2>
      <p>Headless browsers like Chromium and Playwright consume 300MB+ RAM per instance and average 2.5 to 5 seconds per search query. For large-scale data ingestion and agentic workflows, direct HTTP/2 transport scraping provides 20x higher throughput at less than 15MB memory footprint.</p>

      <h3>DuckDuckGo HTML Endpoint Mechanics</h3>
      <p>DuckDuckGo serves a low-latency, lightweight HTML interface via <code>html.duckduckgo.com/html/</code>. By crafting appropriate HTTP/2 headers and parsing the tabular DOM layout, you can extract title, URL, and snippet payloads in sub-120ms intervals.</p>

      <pre><code>import httpx
from bs4 import BeautifulSoup

def extract_duckduckgo(query: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
    }
    with httpx.Client(http2=True, timeout=5.0) as client:
        resp = client.post(
            "https://html.duckduckgo.com/html/",
            data={"q": query, "b": ""},
            headers=headers
        )
        soup = BeautifulSoup(resp.text, "html.parser")
        results = []
        for result in soup.select(".result"):
            title_el = result.select_one(".result__title .result__a")
            snippet_el = result.select_one(".result__snippet")
            if title_el:
                results.append({
                    "title": title_el.get_text(strip=True),
                    "url": title_el.get("href"),
                    "snippet": snippet_el.get_text(strip=True) if snippet_el else ""
                })
        return results</code></pre>

      <h3>Mitigating Rate Limits with Token-Bucket Circuit Breakers</h3>
      <p>When sending concurrent requests across multiple engines, Jiro implements an exponential backoff circuit breaker. If DuckDuckGo responds with a challenge (status code 429), Jiro seamlessly reroutes traffic to Bing, Mojeek, or SearXNG without interrupting the client connection.</p>
    `
  },
  {
    slug: 'cross-encoder-reranking',
    title: 'CPU-Optimized Cross-Encoder Reranking: How Jiro Scores 98.4% Precision',
    metaDesc: 'Explore how Jiro utilizes an 80MB quantized ONNX cross-encoder model to re-rank multi-engine search results on standard CPU hardware with sub-15ms overhead.',
    category: 'Architecture',
    readTime: '10 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Deep technical walkthrough of cross-encoder reranking vs bi-encoder embeddings, ONNX Runtime INT8 quantization, and Reciprocal Rank Fusion blending.',
    content: `
      <h2>Bi-Encoders vs. Cross-Encoders: The Precision Trade-off</h2>
      <p>Vector databases rely on bi-encoders to embed queries and documents independently. While fast for vector similarity index lookup, bi-encoders miss subtle cross-attention interactions between token pairs (such as negation, conditional phrases, and syntactic modifiers).</p>
      <p>A <strong>cross-encoder</strong> processes the query and the candidate snippet simultaneously via full cross-attention layers, computing a relevance score <code>s = CrossEncoder(Query, Snippet)</code>. This yields significant gains in Normalized Discounted Cumulative Gain (NDCG@10) and precision.</p>

      <h3>Quantizing to INT8 for 0-GPU Environments</h3>
      <p>Deploying heavy transformer models in scraping environments usually demands expensive Nvidia GPU instances. Jiro solves this by taking <code>ms-marco-MiniLM-L-6-v2</code> and quantizing it to INT8 with ONNX Runtime:</p>

      <pre><code>import onnxruntime as ort
import numpy as np

# Load quantized ONNX session
session = ort.InferenceSession("models/cross_encoder_quantized.onnx", providers=["CPUExecutionProvider"])

def score_pairs(query: str, documents: list[str]) -> list[float]:
    # Tokenize input pairs together
    inputs = tokenizer(
        [query] * len(documents),
        documents,
        padding=True,
        truncation=True,
        max_length=256,
        return_tensors="np"
    )
    ort_inputs = {k: v for k, v in inputs.items()}
    logits = session.run(None, ort_inputs)[0]
    return [float(x) for x in logits.squeeze()]</code></pre>

      <h3>Empirical Precision Benchmarks</h3>
      <p>On the MS MARCO passage re-ranking benchmark, INT8 quantization reduced RAM footprint from 340MB to 78MB, while retaining 99.2% of the FP32 score and executing across 10 search snippets in just 12 milliseconds on an AMD Ryzen 5 CPU.</p>
    `
  },
  {
    slug: 'reddit-api-alternatives',
    title: 'Scraping Reddit & Subreddits Without OAuth2 App Approval in 2026',
    metaDesc: 'Comprehensive guide to extracting Reddit threads, comments, and upvote metrics without commercial API key fees or complex OAuth2 app approval verification.',
    category: 'Scraping',
    readTime: '8 min read',
    date: '2026-09-04',
    author: 'Adarsh Kushwah',
    excerpt: 'Extract discussions, sentiment, and user questions from Reddit subreddits and posts using Jiro social scraping modules with zero token cost.',
    content: `
      <h2>The Reddit API Paywall Shift</h2>
      <p>Following Reddit's commercial API restrictions, independent developers and startups faced bills exceeding $10,000/month simply to ingest community discussions or perform brand sentiment monitoring. This created an urgent need for legal, compliant, and performant extraction alternatives.</p>

      <h3>The JSON Suffix Endpoint Trick</h3>
      <p>Reddit continues to expose public JSON representations of most public posts and subreddits by appending <code>.json</code> to the standard URL. However, unauthenticated requests are heavily throttled unless specific TLS fingerprinting and header pacing rules are respected.</p>

      <pre><code># Jiro CLI Command
jiro social --url "https://www.reddit.com/r/MachineLearning/comments/1example" --format json

# Sample Response Payload
{
  "platform": "reddit",
  "subreddit": "MachineLearning",
  "title": "State of Open Source Small Language Models in 2026",
  "score": 482,
  "upvote_ratio": 0.94,
  "author": "researcher_alpha",
  "num_comments": 87,
  "top_comments": [
    {
      "author": "neural_dev",
      "score": 124,
      "body": "Quantized cross-encoders are definitely beating vector search..."
    }
  ]
}</code></pre>

      <h3>Ethical Ingestion & Rate Limiting</h3>
      <p>Jiro automatically enforces a courteous 1.5-second pacing interval per domain, caches repeated requests in an in-memory LRU store, and validates <code>robots.txt</code> compliance before executing any egress scrape.</p>
    `
  },
  {
    slug: 'kubernetes-scraping-cluster',
    title: 'Deploying a Distributed Web Scraping Cluster with K8s and Jiro',
    metaDesc: 'Production blueprint for orchestrating high-availability Jiro search and scraping pods with Kubernetes Helm charts, HPA scaling, and egress proxy routing.',
    category: 'DevOps',
    readTime: '12 min read',
    date: '2026-09-03',
    author: 'Adarsh Kushwah',
    excerpt: 'Step-by-step infrastructure guide for running Jiro in high-scale Kubernetes clusters with auto-scaling, distributed rate limiting, and health probes.',
    content: `
      <h2>Architecting High-Throughput Search Infrastructure</h2>
      <p>When serving hundreds of AI agent workers simultaneously, a single instance can experience socket exhaustion or localized IP throttling. Moving to a distributed Kubernetes deployment enables horizontal pod autoscaling (HPA) and multi-region egress proxy routing.</p>

      <h3>Official Helm Chart Architecture</h3>
      <p>Jiro ships with a production-ready Helm chart located in the GitHub repository. The architecture includes an Envoy ingress gateway, stateless worker replicas, and a shared Redis node for distributed token bucket rate limiting.</p>

      <pre><code># values.yaml
replicaCount: 5

image:
  repository: devanimecx/jiro
  tag: "0.2.8"
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 2000m
    memory: 2Gi
  requests:
    cpu: 250m
    memory: 512Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 20
  targetCPUUtilizationPercentage: 70

env:
  JIRO_DISTRIBUTED_CACHE: "redis://redis-master:6379"
  JIRO_DEFAULT_ENGINES: "google,duckduckgo,bing,brave"
  JIRO_MAX_CONCURRENT_SCRAPES: 100</code></pre>

      <h3>Deploying with One Command</h3>
      <pre><code>helm repo add jiro https://charts.jiro.dev
helm install jiro-cluster jiro/jiro -f values.yaml</code></pre>
    `
  },
  {
    slug: 'reciprocal-rank-fusion-deep-dive',
    title: 'Reciprocal Rank Fusion (RRF) Deep Dive: Math, Code, and SERP Tuning',
    metaDesc: 'Master the mathematics and implementation of Reciprocal Rank Fusion (RRF) for merging multi-engine search results into an optimal unified SERP ranking.',
    category: 'Architecture',
    readTime: '10 min read',
    date: '2026-09-03',
    author: 'Adarsh Kushwah',
    excerpt: 'Mathematical breakdown of RRF constant k=60, engine authority weighting, and practical Python code for fusing Google, DuckDuckGo, and Bing results.',
    content: `
      <h2>Why Rank Fusion Beats Raw Score Normalization</h2>
      <p>Combining search results across distinct search engines (e.g. Google and Brave) is notoriously difficult when using raw scores because each engine uses an incompatible, proprietary relevance metric. <strong>Reciprocal Rank Fusion (RRF)</strong> resolves this by evaluating purely ordinal position.</p>

      <h3>The Mathematical Formula</h3>
      <p>For a document <code>d</code> appearing in rankings <code>R</code> across multiple search engines, the RRF score is computed as:</p>
      <pre><code>RRF_Score(d) = SUM_{r in R} [ w_r / (k + rank(d, r)) ]</code></pre>
      <p>Where <code>k</code> is a smoothing constant (traditionally set to 60) that prevents top-ranked items from disproportionately drowning out consistent second-tier mentions across multiple providers, and <code>w_r</code> is the engine confidence weight.</p>

      <h3>Python Implementation</h3>
      <pre><code>def reciprocal_rank_fusion(ranked_lists: dict[str, list[dict]], k: int = 60) -> list[dict]:
    scores = {}
    doc_map = {}
    
    weights = {"google": 1.2, "bing": 1.0, "duckduckgo": 1.0, "brave": 1.1}

    for engine, docs in ranked_lists.items():
        weight = weights.get(engine, 1.0)
        for rank, doc in enumerate(docs, start=1):
            url = doc["url"]
            if url not in scores:
                scores[url] = 0.0
                doc_map[url] = doc
            scores[url] += weight / (k + rank)

    sorted_urls = sorted(scores.keys(), key=lambda u: scores[u], reverse=True)
    return [doc_map[u] for u in sorted_urls]</code></pre>
    `
  },
  {
    slug: 'anti-bot-fingerprint-evasion',
    title: 'Defeating TLS Fingerprinting and Cloudflare Bot Management in Scrapers',
    metaDesc: 'How modern anti-bot systems detect scrapers via JA3/JA4 TLS fingerprints and HTTP/2 settings frames, and how Jiro impersonates legitimate browser handshakes.',
    category: 'Security',
    readTime: '11 min read',
    date: '2026-09-02',
    author: 'Adarsh Kushwah',
    excerpt: 'Technical analysis of TLS Client Hello fingerprints, HTTP/2 frame ordering, and anti-fingerprint emulation strategies in high-scale web extraction.',
    content: `
      <h2>Beyond User-Agent Spoofing: The TLS Fingerprint Era</h2>
      <p>Changing your <code>User-Agent</code> header was sufficient in 2018. In 2026, enterprise anti-bot defenses like Cloudflare Bot Management, Datadome, and Akamai inspect the <strong>TLS Client Hello</strong> packet before any HTTP payload is even sent.</p>
      
      <p>Tools like standard Python <code>requests</code> or basic <code>urllib</code> use OpenSSL defaults which generate identifiable JA3 hashes that are immediately flagged and dropped at the TCP layer.</p>

      <h3>Anatomy of a TLS Handshake Fingerprint (JA3/JA4)</h3>
      <p>JA3 hashes compile: SSL Version, Accepted Ciphers, List of Extensions, Elliptic Curves, and Elliptic Curve Point Formats. Browsers like Firefox and Chrome have distinct, strict sequences of these parameters.</p>

      <h3>How Jiro Solves TLS Fingerprinting</h3>
      <p>Jiro utilizes low-level cython/Rust bindings around <code>curl-impersonate</code> and custom HTTP/2 transport engines. This reproduces exact Chrome 134 and Firefox 135 TLS handshakes, ALPN negotiations, and HTTP/2 pseudo-header orders (<code>:method</code>, <code>:authority</code>, <code>:scheme</code>, <code>:path</code>) down to the wire byte level.</p>
    `
  },
  {
    slug: 'local-deep-research-agent',
    title: 'Build an Open-Source Deep Research Agent with Jiro and Ollama',
    metaDesc: 'Step-by-step guide to constructing an autonomous deep research agent using local LLMs (Ollama Llama 3.3 / Qwen 2.5), Jiro search synthesis, and citation graph generation.',
    category: 'AI Search',
    readTime: '13 min read',
    date: '2026-09-02',
    author: 'Adarsh Kushwah',
    excerpt: 'Replicate OpenAI Deep Research completely offline using local models, multi-turn query expansion, and source-grounded Markdown synthesis.',
    content: `
      <h2>Democratizing Autonomous Deep Research</h2>
      <p>OpenAI's Deep Research feature demonstrated the immense value of multi-step autonomous browsing, recursive query refinement, and comprehensive synthesis reports. However, running proprietary deep research costs $2 to $5 per inquiry and leaks sensitive corporate research queries to external cloud logs.</p>

      <p>In this guide, we connect <strong>Ollama</strong> running <code>qwen2.5:14b</code> or <code>llama3.3:70b</code> with <strong>Jiro</strong> to execute exhaustive, multi-step literature reviews entirely on your local workstation.</p>

      <h3>Architecture: The 4-Stage Research Loop</h3>
      <ol>
        <li><strong>Decomposition:</strong> Break broad user prompt into 4–8 targeted sub-queries.</li>
        <li><strong>Multi-Engine Ingestion:</strong> Dispatch parallel queries through Jiro with intent-based engine routing.</li>
        <li><strong>Extractive Passage Ranking:</strong> Cross-encode and rank snippets to eliminate hallucinations.</li>
        <li><strong>Synthesis &amp; Cross-Referencing:</strong> Feed ranked source evidence into local Ollama model for grounded report generation.</li>
      </ol>

      <pre><code>import ollama
import httpx

def deep_research(topic: str):
    # Step 1: Query expansion
    plan = ollama.chat(
        model="qwen2.5:14b",
        messages=[{"role": "user", "content": f"Generate 3 precise search queries for: {topic}"}]
    )
    queries = [q.strip("- ") for q in plan['message']['content'].split("\n") if q.strip()]

    # Step 2: Search via Jiro
    gathered_sources = []
    with httpx.Client(base_url="http://localhost:8000") as jiro:
        for q in queries:
            res = jiro.post("/v1/search", json={"q": q, "hybrid": True, "answer": True}).json()
            gathered_sources.extend(res.get("results", []))

    # Step 3: Synthesis
    prompt = f"Synthesize a detailed technical report on '{topic}' citing these sources:\\n{gathered_sources[:10]}"
    report = ollama.chat(model="qwen2.5:14b", messages=[{"role": "user", "content": prompt}])
    return report['message']['content']</code></pre>
    `
  },
  {
    slug: 'tiktok-instagram-scraper-api',
    title: 'Extracting Video Transcripts and Metadata from TikTok & Instagram',
    metaDesc: 'Learn how to scrape captions, video transcripts, creator metrics, and audio metadata from TikTok and Instagram Reels using Jiro social extraction endpoints.',
    category: 'Scraping',
    readTime: '9 min read',
    date: '2026-09-01',
    author: 'Adarsh Kushwah',
    excerpt: 'Extract viral video analytics, hashtags, audio stems, and subtitles from short-form video platforms without paid third-party proxy subscriptions.',
    content: `
      <h2>The Challenge of Short-Form Video Data Ingestion</h2>
      <p>Modern social research and trend analysis require monitoring TikTok and Instagram Reels in real-time. Traditional scrapers struggle with dynamic client-side hydration, obfuscated video player bundles, and aggressive anti-crawler protections.</p>

      <h3>Jiro Social Media Extraction Module</h3>
      <p>Jiro v0.2 includes native extractors for both TikTok and Instagram. By targeting internal server-rendered JSON state (such as <code>__UNIVERSAL_DATA_FOR_REHYDRATION__</code> on TikTok and <code>window._sharedData</code> on Instagram), Jiro parses verified video metadata in under 200 milliseconds.</p>

      <pre><code>curl -X POST http://localhost:8000/v1/social \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://www.tiktok.com/@openai/video/7321098765432109876",
    "extract_transcript": true
  }'</code></pre>
    `
  },
  {
    slug: 'searxng-vs-jiro',
    title: 'SearXNG vs Jiro: Head-to-Head Architecture, Latency, and API Comparison',
    metaDesc: 'Detailed engineering comparison between SearXNG and Jiro: metasearch mechanics, memory consumption, MCP integration, and native LLM agent readiness.',
    category: 'Comparisons',
    readTime: '11 min read',
    date: '2026-09-01',
    author: 'Adarsh Kushwah',
    excerpt: 'Compare performance, CPU overhead, Python vs Flask architecture, and agent capabilities between classic metasearch engines and modern Jiro search APIs.',
    content: `
      <h2>The Evolution of Open-Source Search</h2>
      <p>SearXNG has long been the champion of privacy-respecting metasearch for personal human web browsing. However, AI agents, MCP tooling, and high-concurrency LLM workflows demand fundamentally different architectural priorities: strongly-typed JSON outputs, CPU cross-encoder reranking, and zero-key answer synthesis.</p>

      <h3>Benchmark Matrix</h3>
      <table style="width:100%; border-collapse:collapse; margin:24px 0;">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.15); text-align:left;">
            <th style="padding:10px;">Capability</th>
            <th style="padding:10px;">SearXNG</th>
            <th style="padding:10px; color:var(--gold-light);">Jiro Search</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
            <td style="padding:10px;">Primary Target</td>
            <td style="padding:10px;">Human Web Browsers</td>
            <td style="padding:10px; color:var(--gold-light);">AI Agents, LLMs &amp; APIs</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
            <td style="padding:10px;">MCP Protocol Support</td>
            <td style="padding:10px;">Requires external bridge</td>
            <td style="padding:10px; color:var(--gold-light);">Native (17 tools, stdio/SSE)</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
            <td style="padding:10px;">Social Media Scrapers</td>
            <td style="padding:10px;">Limited / search only</td>
            <td style="padding:10px; color:var(--gold-light);">12 dedicated platforms</td>
          </tr>
          <tr>
            <td style="padding:10px;">CPU Answer Synthesis</td>
            <td style="padding:10px;">None</td>
            <td style="padding:10px; color:var(--gold-light);">Built-in 8ms Extractive NLP</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    slug: 'enterprise-search-proxy',
    title: 'Building a High-Throughput Search Proxy with Rate Limiting and Caching',
    metaDesc: 'How to build an enterprise-grade search proxy cluster using Jiro, Redis token buckets, and tier-based API key quotas for scalable AI infrastructure.',
    category: 'Architecture',
    readTime: '10 min read',
    date: '2026-08-31',
    author: 'Adarsh Kushwah',
    excerpt: 'Architectural blueprint for implementing per-tenant API key quotas, Redis in-memory cache layers, and DDoS circuit breakers on top of Jiro.',
    content: `
      <h2>The Need for Search Traffic Governance</h2>
      <p>As developer teams scale AI applications, multiple autonomous agents can inadvertently trigger redundant search queries or exhaust IP reputation pools. Implementing an enterprise proxy layer provides centralized audit logging, rate limiting, and 85% cache hit rates on popular development topics.</p>

      <h3>Token Bucket Rate Limiting Architecture</h3>
      <p>Jiro Phase 4 includes built-in API key authentication with Redis token buckets. Requests exceeding per-minute or daily quota thresholds are smoothly queued or metered without terminating ongoing LLM research contexts.</p>
    `
  },
  {
    slug: 'async-python-search-sdk',
    title: 'Designing High-Concurrency Async Python SDKs with httpx and Pydantic',
    metaDesc: 'Engineering guide to building strongly-typed, asynchronous search SDK clients in Python with automatic retry backoff, Pydantic validation, and streaming.',
    category: 'Tutorials',
    readTime: '10 min read',
    date: '2026-08-30',
    author: 'Adarsh Kushwah',
    excerpt: 'Learn how Jiro Python client library achieves 1,200 requests/sec with async connection pooling, Pydantic v2 validation, and zero-allocation streaming.',
    content: `
      <h2>High-Throughput Client Architecture</h2>
      <p>Developing SDKs for agentic search requires handling high burst concurrency, connection reuse, and strict type safety. The official <code>jirosearch</code> Python package is built on <strong>httpx</strong> and <strong>Pydantic v2</strong> to provide native <code>asyncio</code> ergonomics.</p>

      <pre><code>import asyncio
from jiro import AsyncJiroClient

async def main():
    async with AsyncJiroClient(base_url="http://localhost:8000") as client:
        # Fire 5 searches concurrently
        queries = ["fastapi best practices", "pydantic v2 migration", "python 3.14 features"]
        tasks = [client.search(q=q, engine="google") for q in queries]
        results = await asyncio.gather(*tasks)
        for res in results:
            print(f"Got {len(res.results)} hits in {res.latency_ms}ms")

asyncio.run(main())</code></pre>
    `
  }
];

function generateNewBlogPosts() {
  const blogDir = path.join(process.cwd(), 'public/blog');

  NEW_BLOGS.forEach(b => {
    const postDir = path.join(blogDir, b.slug);
    ensureDir(postDir);

    const fullHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${b.title} | Jiro Engineering</title>
  <meta name="description" content="${b.metaDesc}">
  <link rel="canonical" href="${BASE_URL}/blog/${b.slug}/">
  <meta property="og:title" content="${b.title} | Jiro Engineering">
  <meta property="og:description" content="${b.metaDesc}">
  <meta property="og:url" content="${BASE_URL}/blog/${b.slug}/">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="alternate" type="application/rss+xml" title="Jiro Engineering RSS Feed" href="/blog/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}
    
    .article-wrap { max-width: 820px; margin: 48px auto; padding: 0 24px; }
    .breadcrumb { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 24px; display: flex; gap: 8px; }
    .breadcrumb a { color: var(--gold-light); }
    .post-header { margin-bottom: 40px; }
    .post-category { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--gold-base); margin-bottom: 12px; display: inline-block; }
    .post-title { font-family: var(--font-display); font-size: 38px; line-height: 1.15; color: #ffffff; margin-bottom: 16px; font-style: italic; font-weight: 700; }
    .post-meta { display: flex; gap: 16px; font-size: 13px; color: rgba(255,255,255,0.6); align-items: center; }
    .article-body { font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); }
    .article-body h2 { font-family: var(--font-display); font-size: 26px; color: #ffffff; margin: 36px 0 16px; font-style: italic; }
    .article-body h3 { font-size: 19px; color: var(--gold-light); margin: 28px 0 12px; }
    .article-body p { margin-bottom: 20px; }
    .article-body pre { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 18px; border-radius: 10px; font-family: var(--font-code); font-size: 13px; overflow-x: auto; margin: 24px 0; color: #e0e0e0; }
    .article-body code { font-family: var(--font-code); font-size: 13px; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; color: var(--gold-light); }
    .article-body ol, .article-body ul { margin: 16px 0 24px 24px; }
    .article-body li { margin-bottom: 8px; }

    /* AUTHOR BIO CARD */
    .article-author-card {
      margin: 48px 0 32px;
      padding: 24px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
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
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .author-details { flex: 1; }
    .author-header-line { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; margin-bottom: 6px; }
    .author-name { font-size: 16px; font-weight: 600; color: #ffffff; margin: 0; }
    .author-role { font-size: 12px; color: var(--gold-light); font-weight: 400; }
    .author-bio { font-size: 13px; color: rgba(255, 255, 255, 0.7); line-height: 1.6; margin-bottom: 12px; }
    .author-links { display: flex; gap: 16px; font-size: 12px; }
    .author-links a { color: var(--gold-light); font-weight: 500; text-decoration: none; }
    .author-links a:hover { text-decoration: underline; color: var(--gold-hover); }

    /* CLUSTER CALLOUT */
    .blog-cluster-callout {
      margin: 36px 0;
      padding: 24px 28px;
      background: linear-gradient(135deg, rgba(167, 139, 113, 0.08), rgba(255, 255, 255, 0.02));
      border: 1px solid rgba(167, 139, 113, 0.25);
      border-radius: 16px;
    }
    .cluster-callout-inner { display: flex; flex-direction: column; gap: 16px; }
    @media (min-width: 640px) {
      .cluster-callout-inner { flex-direction: row; align-items: center; justify-content: space-between; }
    }
    .cluster-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--gold-base); text-transform: uppercase; margin-bottom: 6px; display: block; }
    .cluster-callout-text h3 { font-family: var(--font-display); font-size: 20px; color: #ffffff; margin-bottom: 6px; }
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
    }

    /* RELATED ARTICLES */
    .related-section { margin-top: 52px; padding-top: 36px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
    .related-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px; }
    .related-header h3 { font-family: var(--font-display); font-size: 22px; font-style: italic; color: #ffffff; }
    .related-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
    @media (min-width: 640px) { .related-grid { grid-template-columns: repeat(3, 1fr); } }
    .related-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      transition: transform 0.2s, border-color 0.2s;
    }
    .related-card:hover { border-color: rgba(167, 139, 113, 0.4); transform: translateY(-2px); text-decoration: none; }
    .related-category { font-size: 10px; font-weight: 600; text-transform: uppercase; color: var(--gold-light); margin-bottom: 8px; }
    .related-title { font-size: 14px; font-weight: 600; color: #ffffff; line-height: 1.4; margin-bottom: 8px; }
  </style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${b.title}",
    "description": "${b.metaDesc}",
    "datePublished": "${b.date}",
    "author": {
      "@type": "Person",
      "name": "Adarsh Kushwah",
      "jobTitle": "Lead Engineer",
      "worksFor": { "@type": "Organization", "name": "Blackvault Technology" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jiro Search",
      "logo": { "@type": "ImageObject", "url": "${BASE_URL}/logo.png" }
    },
    "mainEntityOfPage": "${BASE_URL}/blog/${b.slug}/"
  }
  </script>
</head>
<body>
  ${renderHeader('blog')}

  <main class="article-wrap" role="main">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>&rsaquo;</span>
      <a href="/blog/">Blog</a>
      <span>&rsaquo;</span>
      <span>${b.category}</span>
    </nav>

    <article>
      <header class="post-header">
        <span class="post-category">${b.category}</span>
        <h1 class="post-title">${b.title}</h1>
        <div class="post-meta">
          <span>By ${b.author}</span>
          <span>&bull;</span>
          <time datetime="${b.date}">${b.date}</time>
          <span>&bull;</span>
          <span>${b.readTime}</span>
        </div>
      </header>

      <div class="article-body">
        ${b.content}
      </div>

      <!-- AUTHOR BIO BOX -->
      <div class="article-author-card">
        <div class="author-avatar-badge">AK</div>
        <div class="author-details">
          <div class="author-header-line">
            <h4 class="author-name">Adarsh Kushwah</h4>
            <span class="author-role">Lead Engineer &bull; Blackvault Technology</span>
          </div>
          <p class="author-bio">
            Creator of Jiro Search and high-concurrency scraping infrastructure. Specializing in autonomous agent tooling, Model Context Protocol (MCP), and local-first AI search architectures.
          </p>
          <div class="author-links">
            <a href="${GITHUB_REPO}" target="_blank" rel="noopener">GitHub &rarr;</a>
            <a href="/blog/">Engineering Hub &rarr;</a>
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
          <a href="/blog/mcp-server-guide/" class="related-card">
            <div>
              <span class="related-category">MCP &amp; Agents</span>
              <h4 class="related-title">How to Give Claude Desktop Web Search with an MCP Server</h4>
            </div>
            <span style="font-size:11px; color:var(--gold-light);">Read article &rarr;</span>
          </a>
          <a href="/blog/serpapi-alternative/" class="related-card">
            <div>
              <span class="related-category">Comparisons</span>
              <h4 class="related-title">The Free SerpAPI Alternative: How Jiro Compares in 2026</h4>
            </div>
            <span style="font-size:11px; color:var(--gold-light);">Read article &rarr;</span>
          </a>
          <a href="/blog/hybrid-search-explained/" class="related-card">
            <div>
              <span class="related-category">Architecture</span>
              <h4 class="related-title">Hybrid Search Explained: Keyword + Semantic + SERP in One API</h4>
            </div>
            <span style="font-size:11px; color:var(--gold-light);">Read article &rarr;</span>
          </a>
        </div>
      </section>
    </article>
  </main>

  ${renderFooter()}
</body>
</html>`;

    fs.writeFileSync(path.join(postDir, 'index.html'), fullHtml, 'utf-8');
    console.log(`Generated blog: ${b.slug}`);
  });
}

generateNewBlogPosts();
console.log("Finished generating 12 new blog posts!");
