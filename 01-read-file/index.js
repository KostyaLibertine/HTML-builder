const path = require('path');
const fs = require('fs');

const tempPath = path.join('01-read-file', 'text.txt');
const stream = fs.createReadStream(tempPath, 'utf8');
stream.on('data', (data) => console.log(data));