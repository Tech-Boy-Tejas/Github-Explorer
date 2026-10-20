import { useState } from "react";
import { useEffect } from "react";

export default function SearchBar({ onFound1, onFound2, onFound3 }) {
  let [prevUsername, setPrevUsername] = useState("");
  let [username, setUsername] = useState("");

  const apiCall = async function () {
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const options = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const response1 = await fetch(
        `https://api.github.com/users/${username}`,
        options,
      );
      onFound3(response1.headers.get("x-ratelimit-remaining"));

      if (response1.status === 404) throw new Error("User not found");
      if (response1.status === 403 || response1.status === 429)
        throw new Error("Rate limit reached, try again later");
      if (!response1.ok)
        throw new Error(`Something went wrong (${response1.status})`);

      const response2 = await fetch(
        `https://api.github.com/users/${username}/repos`,
        options,
      );
      onFound3(response2.headers.get("x-ratelimit-remaining"));

      if (response2.status === 404) throw new Error("Data not found");
      if (response2.status === 403 || response2.status === 429)
        throw new Error("Rate limit reached, try again later");
      if (!response2.ok)
        throw new Error(`Something went wrong (${response2.status})`);

      const user = await response1.json();
      const userProfile = await response2.json();

      onFound1(user);
      onFound2(userProfile);
      setPrevUsername(username);

      console.log(user);
      console.log(userProfile);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeText = (event) => {
    setUsername(event.target.value);
  };

  const onButtonClick = () => {
    if (
      !(prevUsername.trim().toLowerCase() === username.trim().toLowerCase())
    ) {
      apiCall();
    }
    console.log("Button clicked");
  };

  // const searchElement = document.getElementById("searchBar");
  // searchElement.addEventListener("focus", () => {
  //   document.addEventListener("keydown", function (event) {
  //     if (event.key === "Enter") {
  //       onButtonClick();
  //     }
  //   });
  // });

  // useEffect(() => {
  //   async function communicate() {
  //     let response = await fetch(`https://api.github.com/users/${user}`);
  //     let data = await response.json();
  //     console.log(data);
  //   }

  //   communicate();
  // }, [searchStatus]);

  return (
    <div className="container">
      <input
        id="searchBar"
        type="search"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={onChangeText}
        onKeyDown={(event) => {
          if (event.key === "Enter") onButtonClick();
        }}
      />
      <button
        className="btn btn-main"
        style={{ marginLeft: "10px" }}
        onClick={onButtonClick}
      >
        Search
      </button>
    </div>
  );
}
