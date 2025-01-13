const calculator = require('./calculator');
const { subtract, add } = require('./calculator');

const sum = calculator.add(1, 5);

console.log(sum);

const difference = calculator.subtract(5, 1);
console.log(difference);


