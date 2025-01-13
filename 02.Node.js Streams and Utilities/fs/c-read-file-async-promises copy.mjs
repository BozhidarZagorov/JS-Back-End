import fs from 'fs/promises';

// Async file reading with promises (promise than syntax)
fs.readFile('./input.html', { encoding: 'utf-8' })
    .then(loremText => {
        console.log(loremText);
    })
    .catch(err => {
        console.log(err.message);
    });

console.log('File start reading');


