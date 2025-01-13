import fs from 'fs/promises';

// Read directory files
console.log(await fs.readdir('.'));

// Create new directory
// await fs.mkdir('./test-dir');

// Remove dir
// await fs.rmdir('./test-dir');

// Rename dir or file
// await fs.rename('./test-dir2', './test-dir');

// Remove file
// await fs.unlink('./some-file.txt');
