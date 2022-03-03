import React, { useState, useEffect } from "react";
import "./App.css";
import Dict from "./dict";

export default function WLine({ keyp, active, word }) {
  const [guess, setGuess] = useState([]);

  useEffect(() => {
    if (active && keyp) {
      keyp.keyCode === 8
        ? setGuess([...guess.slice(0, -1)])
        : /[a-zA-Z]/.test(String.fromCharCode(keyp.keyCode)) && guess.length < 5
        ? setGuess([...guess, keyp.key.toUpperCase()])
        : keyp.keyCode === 13 && guess.length === 5
        ? checkGuess()
        : console.log("pass");
    }
  }, [keyp, active]);

  function checkGuess() {
    const g = guess.join("").toLowerCase();
    const ga = g.split("");
    const wa = word.split("");
    console.log(g, word);
    if (!Dict.includes(g)) {
      alert("Word not in dictionary");
      return;
    }
    for (let i = 0; i < 5; i++) {
      console.log(ga[i] == wa[i]);
    }
  }

  return (
    <div className="wline">
      <div className="wcell">{guess[0] || ""}</div>
      <div className="wcell"> {guess[1] || ""}</div>
      <div className="wcell"> {guess[2] || ""}</div>
      <div className="wcell"> {guess[3] || ""}</div>
      <div className="wcell"> {guess[4] || ""}</div>
    </div>
  );
}
