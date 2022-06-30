import React, { useRef, useState } from "react";
import "./App.css";
import closeIcon from "./closeIcon.png";
import Dict from "./dict";

export default function Cheat({ setCheat }) {
  const cheatbox = useRef();
  const searchString = useRef();
  const [cheatResults, setCheatResults] = useState([]);

  const handleInput = (e) => {
    e.stopPropagation();
    if (e.target.value === "") setCheatResults([]);
    if (e.key !== "Enter") return;
    const search = e.target.value.toLowerCase();
    console.log(e);
    const re = new RegExp("^" + search.replaceAll("x", "."));
    setCheatResults(Dict.filter((word) => re.test(word)));
  };

  return (
    <div className="cheatbox" ref={cheatbox}>
      <img
        src={closeIcon}
        className="closeIcon"
        onClick={(e) => setCheat(false)}
      />
      <h2>CHEATER!</h2>
      <input
        ref={searchString}
        placeholder={"Use x for wildcard"}
        className="cheatSearch"
        onKeyDown={handleInput}
      />
      <button
        className="cheat"
        onClick={() => {
          setCheatResults([]);
          searchString.current.value = "";
        }}
      >
        Clear
      </button>
      <div className="cheatResults">
        <ul>
          {cheatResults.map((r) => (
            <li>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
