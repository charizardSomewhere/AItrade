// ==========================================
// JAVASCRIPT OBJECTS (Key: Value pairs)
// ==========================================

// 1. WHAT IS AN OBJECT?
// Unlike an Array (which is just a list of items like [1, 2, 3]),
// an Object is a collection of properties. Every property has a "key" (a name) 
// and a "value" (the actual data).

const stock = {
    ticker: "NVDA",           // key: "ticker", value: "NVDA"
    price: 850.20,            // key: "price",  value: 850.20
    isTech: true,             // key: "isTech", value: true
    signal: "BUY",
    confidence: 85
};

console.log("--- 1. Reading from Objects ---");
// 2. HOW TO READ DATA FROM AN OBJECT
// Option A: Dot Notation (The most common way)
console.log("Ticker:", stock.ticker);
console.log("Price: $" + stock.price);

// Option B: Bracket Notation (Useful if the key name has spaces, or is a variable)
console.log("Signal:", stock["signal"]);


console.log("\n--- 2. Updating Objects ---");
// 3. UPDATING AND ADDING NEW DATA
// Even though `stock` was declared with `const`, we can still change its insides! (We just can't reassign the whole `stock` variable).

// Changing an existing value:
stock.price = 875.50;
console.log("New Price:", stock.price);

// Adding a brand new key-value pair:
stock.ceo = "Jensen Huang";
console.log("CEO:", stock.ceo);


console.log("\n--- 3. Nested Objects ---");
// 4. NESTED OBJECTS
// Values can be anything! Strings, numbers, arrays, or even OTHER objects.

const advancedStock = {
    ticker: "AAPL",
    price: 170.15,
    metrics: {
        peRatio: 26.5,
        marketCap: "2.6T"
    },
    recentPrices: [168, 169, 170]
};

// To get the PE Ratio, you just chain the dots:
console.log("AAPL PE Ratio:", advancedStock.metrics.peRatio);
// To get the first recent price, you mix dot notation and array indexing:
console.log("First recent price:", advancedStock.recentPrices[0]);


console.log("\n--- 4. Array of Objects (Super Common in React!) ---");
// 5. ARRAYS OF OBJECTS
// This is exactly how your AItrade mock data works. It's a list (Array), but every item in the list is a mini database (Object).

const portfolio = [
    { ticker: "NVDA", shares: 10 },
    { ticker: "AAPL", shares: 5 },
    { ticker: "MSFT", shares: 2 }
];

// Let's loop through them!
for (let i = 0; i < portfolio.length; i++) {
    let currentStock = portfolio[i];
    console.log("I own", currentStock.shares, "shares of", currentStock.ticker);
}
