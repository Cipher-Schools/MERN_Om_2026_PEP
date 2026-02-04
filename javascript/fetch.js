//  fetch - 


//using promise
// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })


// using async/await 

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
}

fetchData();
