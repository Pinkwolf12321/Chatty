// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { User, users } = require('./user');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = new User(username, password);
    users.push(user);
    req.session.user = user;
    res.status(201).send('User registered');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.status(200).send('User logged in');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('User logged out');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
