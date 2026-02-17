const http = require('http');

const server = http.createServer((req, res) => {
    // res.end('Hello from Node.js server'); 

    if (req.url === '/' && req.method === 'GET') {

        const user = {
            name: 'Tom',
            age: 24
        }

        // res.end('This is Home Page');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));

    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.end('This is about Page')
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
})

server.listen(3000, () => {
    console.log('Server is running at port 3000');
})