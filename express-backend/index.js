const express = require('express');
const cors = require('cors');
// const checkUserExists = require('./middleware/checkUserExists');
const PORT = 3000;
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// let users = [];

app.post('/user', async (req, res) => {
    const { firstName, lastName, email, password, dob } = req.body;

    if (!firstName || !lastName || !email || !password || !dob) {
        res.status(400).send('All fields are required');
    }

    // const existingUser = users.find(u => u.email === email);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400).send('User with this email already exists!');
        return;
    }

    const newUser = {
        // firstName: firstName,
        firstName,
        lastName,
        email,
        password,
        dob
    }

    // users.push(newUser);
    const user = await User.create(newUser);
    res.status(201).json({ message: "New user added successfully", user });
    return;
})

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({ message: 'Here is all users data', users});
    return;
})

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    // const user = users.find(u => u.userId === id);
    // if(!user) {
    //     res.status(404).json({ message: 'User not found'});
    //     return;
    // } 
    

    // const user = req.user;
    const user = await User.findById(id);
    res.json(user);
    return;
})

//  Strict PUT 
app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password, dob } = req.body;
    if (!firstName || !lastName || !email || !password || !dob) {
        res.status(400).send('All fields are required');
    }
    let user = users.find(u => u.userId === id);
    if (!user) {
        res.status(404).send('User Not Found');
        return;
    }

    user = {
        userId: id,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: password || user.password,
        dob: dob || user.dob
    }

    const index = users.findIndex(u => u.userId === id);
    users[index] = user;
    res.json(user); 
       
    
})

app.patch('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password, dob } = req.body;
    let user = users.find(u => u.userId === id);
    if (!user) {
        res.status(404).send('User Not Found');
        return;
    }

    user = {
        userId: id,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: password || user.password,
        dob: dob || user.dob
    }

    const index = users.findIndex(u => u.userId === id);
    users[index] = user;
    res.json(user); 
    return;
       
    
})

app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.userId === id);
    if(!index) {
        res.status(404).send('The user you are trying to delete, does not exist');
        return;
    }
    users.splice(index, 1);
    res.send('User deleted successfully');
    return;
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

// app.get('/user/:id', (req, res) => {
//     const userId = req.params.id;
//     console.log('User id =', userId);
//     res.send(`Your userId is ${userId}`);
//     return;
// })

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

// module.exports = { users };