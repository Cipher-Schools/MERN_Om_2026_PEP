const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.json());

let users = [];

app.post('/user', (req, res) => {
    const { firstName, lastName, email, password, dob } = req.body;

    if (!firstName || !lastName || !email || !password || !dob) {
        res.status(400).send('All fields are required');
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        res.status(400).send('User with this email already exists!');
        returnl;
    }

    const newUser = {
        userId: Date.now(),
        // firstName: firstName,
        firstName,
        lastName,
        email,
        password,
        dob
    }

    users.push(newUser);
    res.status(201).json(newUser);
})

app.get('/', (req, res) => {
    res.send('Response from Server');
    return;
})

app.get('/hello', (req, res) => {
    const user = {
        name: 'Tom', 
        age: 24
    }

    res.json(user);
    return;
})

app.get('/search', (req, res) => {
    const query = req.query;
    console.log(query);
    // console.log(req.query);
    // res.json(req.query);
    res.send('Query received');
    return;
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    console.log('User id =', userId);
    res.send(`Your userId is ${userId}`);
    return;
})

app.post('/test', (req, res) => {
    // const data = req.body;
    // const name = data.name;
    // const age = data.age;
    const { name, age } = req.body;
    console.log(`${name} is ${age} years old`);
    // console.log(data);
    res.send('Response from Server');
    return;
})

app.post('/greet', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.send('Name is required');
        return;
    }
    res.send(`Goodmorning ${name}`);
    return;

})

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})