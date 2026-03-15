





const greet = name => { console.log(`Hello, ${name}!`); };

const sum = (a, b) => a + b; // Implicitly returns a + b
console.log(sum(2, 3));

const sayHello = () => console.log('Hello!');
sayHello();

const getObject = () => ({ key: 'value' });
console.log(getObject());


greet("雑魚")















// --- MORE ABOUT ARROW FUNCTIONS ---

// 1. Lexical 'this' binding
// Arrow functions don't have their own 'this'. They inherit it from where they were defined.
const obj = {
  name: 'Bob',
  regularFunc: function () {
    setTimeout(function () {
      console.log('Regular function this.name:', this.name); // Prints undefined
    }, 100);
  },
  arrowFunc: function () {
    setTimeout(() => {
      console.log('Arrow function this.name:', this.name); // Prints 'Bob'
    }, 100);
  }
};
obj.regularFunc();
obj.arrowFunc();

// 2. No 'arguments' object
// Regular functions have a hidden 'arguments' object. Arrow functions don't. 
// Use rest parameters (...args) instead!
const countArgs = (...args) => {
  console.log(`You passed ${args.length} arguments`);
};
countArgs(1, 'two', [3]);

// 3. Arrow functions cannot be used as constructors
// You cannot use the 'new' keyword with them.
const Animal = () => { };
// const dog = new Animal(); // This would throw an error: Animal is not a constructor