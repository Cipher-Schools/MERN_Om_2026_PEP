const body = document.querySelector('body');

// body.style.backgroundColor = 'red';
// body.style.backgroundColor = 'orange';

// setTimeout(() => {
//     body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         body.style.backgroundColor = 'orange';
//         setTimeout(() => {
//             body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 body.style.backgroundColor = 'green';
//                 setTimeout(() => {
//                     body.style.backgroundColor = 'blue';
        //             setTimeout(() => {
        //                 body.style.backgroundColor = 'indigo';
        //                 setTimeout(() => {
        //                     body.style.backgroundColor = 'violet';
        //                 }, 1000)
        //             }, 1000)
        //         }, 1000)
        //     }, 1000)
        // }, 1000)
//     }, 1000)
// }, 1000)



// using callbacks - callback hell
// function changeColor(newColor, delay, next) {
//     setTimeout(() => {
//         body.style.backgroundColor = newColor;
//         next && next();
//     }, delay)
// }

// changeColor('red', 1000, () => {
//     changeColor('orange', 1000, () => {
//         changeColor('yellow', 1000, () => {
//             changeColor('green', 1000, () => {
//                 changeColor('blue', 1000, () => {
//                     changeColor('indigo', 1000, () => {
//                         changeColor('violet',1000)
//                     })
//                 })
//             })
//         })
//     })
// })


//  using promises
function changeColorPromise(newColor, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            body.style.backgroundColor = newColor;
            resolve();
        }, delay)
    })
}

changeColorPromise('red', 1000)
.then(() => changeColorPromise('orange', 1000))
.then(() => changeColorPromise('yellow', 1000))

