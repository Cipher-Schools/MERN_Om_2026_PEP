
let count = 0;
const body = document.querySelector('body');
const p = document.querySelector('#counter');
const addButton = document.querySelector('#addBtn');
const subtractButton = document.querySelector('#subtractBtn');

addButton.addEventListener('click', () => {
    count += 1;
    p.innerText = `Count: ${count}`
})

addButton.addEventListener('mouseover', () => {
    addButton.style.background = 'green'
})
addButton.addEventListener('mouseout', () => {
    addButton.style.background = 'blue'
})

subtractButton.addEventListener('click', () => {
    count -= 1;
    p.innerText = `Count: ${count}`
})
subtractButton.addEventListener('mouseover', () => {
    subtractButton.style.background = 'green'
})
subtractButton.addEventListener('mouseout', () => {
    subtractButton.style.background = 'blue'
})


const p2 = document.createElement('p');
p2.innerText = 'Hello this is a paragraph';
body.append(p2);

const resetButton  = document.createElement('button');
resetButton.innerText = 'Reset';
body.append(resetButton);

resetButton.addEventListener('click', () => {
    count = 0
    p.innerText = `Count: ${count}`
})



