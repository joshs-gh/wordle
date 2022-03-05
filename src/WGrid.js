import React, { useState, useEffect } from "react";
import WLine from "./WLine";
import "./App.css";

export default function WGrid({ theword, keyp, keyboard }) {
  const [word, setWord] = useState();
  const [line, setLine] = useState();

  useEffect(() => {
    setWord(theword);
    setLine(1);
  }, [theword]);

  function nextLine() {
    setLine(line + 1);
  }

  return (
    <div className="wgrid">
      <WLine
        word={word}
        keyp={keyp}
        active={line === 1}
        nextLine={nextLine}
        keyboard={keyboard}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 2 && keyp}
        active={line === 2}
        nextLine={nextLine}
        keyboard={keyboard}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 3 && keyp}
        active={line === 3}
        nextLine={nextLine}
        keyboard={keyboard}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 4 && keyp}
        active={line === 4}
        nextLine={nextLine}
        keyboard={keyboard}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 5 && keyp}
        active={line === 5}
        nextLine={nextLine}
        keyboard={keyboard}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 6 && keyp}
        active={line === 6}
        nextLine={nextLine}
        keyboard={keyboard}
      ></WLine>
    </div>
  );
}
