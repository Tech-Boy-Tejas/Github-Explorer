import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";

function App() {
  let [user, setUser] = useState(null);
  let [userRepo, setUserRepo] = useState(null);
  let [remaining, setRemaining] = useState(null);

  return (
    <>
      <SearchBar
        onFound1={setUser}
        onFound2={setUserRepo}
        onFound3={setRemaining}
      />
      {remaining !== null && <p>API calls left: {remaining}</p>}
      {user && <UserProfile user={user} userRepo={userRepo} />}
    </>
  );
}

export default App;
