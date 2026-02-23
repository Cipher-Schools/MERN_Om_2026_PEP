// const express = require('express');
import express from "express";

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${ PORT }`);
})

