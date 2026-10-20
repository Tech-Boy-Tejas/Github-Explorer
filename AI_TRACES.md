# AI Traces

AI used: Claude (Anthropic). The app logic (search, API calls, sorting, health score, rate-limit counter, bookmarks and pinned profiles) was written by me. AI helped in the areas below.

## UI/UX design and styling
- Designed the whole look of the app: the Brutalist theme (bold black borders, hard shadows, yellow and pink accents, Archivo Black and Space Grotesk fonts), offered alongside five other theme options I chose from
- Wrote all the CSS in `src/App.css` and `src/index.css`, including the responsive layout (two columns on desktop, stacked cards on phones)
- Added the page layout markup and class names in the JSX (top bar, hero heading, profile and repository cards, score badges) without changing my logic
- Removed the unused Bootstrap links from `index.html`
- Styled the bookmark button and the pinned profiles dropdown

## Concept explanations
- How to call the GitHub REST API with `fetch`, read status codes and the `x-ratelimit-remaining` header, and use an optional token from `.env.local`
- React state, props and lifting state up to `App`, and why `useEffect` wasn't needed for a button-triggered search
- Sorting with compare functions (`toSorted`, `toReversed`), comparing dates, and formatting them with `toLocaleDateString`
- Using `localStorage` with `JSON.stringify` / `JSON.parse`

## Debugging
- Errors along the way, such as JSX syntax mistakes, missing `key` props, the sort toggle, the rate-limit display and avatar loading errors
- The bookmark save/remove logic (fixing the empty count on first use and removing the right profile) and the logic for the pinned profiles dropdown

## Prompts (summary)
- "teach me how to use the GitHub REST API in JavaScript"
- "why is my code causing the console.log to run before I click the button?"
- "how to make authenticated requests to get higher limits"
- "how do I move data to another component?"
- "why is the toggle switch not working?"
- "help me add a proper UI and make it beautiful" / "give me more design templates"
- "help me fix this bookmark code" / "give me the logic for a pinned profiles dropdown"
