const fs = require('fs');

fs.writeFileSync('hello.txt', 'Hello World - This is newly created file');

// const data = fs.readFileSync('hello.txt', 'utf-8');
// console.log(data);
// console.log('A');

// fs.readFile('hello.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log('Error', err);
//         return;
//     } else {
//         console.log(data);
//     }
// });
// console.log('A');

// fs.appendFileSync('hello.txt', 'This is next text');

// fs.appendFileSync('hello.txt', '\nThis is next line');

// fs.unlinkSync('hello.txt');

