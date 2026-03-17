# Learning Roadmap: Build a Frontend Like AItrade from Scratch

## Phase 0: Prerequisites (1–2 days)
- **Install Node.js** — download from [nodejs.org](https://nodejs.org). This gives you `node` and `npm` (the package manager).
- **Pick a code editor** — VS Code or Cursor.
- **Learn the terminal basics** — `cd`, `ls`, `mkdir`, running commands. You'll use it constantly.

---

## Phase 1: HTML & CSS (1 week)
Before any framework, understand the raw web.

1. Create a plain `.html` file, open it in a browser
2. Learn the box model — `div`, `padding`, `margin`, `border`
3. Learn **Flexbox** — this is how 90% of layouts work (`display: flex`, `justify-content`, `align-items`)
4. Learn **CSS Grid** — for the 3-column scoreboard layout
5. Try to recreate a single card (like the SignalBadge) with just HTML + CSS

**Free resource:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn) — the gold standard.

---

## Phase 2: JavaScript Basics (1–2 weeks)
You need JS before React.

1. Variables, functions, if/else, loops
2. **Arrays** — `.map()`, `.filter()`, `.slice()` — React uses these *constantly*
3. **Objects** — `{ key: value }` — all your data will be shaped like this
4. **Arrow functions** — `(x) => x * 2` — React components use these everywhere
5. **Destructuring** — `const { name, price } = ticker` — you'll see this in every component
6. **Template literals** — `` `$${price.toFixed(2)}` `` — for building strings

**Free resource:** [javascript.info](https://javascript.info) — chapters 1–5 are enough to start.

### 🛠️ Phase 2 Project: Terminal Stock Ticker Simulator
To lock in your JS skills, try building a small node script (`ticker.js`) that simulates stock prices changing!

**The Goal:**
Create an array of "stock" objects, and repeatedly print out their updated prices every few seconds.

**Steps to build it:**
1. Create an array of objects: `const portfolio = [{ ticker: "AAPL", price: 150.00 }, { ticker: "TSLA", price: 200.00 }]`
2. Write a function named `updatePrices(stocks)` that uses `.map()` to go through your array and randomly increase or decrease the `price` of each stock by a few percent.
3. Write a function named `printStockBoard(stocks)` that loops through the array and uses **Template Literals** to nicely format the output (e.g., `[AAPL] $152.34`).
4. Use `setInterval()` to automatically run both of those functions every 2 seconds.
5. Run your file in the terminal using `node ticker.js` and watch your "arena" run!

*Hint: You'll heavily use objects, arrays, arrow functions, and template literals for this!*

---

## Phase 3: React Fundamentals (2–3 weeks)
This is the core skill. The entire AItrade frontend is React.

1. **What is a component?** — a function that returns JSX (HTML-like syntax)
2. **Props** — how a parent passes data to a child (like `<Scoreboard ticker="NVDA" />`)
3. **`useState`** — the #1 hook. Makes things interactive (which tab is active, what ticker is selected)
4. **`useEffect`** — runs code when the component mounts or data changes (used in TickerSearch for click-outside)
5. **`useRef`** — a reference to a DOM element (used in TickerSearch)
6. **Conditional rendering** — `{isOpen && <Dropdown />}` or ternary `{x ? <A/> : <B/>}`
7. **Lists & `.map()`** — rendering arrays of data as UI elements

**Free resource:** [react.dev](https://react.dev/learn) — the official tutorial is excellent and recently rewritten.

---

## Phase 4: Next.js (1 week)
Next.js is the framework that wraps React. It gives you routing, server rendering, etc.

1. **Create a project** — `npx create-next-app@latest`
2. Understand the `app/` folder — `layout.tsx` wraps pages, `page.tsx` is a route
3. Learn `'use client'` — marks components that need browser interactivity
4. Learn file-based routing — `app/dashboard/page.tsx` → `/dashboard` URL

**Free resource:** [nextjs.org/learn](https://nextjs.org/learn)

---

## Phase 5: Styling with Tailwind CSS (a few days)
This project uses Tailwind — utility CSS classes like `bg-[#0d0d14] text-sm font-bold`.

1. Install it with Next.js (the setup wizard asks you)
2. Learn the pattern: instead of writing CSS files, you add classes directly — `className="flex items-center gap-2 px-4 py-2"`
3. Use the [Tailwind docs](https://tailwindcss.com/docs) as a lookup reference — you don't memorize it, you search it

---

## Phase 6: Build Your First Chart (a few days)
The AItrade app uses **Recharts** for charts.

1. Install it — `npm install recharts`
2. Start with a basic `<LineChart>` with hardcoded data
3. Add axes, tooltips, multiple lines
4. Learn `<ResponsiveContainer>` to make charts resize

**Free resource:** [recharts.org](https://recharts.org/en-US/) — the examples page is the best way to learn.

---

## Phase 7: Recreate AItrade Yourself 🏗️
Now put it all together:

1. **Start with mock data** — create a `mockData.ts` with fake tickers, news, etc.
2. **Build one component at a time** — start with `Scoreboard`, then `NewsPanel`, then the chart
3. **Wire them together in `page.tsx`** — compose your components
4. **Add interactivity** — ticker search, tab switching, settings modal
5. **Polish** — dark theme colors, animations, hover effects

---

## 🧭 Total Timeline

| Phase | Topic | Approx. Time |
|---|---|---|
| 0 | Setup | 1–2 days |
| 1 | HTML & CSS | 1 week |
| 2 | JavaScript | 1–2 weeks |
| 3 | React | 2–3 weeks |
| 4 | Next.js | 1 week |
| 5 | Tailwind | 2–3 days |
| 6 | Recharts | 2–3 days |
| 7 | Build it! | 1–2 weeks |

**Roughly 6–8 weeks** if you're learning part-time. Faster if you can go full-time.

---

## 💡 One Tip

**Don't try to learn everything before building.** Get through Phase 3 (React basics), then start building ugly things. Come back to the tutorials when you get stuck. The AItrade codebase will start making perfect sense once you know `useState`, `.map()`, and props.
