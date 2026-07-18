/* eslint-disable */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFiles() {
    walkDir(srcDir, function(filePath) {
        if (!filePath.endsWith('.tsx')) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Fix broken style={{ "backgroundImage": "url('https" }}
        const bgRegex = /style=\{\{\s*"backgroundImage":\s*"url\('https"\s*\}\}/g;
        if (bgRegex.test(content)) {
            content = content.replace(bgRegex, `style={{ backgroundImage: "url('/images/stadium_aerial_real.png')", backgroundSize: 'cover' }}`);
            modified = true;
        }

        // Replace Logo
        const logoRegex = /src="https:\/\/lh3\.googleusercontent\.com\/[^"]+"/g;
        if (logoRegex.test(content)) {
            // Replace remaining avatars
            content = content.replace(/<img([^>]*)src="https:\/\/lh3\.googleusercontent\.com\/[^"]+"([^>]*)>/g, (match, p1, p2) => {
                if (match.toLowerCase().includes('logo')) {
                    return `<img${p1}src="/images/logo.png"${p2}>`;
                }
                return `<img${p1}src="/images/control_room.png"${p2}>`;
            });
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated images in ${filePath}`);
        }
    });
}

processFiles();


