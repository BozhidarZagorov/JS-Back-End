import fs from 'fs';

// Synchronous file reading
const loremText = fs.readFileSync('./input.html', { encoding: 'utf-8' });
console.log(loremText);
console.log('File Readed');
