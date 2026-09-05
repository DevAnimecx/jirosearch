import { execSync } from 'child_process';

console.log("🚀 Starting complete build of all Jiro pages, docs, blogs, feeds, and sitemaps...");

const scripts = [
  'scripts/build_logo_svg.mjs',
  'scripts/generate_docs.mjs',
  'scripts/generate_product_and_legal.mjs',
  'scripts/generate_all_24_blogs.mjs',
  'scripts/update_hub_and_feeds.mjs',
];

for (const script of scripts) {
  console.log(`Running node ${script}...`);
  execSync(`node ${script}`, { stdio: 'inherit' });
}

console.log("✨ All Jiro pages, docs, feeds, and sitemaps regenerated successfully!");

