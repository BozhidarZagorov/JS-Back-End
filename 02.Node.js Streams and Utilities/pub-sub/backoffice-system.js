import http from 'http';

import messageBroker from './message-broker.js';
import './audit-system.js';
import './reporting-service.js';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Home page');
    } else if (req.url === '/create-user') {
        // TODO: actual user creation

        messageBroker.publish('userCreated', 'Pesho');

        res.write('User created');
    } else if (req.url === '/delete-user') {
        messageBroker.publish('userDeleted', 'Ivan');
    } else {
        res.write('Not Found');
    }

    res.end();
});


server.listen(5000);
console.log('Server is listening on http://localhost:5000...');
