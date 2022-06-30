import React, { useState, useEffect } from "react";
import WLine from "./WLine";
import { Store } from "react-notifications-component";
import "./App.css";

export default function WGrid({
  theword,
  keyp,
  keyboard,
  keyHandler,
  gameOver,
  reloadimg,
  setCheatLine,
  setCheat,
}) {
  const [word, setWord] = useState();
  const [line, setLine] = useState();

  useEffect(() => {
    setWord(theword);
    setLine(1);
  }, [theword]);

  function nextLine() {
    if (line + 1 === 7 && !gameOver) {
      setTimeout(() => {
        Store.addNotification({
          title: "The word was: " + theword.toUpperCase(),
          message: "Reload to play again.",
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          onRemoval: (id, removedBy) => window.location.reload(),
        });
        reloadimg.current.style.visibility = "visible";
        window.localStorage.setItem(
          "jwlosses",
          parseInt(window.localStorage.getItem("jwlosses") || 0) + 1
        );
        keyHandler(false);
      }, 2600);
    } else setLine(line + 1);
  }

  return (
    <div className="wgrid">
      <WLine
        word={word}
        keyp={keyp}
        active={line === 1}
        lineNum={line}
        nextLine={nextLine}
        keyboard={keyboard}
        keyHandler={keyHandler}
        setCheat={setCheat}
        setCheatLine={setCheatLine}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 2 && keyp}
        active={line === 2}
        lineNum={line}
        nextLine={nextLine}
        keyboard={keyboard}
        keyHandler={keyHandler}
        setCheat={setCheat}
        setCheatLine={setCheatLine}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 3 && keyp}
        lineNum={line}
        active={line === 3}
        nextLine={nextLine}
        keyboard={keyboard}
        keyHandler={keyHandler}
        setCheat={setCheat}
        setCheatLine={setCheatLine}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 4 && keyp}
        active={line === 4}
        lineNum={line}
        nextLine={nextLine}
        keyboard={keyboard}
        keyHandler={keyHandler}
        setCheat={setCheat}
        setCheatLine={setCheatLine}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 5 && keyp}
        active={line === 5}
        lineNum={line}
        nextLine={nextLine}
        keyboard={keyboard}
        keyHandler={keyHandler}
        setCheat={setCheat}
        setCheatLine={setCheatLine}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 6 && keyp}
        active={line === 6}
        lineNum={line}
        nextLine={nextLine}
        keyboard={keyboard}
        keyHandler={keyHandler}
        setCheat={setCheat}
        setCheatLine={setCheatLine}
      ></WLine>
    </div>
  );
}
