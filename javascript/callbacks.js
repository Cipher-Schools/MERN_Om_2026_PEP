

// function hello() {
//     console.log('Hello');
// }

// const x = hello;
// x();

// function greet(name) {
//     console.log(`Hello ${name}`)
// }

// // greet('Jerry');

// function user(cb) {
//     const userName = 'Tom';
//     cb(userName);
// }

// user(greet);


// console.log('A');
// console.log('B');
// console.log('C');


// console.log('Start');
// setTimeout(() => {
//     console.log('Task Done')
// }, 1000);
// console.log('End');


// function printData(data) {
//     console.log(data);
// }

// function getData(callback) {
//     setTimeout(() => {
//         callback('Server data')
//     }, 4000);
// }

// getData(printData);


function first(callback) {
    console.log('This is first');
    callback();
}

function second(callback) {
    console.log('This is second');
    callback();
}

function third(callback) {
    console.log('This is third');
    callback();
}

function fourth(callback) {
    console.log('This is fourth');
    callback();
}

function final(callback) {
    console.log('This is final');
    callback()
}

first(function() {
    console.log('something')
    second( function() {
        console.log('something')
        third( function() {
            console.log('something')
            fourth( function() {
                console.log('something')
                final(function() {
                    console.log('This is Callback Hell');
                })
            })
        })
    })
})

