// ============================================
// DESTRUCTURING — pulling values out of objects & arrays
// ============================================
// Instead of accessing properties one-by-one with dot notation,
// destructuring lets you unpack them into variables in one line.


// -----------------------------------------------
// 1. OBJECT DESTRUCTURING — the basics
// -----------------------------------------------

const ticker = {
  symbol: "NVDA",
  price: 142.50,
  change: 3.25,
  sector: "Technology",
};

// The old way (dot notation):
const symbolOld = ticker.symbol;
const priceOld = ticker.price;
console.log("Old way:", symbolOld, priceOld);

// The new way (destructuring):
// The variable names must match the property names in the object.
const { symbol, price, change, sector } = ticker;
console.log("Destructured:", symbol, price, change, sector);


// -----------------------------------------------
// 2. GRAB ONLY WHAT YOU NEED
// -----------------------------------------------
// You don't have to take everything — just pick the ones you want.

const news = {
  headline: "Fed holds rates steady",
  source: "Reuters",
  timestamp: "2026-03-14T10:00:00Z",
  category: "macro",
};

const { headline, source } = news;
console.log("Headline:", headline);   // "Fed holds rates steady"
console.log("Source:", source);         // "Reuters"
// timestamp and category are ignored — that's fine!


// -----------------------------------------------
// 3. RENAMING VARIABLES
// -----------------------------------------------
// What if the property name clashes with a variable you already have?
// Use a colon to rename it.

const stock = {
  symbol: "AAPL",
  price: 215.00,
};

// We already have `symbol` and `price` from section 1,
// so let's rename these to avoid a conflict:
const { symbol: stockSymbol, price: stockPrice } = stock;
console.log("Renamed:", stockSymbol, stockPrice);  // "AAPL" 215


// -----------------------------------------------
// 4. DEFAULT VALUES
// -----------------------------------------------
// If a property might be missing, you can set a fallback.

const partialTicker = {
  symbol: "TSLA",
  price: 178.30,
  // no 'change' property!
};

const { symbol: tslaSymbol, price: tslaPrice, change: tslaChange = 0 } = partialTicker;
console.log("TSLA change:", tslaChange);  // 0 (the default, since it was missing)


// -----------------------------------------------
// 5. ARRAY DESTRUCTURING
// -----------------------------------------------
// Works with arrays too — position matters instead of name.

const topThree = ["NVDA", "AAPL", "MSFT"];

const [first, second, third] = topThree;
console.log("Top 3:", first, second, third);

// Skip items with empty commas:
const [winner, , runnerUp] = ["NVDA", "AAPL", "MSFT"];
console.log("Winner:", winner, "| Runner-up:", runnerUp);  // NVDA, MSFT


// -----------------------------------------------
// 6. DESTRUCTURING IN FUNCTION PARAMETERS
// -----------------------------------------------
// Super common in React — a function receives an object and
// destructures it right in the parameter list.

function formatTicker({ symbol, price, change }) {
  const direction = change >= 0 ? "▲" : "▼";
  console.log(symbol + "  $" + price.toFixed(2) + "  " + direction + " " + Math.abs(change).toFixed(2));
}

formatTicker({ symbol: "GOOG", price: 174.50, change: -1.20 });
// prints:  GOOG  $174.50  ▼ 1.20

formatTicker({ symbol: "AMZN", price: 203.80, change: 5.60 });
// prints:  AMZN  $203.80  ▲ 5.60


// -----------------------------------------------
// 7. NESTED DESTRUCTURING
// -----------------------------------------------
// When objects contain other objects, you can go deeper.

const portfolio = {
  owner: "Chris",
  holdings: {
    cash: 10000,
    stocks: 3,
  },
};

const { owner, holdings: { cash, stocks } } = portfolio;
console.log(owner + " has $" + cash + " cash and " + stocks + " stocks");


// -----------------------------------------------
// 8. REAL-WORLD COMBO — destructuring + .map()
// -----------------------------------------------
// This is the pattern you'll see everywhere in React:
// take an array of objects, destructure each one, do something with it.

const watchlist = [
  { symbol: "NVDA", price: 142.50, change: 3.25 },
  { symbol: "AAPL", price: 215.00, change: -0.80 },
  { symbol: "TSLA", price: 178.30, change: 7.10 },
];

watchlist.map(function ({ symbol, price, change }) {
  const arrow = change >= 0 ? "▲" : "▼";
  console.log(symbol + "  $" + price.toFixed(2) + "  " + arrow + Math.abs(change).toFixed(2));
});
// NVDA  $142.50  ▲3.25
// AAPL  $215.00  ▼0.80
// TSLA  $178.30  ▲7.10
