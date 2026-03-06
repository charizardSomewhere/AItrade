# CSS Grid Basics

Open **`sandbox/css-grid-playground.html`** in your browser to see what this code does. Open it in your editor to change things.

Here's exactly how it works:

### 1. Make it a Grid
```css
display: grid;
```
This turns the wrapper (`.container`) into a grid layout.

### 2. Define Columns
```css
grid-template-columns: 1fr 1fr 1fr;
```
This makes exactly **3 columns**. 
- `1fr` means "1 fraction" of the free space. 
- Try changing it to `1fr 2fr 1fr` and watch the middle column grow twice as big!

### 3. Add Spacing
```css
gap: 10px;
```
This puts 10 pixels of empty space between every item. No margins needed.

### 4. Span Across Columns
```css
grid-column: 1 / -1;
```
This tells an item (like `.header`) to stretch from the very first line (`1`) to the very last line (`-1`). It takes up the whole row.

### Try this in the file:
- Change `1fr 1fr 1fr` to `200px 1fr 200px`.
- Turn `.sidebar` into a tall column by adding: `grid-row: 2 / span 2;`
