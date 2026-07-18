/* eslint-disable */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/app/app');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove any <nav> block entirely
    content = content.replace(/<nav[\s\S]*?<\/nav>/g, '');
    
    // Some pages have wrapper divs we need to clean up
    content = content.replace(/<div className="flex-1 md:ml-\[240px\] flex flex-col min-w-0">/, '');
    content = content.replace(/<main className="md:ml-sidebar-expanded pt-8 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto min-h-screen pb-24 mt-\[32px\]">/, '<main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-max-width mx-auto w-full">');
    
    // Also transit has a fixed top ticker
    content = content.replace(/<div className="w-full bg-on-background text-on-primary py-1 overflow-hidden z-50 fixed top-0 h-\[32px\] flex items-center">[\s\S]*?<\/div>\s*<\/div>/, '');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Stripped old sidebars from:', filePath);
    }
  }
});


