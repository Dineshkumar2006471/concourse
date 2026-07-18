/* eslint-disable */
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, '../src/app'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/stroke-width=/g, 'strokeWidth=');
    content = content.replace(/font-family=/g, 'fontFamily=');
    content = content.replace(/font-size=/g, 'fontSize=');
    content = content.replace(/font-weight=/g, 'fontWeight=');
    content = content.replace(/text-anchor=/g, 'textAnchor=');
    content = content.replace(/stroke-dasharray=/g, 'strokeDasharray=');
    content = content.replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
    content = content.replace(/stroke-linecap=/g, 'strokeLinecap=');
    content = content.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    content = content.replace(/fill-opacity=/g, 'fillOpacity=');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed SVG attributes in:', filePath);
    }
  }
});

