import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";

function App() {
  let [user, setUser] = useState(null);

  return (
    <>
      <SearchBar onFound={setUser} />
      {user && <UserProfile user={user} />}
    </>
  );
}

export default App;
