/* eslint-disable */
const fs = require('fs');
const https = require('https');
const path = require('path');

const OUTPUT_JSON_PATH = 'C:/Users/bingi/.gemini/antigravity-ide/brain/99b1b587-b2c1-4587-a67d-0f463a14337e/.system_generated/steps/421/output.txt';
const APP_DIR = path.join(__dirname, '../src/app');

// Map Stitch screen titles to Next.js routes
const ROUTE_MAP = {
  'Concourse — Dashboard': 'app/page.tsx',
  'Concourse — Landing Page': 'page.tsx',
  'Pulse — Live Crowd Map': 'app/pulse/page.tsx',
  'Transit — Logistics Sync': 'app/transit/page.tsx',
  'Polyglot — Real-time Comms': 'app/chat/page.tsx',
  'Access — Secure Operations': 'app/access/page.tsx',
  'Wayfinder — Smart Routing': 'app/wayfinder/page.tsx',
  'Verde — Sustainability': 'app/verde/page.tsx'
};

const fetchHTML = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

const convertHtmlToJsx = (html) => {
  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  // Remove script tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove style tags
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Convert class to className
  content = content.replace(/class="/g, 'className="');
  
  // Convert for to htmlFor
  content = content.replace(/for="/g, 'htmlFor="');

  // Fix self-closing tags
  const voidElements = ['img', 'input', 'br', 'hr', 'meta', 'link'];
  voidElements.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b([^>]*?)(?<!/)>`, 'gi');
    content = content.replace(regex, `<${tag}$1 />`);
  });

  // Convert HTML comments to JSX comments
  content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Style objects (basic conversion for inline styles if any)
  // E.g. style="width: 100px; height: 100px" -> style={{ width: '100px', height: '100px' }}
  content = content.replace(/style="([^"]+)"/g, (match, styles) => {
    const jsStyles = styles.split(';').filter(Boolean).map(s => {
      const [key, value] = s.split(':').map(str => str.trim());
      if (!key) return '';
      const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
      return `"${camelKey}": "${value}"`;
    }).join(', ');
    return `style={{ ${jsStyles} }}`;
  });

  return content;
};

async function main() {
  const data = JSON.parse(fs.readFileSync(OUTPUT_JSON_PATH, 'utf-8'));
  let tailwindConfigExtracted = false;

  for (const screen of data.screens) {
    if (!screen.htmlCode || !screen.htmlCode.downloadUrl) continue;
    
    const route = ROUTE_MAP[screen.title];
    if (!route) {
      console.log(`Skipping ${screen.title}, no route mapped.`);
      continue;
    }

    console.log(`Processing ${screen.title}...`);
    const html = await fetchHTML(screen.htmlCode.downloadUrl);
    
    // Extract Tailwind Config once
    if (!tailwindConfigExtracted) {
      const configMatch = html.match(/tailwind\.config\s*=\s*({[\s\S]*?})\s*<\/script>/);
      if (configMatch) {
        let configJson = configMatch[1];
        fs.writeFileSync(path.join(__dirname, '../tailwind-stitch.json'), configJson);
        console.log('Extracted Tailwind config to tailwind-stitch.json');
        tailwindConfigExtracted = true;
      }
    }

    const jsx = convertHtmlToJsx(html);
    
    const targetPath = path.join(APP_DIR, route);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    const fileContent = `'use client';\n\nexport default function Page() {\n  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
    fs.writeFileSync(targetPath, fileContent);
    console.log(`Saved to ${targetPath}`);
  }
}

main().catch(console.error);

