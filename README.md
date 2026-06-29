# RecipeBox

RecipeBox is a quick meal finder. Type an ingredient like "chicken" or "tomato"
and it pulls up a grid of matching recipes. Click any card to see the full
picture, the category, and a link to the actual instructions.

## How to run

No build step or install needed. Open `index.html` in your browser.

If recipes don't load from the file directly, run a local server instead. The
Live Server extension in VS Code works. Or from the project folder in a terminal:

```bash
python3 -m http.server 8000
```

Then go to `http://localhost:8000`.

## How it works

The search box sends the ingredient to TheMealDB and gets back a list of matching
meals. Those render as cards in a CSS grid. Clicking a card makes a second
request for that recipe's full details and opens them in a modal. While things
load you see a status message. If there are no matches or the request fails you
get a message instead of a blank screen.

The code is split into three files. `js/api.js` handles the two fetches.
`js/ui.js` handles everything that touches the page. `js/app.js` wires up the
events.

## Data source

All recipe data and images come from [TheMealDB](https://www.themealdb.com), a
free open recipe API. No API key needed. Big thanks to them, the app leans on
their photos to look good.

## AI assistance

I used Claude while building this. It helped with the file structure, some
boilerplate for the fetch and render functions, and debugging the async flow and
modal. I made the scope and design decisions, reviewed everything, and can
explain how each part works. The choice to use TheMealDB and how the app is
organized are mine. I wanted to get more comfortable using AI tools since they
come up in day to day work.
