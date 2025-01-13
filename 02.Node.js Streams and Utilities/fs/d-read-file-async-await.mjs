import fs from 'fs/promises';

// Async file reading with promises (async/await syntax)
try {
    const loremText = await fs.readFile('./input.html', { encoding: 'utf-8' })
    
    console.log(loremText);
} catch(err) {
    console.log(err.message);
}

console.log('File finish reading');


