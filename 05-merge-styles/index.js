const path = require('path');
const fs = require('fs');

let stylesPath = path.join(__dirname, 'styles');
let bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function bundle() {
  await fs.promises.rm(bundlePath, { recursive: true, force: true });
  const writeStream = fs.createWriteStream(bundlePath);

  await fs.readdir(stylesPath, { withFileTypes: true }, (error, data) => {
    if (error) console.log('Error', error.message);

    for (let file of data) {
      let filePath = path.join(__dirname, 'styles', file.name);

      if (file.isFile() && path.extname(file.name) === '.css') {
        const bundle = [];
        let text = fs.createReadStream(filePath, 'utf-8');

        text.on('data', chunk => bundle.push(chunk));
        text.on('end', () => bundle.forEach(el => writeStream.write(`${el}\n`)));
      }
    }
  });
}
bundle();