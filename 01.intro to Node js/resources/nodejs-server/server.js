import http from 'http';

const server = http.createServer((req, res) => {
    console.log('HTTP Request');

    // Get url from request
    const url = req.url;
    console.log(url);

    res.writeHead(200, {
        'content-type': 'text/html',
    });

    // primitive routing
    switch (url) {
        case '/':
            res.write('<h1>Hello World!</h1>');
            break;
        case '/cats':
            res.write('Cats page');
            break;
        default:
            res.write('Not Found');
            break;
    }

    res.end();
});

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');
