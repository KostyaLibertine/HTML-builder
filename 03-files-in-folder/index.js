const path = require('path');
const fs = require('fs/promises');

const dir = path.join(__dirname, 'secret-folder');

async function consoleFiles() {
  try {
    const files = await fs.readdir(dir, {withFileTypes: true});
    for (let file of files) {
      const data = await fs.stat(path.join(dir, file.name));
      if (data.isFile()) {
        const name = `${file.name.slice(0, file.name.lastIndexOf('.'))} -`;
        const ext = `${file.name.slice(file.name.lastIndexOf('.') + 1)} -`;
        const size = `${data.size / 1000}kb`;
        console.log(name, ext, size);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

consoleFiles();