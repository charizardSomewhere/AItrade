# Flexbox: Step-by-Step Exercises

Open `sandbox/flexbox.html` in your browser (just double-click it). You'll see 3 colored boxes stacked vertically. All exercises are done by editing the `.container` CSS rule in that file — look for the comment that says `ADD YOUR FLEXBOX PROPERTIES BELOW THIS LINE`.

**Save the file → refresh the browser** after each change to see the result.

---

## Exercise 1: Turn on Flexbox

Add this one line inside `.container`:
```css
display: flex;
```

**What happened?** The boxes jumped from vertical stacking to a **horizontal row**. That's the #1 thing Flexbox does — it lays children out in a line.

> 💡 **Key concept:** `display: flex` makes the element a "flex container" and its children become "flex items."

---

## Exercise 2: Change Direction

Keep `display: flex` and add:
```css
flex-direction: column;
```

The boxes go back to vertical. Now try these values one at a time:
- `row` (default — horizontal, left to right)
- `row-reverse` (horizontal, right to left)
- `column` (vertical, top to bottom)
- `column-reverse` (vertical, bottom to top)

**Set it back to `row` before moving on.**

---

## Exercise 3: Justify Content (main axis alignment)

With `display: flex` and `flex-direction: row`, add:
```css
justify-content: center;
```

The boxes are now **centered horizontally**. Try each of these values:

| Value | What it does |
|---|---|
| `flex-start` | Pack items to the start (default) |
| `flex-end` | Pack items to the end |
| `center` | Center items |
| `space-between` | Equal space between items, none at edges |
| `space-around` | Equal space around each item |
| `space-evenly` | Perfectly equal gaps everywhere |

**Try all 6.** `space-between` and `center` are the ones you'll use most.

> 💡 **Key concept:** `justify-content` controls alignment along the **main axis** (horizontal when `flex-direction: row`).

---

## Exercise 4: Align Items (cross axis alignment)

Keep everything from before. Now add:
```css
align-items: center;
```

Nothing obvious changed because all boxes are the same height. To see it in action, temporarily make one box taller — add this to your `<style>`:
```css
.box-b { padding: 60px 32px; }
```

Now try these `align-items` values:

| Value | What it does |
|---|---|
| `stretch` | Items stretch to fill the container height (default) |
| `flex-start` | Align to the top |
| `flex-end` | Align to the bottom |
| `center` | Center vertically |

> 💡 **Key concept:** `align-items` controls alignment along the **cross axis** (vertical when `flex-direction: row`).

**Remove the `.box-b` override when done.**

---

## Exercise 5: The Centering Trick 🎯

This is the most famous Flexbox trick. Set `.container` to:
```css
display: flex;
justify-content: center;
align-items: center;
```

**Boom** — everything is perfectly centered both horizontally and vertically. This solves a problem that was miserable in CSS for 20 years.

---

## Exercise 6: Gap

Add a gap between items:
```css
gap: 16px;
```

Try `gap: 8px`, `gap: 32px`, `gap: 0`. This is cleaner than using margins on each item.

> 💡 **Key concept:** `gap` adds spacing **between** flex items without affecting the edges.

---

## Exercise 7: Flex Grow

Now let's control how items **share space**. Remove `justify-content` and add this rule (outside `.container`, as a new rule):
```css
.box-b {
    flex-grow: 1;
}
```

Box B now stretches to fill all remaining space! Try setting all boxes:
```css
.box { flex-grow: 1; }
```

Now all three share the space equally. Try giving them different values:
```css
.box-a { flex-grow: 1; }
.box-b { flex-grow: 2; }
.box-c { flex-grow: 1; }
```

Box B gets **twice** as much of the available space.

> 💡 **Key concept:** `flex-grow` controls how items expand to fill leftover space. The number is a ratio, not an absolute size.

---

## Exercise 8: Flex Wrap

Add more boxes to your HTML (copy-paste a few more `<div class="box box-a">D</div>`, etc.) so you have 6–8 boxes. They'll squish together.

Now add to `.container`:
```css
flex-wrap: wrap;
```

Items that don't fit now **wrap to the next line**, like text wrapping in a paragraph.

---

## Exercise 9: Build a Real Layout

Now try to build this layout using only Flexbox:

```
┌──────────────────────────────────┐
│           HEADER (nav bar)       │
├────────┬────────────────┬────────┤
│        │                │        │
│ SIDE   │   MAIN AREA    │ SIDE   │
│ BAR    │                │ BAR    │
│        │                │        │
├────────┴────────────────┴────────┤
│           FOOTER                 │
└──────────────────────────────────┘
```

**Hints:**
- The outer container uses `flex-direction: column` (header, middle, footer stack vertically)
- The middle row is its own flex container with `flex-direction: row`
- The main area uses `flex-grow: 1` to take remaining space
- Sidebars have a fixed width, e.g. `width: 200px`

This is exactly how `page.tsx` in the AItrade project is structured!

---

## Cheat Sheet

```
Container properties:         Item properties:
─────────────────────         ─────────────────
display: flex                 flex-grow: 0
flex-direction: row|column    flex-shrink: 1
justify-content: center       flex-basis: auto
align-items: center           align-self: center
flex-wrap: wrap
gap: 16px
```

---

## ✅ You Know Flexbox When...

- [ ] You can center something horizontally + vertically
- [ ] You can make a horizontal nav bar with `space-between`
- [ ] You can make one item stretch to fill remaining space with `flex-grow`
- [ ] You can build the 3-column layout from Exercise 9
- [ ] You can look at AItrade's `page.tsx` and understand why every `flex` class is there
