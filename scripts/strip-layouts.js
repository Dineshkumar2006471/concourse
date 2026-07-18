 
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/app/app');

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the entire <aside>...</aside> block
    content = content.replace(/<aside[\s\S]*?<\/aside>/g, '');
    
    // Remove the entire <header>...</header> block
    content = content.replace(/<header[\s\S]*?<\/header>/g, '');
    
    // Sometimes Stitch used <nav className="w-[240px]..."> for the sidebar
    content = content.replace(/<nav className="w-\[240px\][\s\S]*?<\/nav>/g, '');
    
    // Remove the wrapper div that has ml-[240px] since AppShell handles it now
    content = content.replace(/<div className="flex-1 flex flex-col ml-\[240px\] h-screen overflow-hidden">/, '<div className="flex-1 flex flex-col overflow-hidden">');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Stripped layouts from:', filePath);
}

// Pages to process
const pages = [
    'page.tsx',
    'pulse/page.tsx',
    'transit/page.tsx',
    'access/page.tsx',
    'wayfinder/page.tsx',
    'verde/page.tsx',
    'polyglot/page.tsx'
];

pages.forEach(p => {
    processFile(path.join(targetDir, p));
});


