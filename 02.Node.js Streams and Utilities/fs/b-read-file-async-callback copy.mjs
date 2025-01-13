import fs from 'fs';

// Async file reading with callback
fs.readFile('./input.html', { encoding: 'utf-8' }, (err, loremText) => {
    if (err) {
        return console.error(err.message);
    }

    console.log(loremText);
});

console.log('File start reading');
