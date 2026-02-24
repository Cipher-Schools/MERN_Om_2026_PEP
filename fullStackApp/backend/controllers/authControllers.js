import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
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
        password: hashedPwd,
        role: 'user'
    }

    try {
        await User.create(userData);
        res.status(201).json({ message: 'New user created successfully'});
        return;
    } catch (err) {
        console.log('Error: ',err);
    }

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password) {
        res.status(401).json({ message: "Both Email and Password are required" });
        return;
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        res.status(400).json({ message: 'Invalid Credentials'});
        return;
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    const userData = {
        firstName: user.firstName,
        email: user.email,
        role: user.role
    }

    res.status(200).json({ message: 'Logged in successfully', token, userData });
    return;

}