# GitHub Explorer

Search any GitHub user to see their profile and top repositories. Built with React + Vite on the public [GitHub REST API](https://docs.github.com/en/rest).

Built for the ACM Web Dev induction (Project 1A: GitHub Profile & Repo Explorer).

**Live demo:** https://github-explorer-xi-blond.vercel.app/

## Features

### Done
- Search for a GitHub user by username, with the Search button or the Enter key
- Profile card: avatar, name, username, bio, follower and following counts
- Top 5 repositories in a table, with:
  - a toggle between sorting by **stars** and by **most recent push**
  - a button to reverse the sort order
  - the star count or the last push date, depending on the sort
- Repo health score (0 to 100) for each repository:
  `stars × 2 + forks × 3 − open issues × 1.5`, clamped between 0 and 100
- Live API rate-limit counter, read from GitHub's `x-ratelimit-remaining` response header
- Error handling for unknown usernames (404), GitHub rate limits (403 / 429) and any other failed request
- Skips repeat searches for the user already shown; a failed search can be retried
- Optional personal access token for local development (raises the limit from 60 to 5,000 requests per hour)
- Bookmark up to 5 profiles, saved in localStorage with their repositories; clicking Bookmark again on a saved profile removes it
- Pinned profiles dropdown to reopen any saved profile instantly, without a new API call
- Brutalist-style design with bold borders, hard shadows and bright colours
- Responsive layout for desktop and phones

### Optional tasks completed
- Repo health score
- API rate-limit counter
- Pinned (bookmarked) profiles saved in localStorage

### Planned
- Showing error messages on the page

## Tech stack
- React 19
- Vite
- Plain CSS (no UI library)
- GitHub REST API (no backend; all requests are made from the browser)

## Project structure

```
src/
  components/
    SearchBar.jsx     search input + button; fetches the user and repos, reports the rate limit
    UserProfile.jsx   profile card, bookmark button, sortable top-repositories table, health scores
  App.jsx             holds the user, repo and rate-limit state, and the pinned profiles dropdown
  App.css             page layout and component styles
  index.css           theme colours and fonts
```

## Running locally

```bash
git clone https://github.com/Tech-Boy-Tejas/Github-Explorer.git
cd Github-Explorer
npm install
npm run dev
```

Then open the localhost link printed in the terminal.

### Optional: GitHub token

Without a token, GitHub allows 60 requests per hour per IP. To raise that while developing:

1. Create a fine-grained personal access token on GitHub (Settings → Developer settings → Fine-grained tokens) with read-only access to public repositories and no extra permissions.
2. Create a `.env.local` file in the project root:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   ```
3. Restart `npm run dev`.

`.env.local` is git-ignored, so the token is never committed. The app works without it.
