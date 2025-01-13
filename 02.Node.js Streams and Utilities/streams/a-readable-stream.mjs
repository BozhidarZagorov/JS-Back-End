import { createReadStream } from 'fs';

const readStream = createReadStream('./input.html', { encoding: 'utf-8', highWaterMark: 1000 });

readStream.on('data', (chunk) => {
    console.log('-------------- CHUNK -----------------');

    console.log(chunk);
});

readStream.on('end', () => {
    console.log('Stream ended!!!!');
});
