// --- TEMPLATE LITERALS basics ---

// Basic string and variables
const name = "Alice";
const age = 28;

// Old way with string concatenation (+):
const greetingOld = "Hello, my name is " + name + " and I am " + age + " years old.";
console.log("OLD WAY:", greetingOld);

// New way with Template Literals (use backticks ` ` instead of quotes):
// You insert variables using ${variableName}
const greetingNew = `Hello, my name is ${name} and I am ${age} years old.`;
console.log("NEW WAY:", greetingNew);

console.log("\n-------------------\n");

// --- MULTI-LINE STRINGS ---

// Old way (needed \n for line breaks):
const multiOld = "This is line 1.\n" +
    "This is line 2.\n" +
    "This is line 3.";
console.log("OLD MULTI-LINE:\n" + multiOld);

// New way with Template Literals (just press enter!):
const multiNew = `This is line 1.
This is line 2.
This is line 3.`;
console.log("\nNEW MULTI-LINE:\n" + multiNew);

console.log("\n-------------------\n");

// --- EXPRESSIONS INSIDE TEMPLATE LITERALS ---
// You can put ANY valid JavaScript inside the ${} block, not just variables!

const num1 = 10;
const num2 = 5;

// Math inside template literals:
console.log(`Ten plus five is: ${num1 + num2}`);

// Ternary operations inside template literals:
const isMember = true;
console.log(`The user is ${isMember ? "a VIP member" : "not a member"}.`);
