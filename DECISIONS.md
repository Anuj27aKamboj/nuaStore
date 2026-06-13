# DECISIONS.md

## State management: Context API + useReducer

I went with Context API and useReducer because it felt like the right fit for this scope. The cart has a handful of clear actions — add, remove, update quantity — and a reducer handles that cleanly without pulling in any library. I considered Zustand briefly since it has less boilerplate, but adding an external dependency for something this small felt unnecessary. If the cart logic grew significantly, I'd probably switch.

## Generating colours, sizes, and stock data

The Fake Store API doesn't return any variant data, so I had to make it up. I kept it simple — just a few fixed arrays and the product ID to pick from them using modulo. This way the same product always gets the same colour and size options, which matters because the selected variant lives in the URL and the page needs to be deep-linkable. Random data on each load would break that.

## What I'd do differently with more time

The thumbnails on the detail page all show the same image because the API only gives one per product — that's a dead end without a real image source. I'd also split the ProductDetail component into smaller pieces; right now it handles fetching, variant state, URL syncing, and rendering all in one file which is a bit much. And I'd add some loading skeletons on the listing page instead of just a plain "Loading..." text.
