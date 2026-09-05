import fs from 'fs';
import path from 'path';

// Pixel-perfect vector SVG matching the user's uploaded logo image.png
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 58" fill="none" class="jiro-logo-svg" aria-label="jiro">
  <!-- letter j: solid white dot -->
  <circle cx="17.5" cy="11.5" r="5.5" fill="#FFFFFF" />
  <!-- letter j: stem & hook -->
  <path d="M12 21 H23 V45 C23 52 18.5 56 10.5 56 C5.5 56 1.8 54 0 52 L2.4 44.5 C3.8 45.8 6.5 47.5 9.5 47.5 C12.8 47.5 14.5 45.5 14.5 41.5 V21 H12 Z" fill="#FFFFFF" />
  
  <!-- letter i: stem -->
  <rect x="35" y="21" width="11" height="29" fill="#FFFFFF" rx="0.5" />
  
  <!-- letter i: orange magnifying glass replacing dot -->
  <g class="jiro-lens">
    <!-- circular lens ring in search orange -->
    <circle cx="41.5" cy="11" r="7.5" stroke="#FF6600" stroke-width="3.5" fill="none" />
    <!-- lens handle pointing 45 degrees down-right -->
    <path d="M47 16.5 L54 23.5" stroke="#FF6600" stroke-width="4.2" stroke-linecap="round" />
  </g>
  
  <!-- letter r: stem and clean arch -->
  <path d="M62 21 H72.5 V26 C75 22.5 79.5 20.5 85 20.5 C88 20.5 90.5 21.2 92 22.2 L88.5 29.8 C87.2 29 85.2 28.5 83 28.5 C77.5 28.5 73 32.5 73 40 V50 H62 V21 Z" fill="#FFFFFF" />
  
  <!-- letter o: bold geometric circle -->
  <path fill-rule="evenodd" clip-rule="evenodd" d="M113 20.5 C122.5 20.5 130 27.2 130 35.5 C130 43.8 122.5 50.5 113 50.5 C103.5 50.5 96 43.8 96 35.5 C96 27.2 103.5 20.5 113 20.5 Z M113 28.8 C108.2 28.8 104.5 31.8 104.5 35.5 C104.5 39.2 108.2 42.2 113 42.2 C117.8 42.2 121.5 39.2 121.5 35.5 C121.5 31.8 117.8 28.8 113 28.8 Z" fill="#FFFFFF" />
</svg>`;

// Favicon with dark square background, jiro 'j' dot + orange magnifying search glass
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#000000" />
  <!-- jiro mark: 'j' dot + stem -->
  <circle cx="19" cy="18" r="4.5" fill="#FFFFFF" />
  <path d="M15 25 H23 V43 C23 48 19.5 51 13 51 C9 51 6 49.5 4.5 48 L6.5 42.5 C8 43.5 10 44.5 12.5 44.5 C14.8 44.5 16 43 16 40 V25 H15 Z" fill="#FFFFFF" />
  <!-- i stem -->
  <rect x="31" y="25" width="8" height="25" fill="#FFFFFF" rx="0.5" />
  <!-- orange search glass -->
  <circle cx="37" cy="15" r="7.5" stroke="#FF6600" stroke-width="3.5" fill="none" />
  <path d="M42.5 20.5 L50 28" stroke="#FF6600" stroke-width="4.2" stroke-linecap="round" />
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public/logo.svg'), LOGO_SVG, 'utf-8');
fs.writeFileSync(path.join(process.cwd(), 'public/favicon.svg'), FAVICON_SVG, 'utf-8');
console.log("Updated public/logo.svg and public/favicon.svg with tight viewBox!");
