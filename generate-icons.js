// This script generates PWA icons from SVG
// Run with: node generate-icons.js

const fs = require('fs');
const path = require('path');

// SVG content for PawsIQ logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#be185d;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="256" cy="256" r="240" fill="url(#grad1)" stroke="#be185d" stroke-width="8"/>
  
  <!-- Paw print -->
  <g fill="white" opacity="0.95">
    <!-- Main pad -->
    <ellipse cx="256" cy="320" rx="45" ry="55" />
    
    <!-- Toe pads -->
    <ellipse cx="200" cy="250" rx="25" ry="35" transform="rotate(-20 200 250)" />
    <ellipse cx="230" cy="210" rx="25" ry="35" transform="rotate(-5 230 210)" />
    <ellipse cx="282" cy="210" rx="25" ry="35" transform="rotate(5 282 210)" />
    <ellipse cx="312" cy="250" rx="25" ry="35" transform="rotate(20 312 250)" />
  </g>
  
  <!-- Text -->
  <text x="256" y="420" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="white" opacity="0.9">PawsIQ</text>
</svg>`;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write SVG file
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

// Create placeholder PNG files (in a real scenario, you'd use a tool like sharp to convert SVG to PNG)
const createPlaceholderPNG = (size, filename) => {
  const canvas = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    ${svgContent.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">', '').replace('</svg>', '')}
  </svg>`;
  
  fs.writeFileSync(path.join(publicDir, filename), canvas);
};

// Generate different sizes
createPlaceholderPNG(192, 'pwa-192x192.svg');
createPlaceholderPNG(512, 'pwa-512x512.svg');
createPlaceholderPNG(180, 'apple-touch-icon.svg');
createPlaceholderPNG(512, 'masked-icon.svg');

console.log('Icons generated successfully!');
console.log('Note: These are SVG files. For production, convert them to PNG using a tool like sharp or online converters.');