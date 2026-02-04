
// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Hello');
//         // resolve('Promise resolved')
//         reject('Promise is rejected')
//     }, 2000)
// })

// // p.then(data => console.log(data));
// p.catch(err => console.log(err));



// async function test() {
//     return 'Hello'
// }

// console.log(test());


const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done')
    }, 2000)
})

async function getData() {
    const data = await p;
    console.log('Before Data');
    console.log(data);
    console.log('After Data')
}

getData();