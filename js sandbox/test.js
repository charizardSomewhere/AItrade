console.log("Hello from Node!")


function test() {
    console.log("Hello from test!")
}

test()


a = 1
b = 2

console.log(a + b)


a1 = 3
b1 = 33


if (a1 == b1) {
    console.log("a is equal to b")
} else {
    console.log("a is not equal to b")
}

for (let i = 0; i < a1; i++) {
    console.log(i)
}


//   im going to put the arrays and stuff in the exact same file

const numbers = [1, 2, 3, 4, 89341.5];
const doubled = numbers.map(function (value) {
    return value * 2;
});

console.log(doubled)
console.log(numbers)


sliced = numbers.slice(2, 5)
console.log(sliced)

const numbers2 = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers2.filter(function (number) {
    return number % 2 === 0; // Returns true for even numbers
});

// Using an arrow function for a more concise syntax:
const evenNumbersArrow = numbers2.filter(number => number % 2 === 0);

console.log(evenNumbers);      // Output: [2, 4, 6]
console.log(evenNumbersArrow); // Output: [2, 4, 6]
console.log(numbers2);   