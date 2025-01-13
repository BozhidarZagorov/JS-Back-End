// default import
import calculator from "./calculator.js";

// named imports
import { subtract, multiply } from './calculator.js';

// import third party module
import { func } from 'calculator'

// import core module
import url from 'url';
import querystring from 'querystring';

const sum = calculator.add(5, 1);
console.log(sum);

const difference = subtract(5, 1);
console.log(difference);

// using third party module
const f = func('f(x) = x*10 - 20');
console.log(f(10));

// using core modules url legacy
const urlString = 'https://en.wikipedia.org/wiki/Node.js?filterBy=date&orderBy=username#Event_loop';
const parsedUrl = url.parse(urlString);
console.log(parsedUrl);

// using url (non legacy)
const parsedUrl2 = new URL(urlString);
console.log(parsedUrl2);

// using querystring
const qs = querystring.parse(parsedUrl2.search);
console.log(qs);
