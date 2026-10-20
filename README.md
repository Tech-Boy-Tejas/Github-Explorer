# GitHub Explorer

Search any GitHub user to see their profile and top repositories. Built with React + Vite on the public [GitHub REST API](https://docs.github.com/en/rest).

Built for the ACM Web Dev induction (Project 1A: GitHub Profile & Repo Explorer).

## Features

### Done
- Search for a GitHub user by username
- Fetches the user's profile (`/users/{username}`) and public repositories (`/users/{username}/repos`) when the search button is clicked
- Error handling for:
  - unknown usernames (404)
  - GitHub rate limits (403 / 429)
  - any other failed request
- Skips repeat searches for the user already shown; a failed search can be retried
- Optional personal access token for local development (raises the limit from 60 to 5,000 requests per hour)

### In progress
- Profile card: avatar, name, bio, follower and following counts
- Repository list, sorted by stars or by last update
- Showing loading and error messages on the page

## Tech stack
- React 19
- Vite
- GitHub REST API (no backend; all requests are made from the browser)

## Project structure

```
src/
  components/
    SearchBar.jsx     search input + button, fetches the user and repos
    UserProfile.jsx   displays the fetched user's profile
  App.jsx             holds the user state and passes it between components
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
