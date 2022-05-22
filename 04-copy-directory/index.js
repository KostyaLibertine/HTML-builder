const path = require('path');
const fs = require('fs');

const filesPath = path.join(__dirname, 'files');
const filesPathCopy = path.join(__dirname, 'files-copy');

async function copyDir(filesPath, filesPathCopy) {
  await fs.promises.rm(filesPathCopy, { recursive: true, force: true });
  await fs.promises.mkdir(filesPathCopy, { recursive: true });

  const originalFiles = await fs.promises.readdir(filesPath);

  originalFiles.forEach(file => {
    let filePath = path.join(filesPath, file);
    let filePathCopy = path.join(filesPathCopy, file);

    fs.promises.copyFile(filePath, filePathCopy);
  });
}

copyDir(filesPath, filesPathCopy);