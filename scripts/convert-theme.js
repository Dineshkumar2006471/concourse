/* eslint-disable */
const fs = require('fs');

const str = fs.readFileSync('tailwind-stitch.json', 'utf8');
const config = new Function('return ' + str)();
const extend = config.theme.extend;

let css = `@import "tailwindcss";\n\n@theme {\n`;

if (extend.colors) {
  for (const [key, value] of Object.entries(extend.colors)) {
    css += `  --color-${key}: ${value};\n`;
  }
}

if (extend.fontFamily) {
  for (const [key, value] of Object.entries(extend.fontFamily)) {
    css += `  --font-${key}: ${value.map(v => `"${v}"`).join(', ')};\n`;
  }
}

if (extend.fontSize) {
  for (const [key, value] of Object.entries(extend.fontSize)) {
    const size = value[0];
    const { lineHeight, letterSpacing, fontWeight } = value[1];
    css += `  --text-${key}: ${size};\n`;
    if (lineHeight) css += `  --text-${key}--line-height: ${lineHeight};\n`;
    if (letterSpacing) css += `  --text-${key}--letter-spacing: ${letterSpacing};\n`;
    if (fontWeight) css += `  --text-${key}--font-weight: ${fontWeight};\n`;
  }
}

if (extend.spacing) {
  for (const [key, value] of Object.entries(extend.spacing)) {
    css += `  --spacing-${key}: ${value};\n`;
  }
}

css += `}\n\n`;

// Add imports for the fonts
css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');\n` + css;

// Add base body styles
css += `:root {
  --background: var(--color-background);
  --foreground: var(--color-on-surface);
}
body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-body-md);
}

.pulse-ring {
    animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}
@keyframes pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(27, 77, 255, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(27, 77, 255, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(27, 77, 255, 0); }
}

.hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('Successfully updated globals.css with Stitch theme variables');

