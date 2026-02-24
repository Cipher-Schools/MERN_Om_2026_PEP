import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        res.status(409).json({ message: 'User with this email already exists' });
        return;
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const userData = {
        firstName,
        lastName,
        email,
        password: hashedPwd
    }

    try {
        const newUser = await User.create(userData);
        res.status(201).json({ message: 'New user created successfully'})
    } catch (err) {
        console.log('Error: ',err);
    }

})

export default router;

