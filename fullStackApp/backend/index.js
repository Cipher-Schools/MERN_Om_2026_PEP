// const express = require('express');
import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import stockRoutes from './routes/stockRoutes.js'

dotenv.config();
connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/transactions', transactionRoutes);
app.use('/api/stocks', stockRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello world');
// })

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${ PORT }`);
})

