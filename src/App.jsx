import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";

function App() {
  let [user, setUser] = useState(null);
  let [userRepo, setUserRepo] = useState(null);
  let [remaining, setRemaining] = useState(null);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">GE</span>
          GitHub Explorer
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <h1>Explore any GitHub profile</h1>
          <p className="hero-sub">
            Search a username to see their profile and top repositories.
          </p>
          <SearchBar
            onFound1={setUser}
            onFound2={setUserRepo}
            onFound3={setRemaining}
          />
          {remaining !== null && (
            <p className="rate-pill">API calls left: {remaining}</p>
          )}
        </section>
        {user && <UserProfile user={user} userRepo={userRepo} />}
      </main>
    </div>
  );
}

export default App;
