//  this -  this is a keyword that refers to the object that calls the function.
//       -> this is decided at runtime
//       -> this depends on how a function is called.
//       -> not where it is called


// const person1 = {
//     name: 'Tom',
//     age: 22
// }

// console.log(person1.name);
// console.log(person1.age);


// const person1 = {
//     name: 'Tom',
//     sayName: function () {
//         console.log(this.name);
//     }
// }

// const person2 = {
//     name: 'Jerry',
//     sayName: function () {
//         console.log(this.name);
//     }
// }

// person1.sayName();
// person2.sayName();


// function sayName() {
//     console.log(`My name is ${this.name}`);
// }

// const person1 = {
//     name: 'Tom',
//     sayName: sayName
// }

// const person2 = {
//     name: 'Jerry',
//     sayName: sayName
// }

// person1.sayName();
// person2.sayName();


// function hello() {
//     console.log(this.name);
// }

// hello();


// const user = {
//     name: 'John',
//     sayName() {
//         console.log(this.name);
//         setTimeout(function() {
//             console.log(this.name);
//         }, 1000)
//     }
// }

// user.sayName();


// const user = {
//     name: 'John',
//     sayName() {
//         setTimeout(() => {
//             console.log(this.name);
//         }, 1000)
//     }
// }
// user.sayName();


// setTimeout(() => {
//     console.log('Hello')
// }, 5000);

// setInterval(() => {
//     console.log('Hi')
// }, 5000)


function first(callback) {
    console.log('This is first')
    callback();
  }
  
  function second(callback) {
    console.log('This is second')
    callback();
  }
  
  function third(callback) {
    console.log('This is third')
    callback();
  }
  
  function fourth(callback) {
    console.log("Deep nesting 😵");
    // callback();
  }
first(function () {
    second(function () {
      third(function () {
        fourth();
      });
    });
  });
  
    
