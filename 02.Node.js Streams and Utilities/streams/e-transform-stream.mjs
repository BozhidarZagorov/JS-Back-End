import fs from 'fs';
import zlib from 'zlib';

const readStream = fs.createReadStream('./input.html', { encoding: 'utf-8', highWaterMark: 1000 });
const writeStream = fs.createWriteStream('./transform-output.txt', { encoding: 'utf-8' });

const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

