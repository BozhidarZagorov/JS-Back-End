import { createWriteStream } from 'fs';

const writeStream = createWriteStream('./output.txt', { encoding: 'utf-8', flags: 'a' });

writeStream.write('Lorem ipsum dolor sit amet consectetur, ');
writeStream.write('adipisicing elit.');
writeStream.write('\n');

writeStream.end();
