import express from "express";

const app = express();


app.get('/', (req, res) => {
    res.json({ message: "Hello from backend server"});
})

app.listen(3000, () => {
    console.log("App is running");
});


