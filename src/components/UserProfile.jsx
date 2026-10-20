import { useState } from "react";
import viteLogo from "../assets/vite.svg";

export default function UserProfile({ user, userRepo }) {
  let diffSorts = [
    userRepo.toSorted((a, b) => b.stargazers_count - a.stargazers_count),
    userRepo.toSorted((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)),
  ];

  let msg1 = ["STARS", "RECENT UPDATES"];

  let [reversed, setReversed] = useState(false);
  let [sortIndex, setSortIndex] = useState(0);

  const onToggleClick = () => {
    setSortIndex(sortIndex === 0 ? 1 : 0);
  };

  const sortClick = () => {
    setReversed(!reversed);
  };

  const list = reversed
    ? diffSorts[sortIndex].toReversed()
    : diffSorts[sortIndex];

  const onClickBookmark = () => {
    let bookmarkCount = JSON.parse(localStorage.getItem("bookmarkCount")) ?? 0;

    let foundAt = -1;
    for (let i = 0; i < bookmarkCount; i++) {
      let saved = JSON.parse(localStorage.getItem(`user${i}`));
      if (saved && saved.id === user.id) foundAt = i;
    }

    if (foundAt !== -1) {
      let last = bookmarkCount - 1;
      localStorage.setItem(
        `user${foundAt}`,
        localStorage.getItem(`user${last}`),
      );
      localStorage.setItem(
        `userRepo${foundAt}`,
        localStorage.getItem(`userRepo${last}`),
      );
      localStorage.removeItem(`user${last}`);
      localStorage.removeItem(`userRepo${last}`);
      localStorage.setItem("bookmarkCount", JSON.stringify(last));

      alert("Bookmark removed");
    } else {
      if (bookmarkCount < 5) {
        localStorage.setItem(`user${bookmarkCount}`, JSON.stringify(user));
        localStorage.setItem(
          `userRepo${bookmarkCount}`,
          JSON.stringify(userRepo),
        );
        localStorage.setItem(
          "bookmarkCount",
          JSON.stringify(bookmarkCount + 1),
        );

        alert("Bookmark Saved!");
      } else {
        alert("Can't store more than 5 profiles!");
      }
    }
  };
  return (
    <div className="results">
      <article className="github-profile">
        <header>
          <img
            src={user.avatar_url}
            alt={`${user.name}'s avatar`}
            width="100"
            height="100"
            className="img-fluid"
            onError={(e) => {
              e.currentTarget.src = viteLogo;
            }}
          />
          <h2>{user.name}</h2>
          <p className="username">{user.login}</p>
        </header>

        <p className="bio">{user.bio ?? "Yet to Add"}</p>

        <dl className="profile-stats">
          <dt>Followers</dt>
          <dd>{user.followers}</dd>

          <dt>Following</dt>
          <dd>{user.following}</dd>
        </dl>
        <button className="btn btn-bookmark" onClick={onClickBookmark}>
          BOOKMARK
        </button>
      </article>

      <section className="repos">
        <h2>TOP REPOSITORIES - BASED ON {msg1[sortIndex]}</h2>
        <table className="repo-data">
          <thead>
            <tr>
              <th>SL NO</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              {sortIndex === 0 && <th>STARGAZERS COUNT</th>}
              {sortIndex === 1 && <th>LAST UPDATE</th>}
              <th>REPO HEALTH SCORE</th>
            </tr>
          </thead>

          <tbody>
            {list.slice(0, 5).map((element, index) => {
              let rawScore =
                element.stargazers_count * 2 +
                element.forks_count * 3 -
                element.open_issues_count * 1.5;
              let healthScore = Math.min(100, Math.max(0, rawScore));
              return (
                <tr key={element.id}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.description}</td>
                  {sortIndex === 0 && <td>{element.stargazers_count}</td>}
                  {sortIndex === 1 && (
                    <td>
                      {new Date(element.pushed_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  )}

                  <td>
                    <span className="score">{healthScore}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="btn btn-toggle" onClick={onToggleClick}>
          Toggle sort
        </button>

        <button
          className="btn btn-sort-switch"
          style={{ marginLeft: "10px" }}
          onClick={sortClick}
        >
          Reverse order
        </button>
      </section>
    </div>
  );
}
