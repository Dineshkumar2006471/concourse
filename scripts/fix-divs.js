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

    // The wrapper we removed was right before <main> or wrapping <main>.
    // So the orphaned </div> is right before </> at the end of the file.
    // Let's replace `</main>\n</div>\n\n    </>` with `</main>\n\n    </>`
    content = content.replace(/<\/main>[\s\n]*<\/div>[\s\n]*<\/>/, '</main>\n\n    </>');

    // Some might have comments like {/* Footer */} before the </div>
    // Let's just use a regex to remove a </div> that is directly before </>
    content = content.replace(/<\/div>(\s*(?:\{[^\}]+\}\s*)?)<\/>/g, '$1</>');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed orphaned div in:', filePath);
    }
  }
});
