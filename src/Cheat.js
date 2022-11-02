import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import closeIcon from "./closeIcon.png";
import Dict from "./dict";
import { WStore } from "./WStore";

export default function Cheat({ setCheat, cheatLine }) {
  const cheatbox = useRef();
  const searchString = useRef();
  const [cheatResults, setCheatResults] = useState([]);
  const wrongGuesses = WStore.useState((s) => s.wrongGuesses);

  useEffect(() => {
    if (cheatLine === "") setCheatResults([]);
    const search = cheatLine.toString().toLowerCase();
    const re = new RegExp("^" + search.replaceAll("x", "."));
    setCheatResults(
      Dict.filter(
        (word) =>
          re.test(word) && !wrongGuesses.some((letter) => word.includes(letter))
      )
    );
  }, [cheatLine]);

  return (
    <div className="cheatbox" ref={cheatbox}>
      <img
        src={closeIcon}
        className="closeIcon"
        onClick={(e) => setCheat(false)}
      />
      <h2>CHEATER!</h2>
      {/* <input
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
      </button> */}
      <div className="cheatResults">
        {cheatResults.length > 0 ? (
          <ul>
            {cheatResults.map((r, id) => (
              <li key={id}>{r}</li>
            ))}
          </ul>
        ) : (
          <div className="nomatches"> No Matches : (</div>
        )}
      </div>
    </div>
  );
}
