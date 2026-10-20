import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";

function App() {
  let [user, setUser] = useState(null);
  let [userRepo, setUserRepo] = useState(null);
  let [remaining, setRemaining] = useState(null);

  let [showPinned, setShowPinned] = useState(false);
  let [pinned, setPinned] = useState([]);

  const onPinnedClick = () => {
    let bookmarkCount = JSON.parse(localStorage.getItem("bookmarkCount")) ?? 0;
    let saved = [];
    for (let i = 0; i < bookmarkCount; i++) {
      saved.push({
        user: JSON.parse(localStorage.getItem(`user${i}`)),
        userRepo: JSON.parse(localStorage.getItem(`userRepo${i}`)),
      });
    }
    setPinned(saved);
    setShowPinned(!showPinned);
  };

  const onSelectPinned = (profile) => {
    setUser(profile.user);
    setUserRepo(profile.userRepo);
    setShowPinned(false);
  };

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

          <div className="pinned">
            <button className="btn" onClick={onPinnedClick}>
              Pinned profiles
            </button>
            {showPinned && (
              <ul className="pinned-list">
                {pinned.length === 0 && <li>No pinned profiles yet</li>}
                {pinned.map((profile) => (
                  <li key={profile.user.id}>
                    <button onClick={() => onSelectPinned(profile)}>
                      {profile.user.login}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        {user && <UserProfile user={user} userRepo={userRepo} />}
      </main>
    </div>
  );
}

export default App;
