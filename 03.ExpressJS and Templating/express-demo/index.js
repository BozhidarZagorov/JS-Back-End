import express from 'express';
import path from 'path';

const app = express();

// Config static middleware
app.use(express.static('public'));

// Application Middleware
app.use((req, res, next) => {
    console.log(req.url);

    next();
});

// Path middleware
app.use('/auth', (req, res, next) => {
    // TODO: Check if user is valid
    if (Math.random() < 0.5) {
        next(); // Valid :) 
    } else {
        res.status(401).send('Unauthorized!');
    }
});

// Route middleware
app.get('/users', (req, res, next) => {
    console.log('route middleware');
    next();
}, (req, res) => {
    res.send('<h1>Users Page</h1>');
});

app.get('/', (req, res) => {
    res.send('<h1>Hello from Express!</h1>');
});

app.get('/cats', (req, res) => {
    res.send('<h1>Cats Page</h1>')
});

app.get('/cats/:catId', (req, res) => {
    const catId = req.params.catId;

    res.send(`<h1>Cat Page | ${catId} </h1>`)
});

// Make browser to display download dialog
app.get('/download', (req, res) => {
    res.download('./public/cat.jpg');
});

app.get('/download2', (req, res) => {
    res.sendFile(path.resolve('./public/cat.jpg'));
});

app.get('/download3', (req, res) => {
    res.attachment('./public/cat.jpg');
    res.end();
});

app.get('/data', (req, res) => {
    res.json({
        name: 'Data',
        grades: [1, 2, 3, 4, 5],
    })
});

app.get('/redirect', (req, res) => {
    if (Math.random() < 0.5) {
        res.redirect('/');
    } else {
        res.redirect('/404')
    }
});

app.get('/auth/profile', (req, res) => {
    res.send('<h1>Profile Page</h1>')
});

app.all('*', (req, res) => {
    res.send('<h1>Not Fond Page!</h1>')
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
