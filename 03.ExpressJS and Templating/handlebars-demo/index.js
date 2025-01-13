import express from 'express';
import handlebars from 'express-handlebars';

import cats from './cats.js';

const app = express();

// Add handlebars enginge to express engines
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

// Set default engine
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', { cats });
});

app.get('/add-cat', (req, res) => {
    res.render('addCat');
});

app.get('/add-breed', (req, res) => {
    res.render('addBreed');
})

app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));
