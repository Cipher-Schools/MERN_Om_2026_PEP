//  Methods on Array.
let arr = [ 2, 5, 4, 8, 9, 6]

// forEach
arr.forEach((el) => console.log(el));

// map
console.log(arr.map((el) => el*2));   // double values
console.log(arr.map((el) => el*el));  // square values

// filter
console.log(arr.filter((el) => el % 2 === 0));

// reduce
console.log(arr.reduce((sum, n) => sum+n, 0));

console.log(arr.reduce((prod, n) => prod * n, 1));


// find and findIndex
console.log(arr.find((el) => el > 4));

console.log(arr.findIndex((el) => el > 4));


console.log(arr.includes(8));
console.log(arr.includes(7));

console.log(arr.indexOf(8));

console.log(arr.reverse());

let arr1 = [1, 5, 7]
console.log(arr1.concat([2, 4, 6]));

let stringArray = [ 'a', 'b', 'c', 'd']
let newStr = stringArray.join('');
console.log(newStr);

const array1 = (Array.from('abchvdhbd'));

console.log(Array.isArray(array1));



let numArray = [1, 3, 6, 8, 9]

// slice
console.log(numArray.slice(1,4));
console.log(numArray);

// splice
numArray.splice(1,2, 5, 7, 8, 9, 0, 4);
console.log(numArray);



const a = [2, 4, 6, 8]
const c = [ 1, 2, 3]

const b = [...a, 0, 3, ...c]

console.log(b)


