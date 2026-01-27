console.log('JavaSrcipt is connected');

let num1 = 5;
let num2 = 10;

//  condition in js
if (num1 < num2) {
    console.log(`${num1} is smaller than ${num2}`)
} else {
    console.log(`${num1} is greater than ${num2}`)
}


// for loop in js
for (let i=0; i<num1; i++) {
    console.log(i);
}

let arr1 = [2, 4, 6, 8]
console.log(arr1);

// push new entry at the end
arr1.push(10);
console.log(arr1);

// pop one element from end
arr1.pop();
console.log(arr1);

// remove first element from array
arr1.shift();
console.log(arr1);

// add new entry in the beginning 
arr1.unshift(5);
console.log(arr1);


// Object in JavaScript  - Object stores data as key-value pairs
const student = {
    name: 'Ram',
    age: 25,
    marks: 80
}

console.log(`Name: ${student.name}, Age: ${student.age}, Marks: ${student.marks}`);

const students = [
    { Name: 'Ram', Age: 25, Marks: 80 },
    { Name: 'Mohan', Age: 24, Marks: 82},
    { Name: 'Radha', Age: 23, Marks: 85},
    { Name: 'Sita', Age: 24, Marks: 81}
]

// print data from students using for loop.
for (let i=0; i<students.length; i++) {
    console.log(`Name: ${students[i].Name}, Age: ${students[i].Age}, Marks: ${students[i].Marks} `)
}