const path = require('path');
const fs = require('fs');
const readline = require('readline');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
console.log('Enter text:');

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readLine.on('line', input => {
  if (input === 'exit') {
    readLine.close();
  }
  stream.write(input + '\n');
});

readLine.on('close', function() {
  console.log('Have a nice day!');
  process.exit(0);
});