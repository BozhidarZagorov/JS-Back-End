import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'THATSMYSECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.send('It works');
});

// Using Cookies Manually
app.get('/set-cookie-manually', (req, res) => {
    // HTTP method
    // res.writeHead(200, {
    //     'Set-Cookie': 'username=Pesho'
    // });
    // res.end();


    // Express method
    res.setHeader('Set-Cookie', 'username=Gosho')
    res.end();
});

app.get('/get-cookie-manually', (req, res) => {
    const cookie = req.header('Cookie'); // Express method

    console.log(cookie);

    res.end();
});

// Using Cookie Parser Library
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'Stamat', {
        httpOnly: true,
    });
    res.end();
});

app.get('/get-cookie', (req, res) => {
    const cookieValue = req.cookies['username'];

    console.log(cookieValue);

    res.end();
});

// Express session demo
app.get('/set-session-data/:name', (req, res) => {
    req.session.name = req.params.name;
    req.session.age = 20;

    res.end();
});

app.get('/get-session-data', (req, res) => {
    console.log(req.session);
    res.send(req.session.name);
});

// Bcrypt Demo
app.get('/get-hash/:message', async (req, res) => {
    const message = req.params.message;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(message, salt);

    console.log(salt);
    console.log(hash);

    res.send(hash);
});

app.get('/check-hash/:message', async (req, res) => {
    const message = req.params.message;
    const savedHash = '$2b$10$uzABigxesgS4QbRNTzRhLODCY7b4zqxECKwGoGlYR4WY01GN6ZJzG'; // hello hash

    // The message should be the word hello
    const isValid = await bcrypt.compare(message, savedHash);

    res.send(isValid);
});

const secret = 'SOMESECRETHERE';
app.get('/generate-jwt/:message', (req, res) => {
    const message = req.params.message;

    const payload = {
        username: 'Pesho',
        age: 20,
        message,
    }

    const token = jwt.sign(payload, secret, { expiresIn: '2h' });

    res.send(token);
});

// Verify and decode token
app.get('/verify-jwt/:token', (req, res) => {
    const token = req.params.token;

    try {
        const decodedToken = jwt.verify(token, secret);
        console.log(decodedToken);
        res.send(decodedToken);
    } catch (err) {
        console.log(err.message);
        res.status(404).send('Invalid token');
    }
});

// Basic login system demo
const users = [];
app.get('/register', (req, res) => {
    res.send(`
    <form method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <div>
            <input type="submit" value="Register">
        </div>
    </form>
    `)
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // TODO: validate if user exists

    // Save user data
    users.push({
        username,
        password: hash,
    });

    console.log(users);
    

    // Redirect login
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <div>
            <input type="submit" value="Login">
        </div>
    </form>
    `)
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);

    // Check if user exists
    if (!user) {
        return res.send('Invalid user!');
    }

    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.send('Invalid password');
    }

    // Issue token when authenticated
    const token = jwt.sign({username}, secret, {expiresIn: '2h'});

    // Include token into a cookie
    res.cookie('auth', token);

    res.send('Valid password');
});

// Make an authorized request
app.get('/profile', async (req, res) => {
    const token = req.cookies['auth']; 

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decodedToken = jwt.verify(token, secret);

        res.send(`
            <h1>Profile Page | ${decodedToken.username}</h1>
        `)
    } catch(err){
        return res.status(401).send('Invalid Token');
    }
});

app.listen(5001, () => console.log('Server is listening on http://localhost:5001...'));
