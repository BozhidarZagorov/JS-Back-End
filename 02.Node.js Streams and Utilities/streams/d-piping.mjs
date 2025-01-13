import fs from 'fs';

const readStream = fs.createReadStream('./input.html', { encoding: 'utf-8', highWaterMark: 1000 });
const writeStream = fs.createWriteStream('./input-copy.html', { encoding: 'utf-8' });

readStream.pipe(writeStream);
