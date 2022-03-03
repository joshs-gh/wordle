import React, { useState, useEffect } from "react";
import "./App.css";
import Dict from "./dict";
import WGrid from "./WGrid";

function App() {
  const [keyp, setKey] = useState();
  const [word, setWord] = useState();

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      setKey(e);
    });
    setWord(Dict[Math.floor(Math.random() * Dict.length)]);
  }, []);

  return (
    <div className="App">
      <header>WORDLE!</header>
      <WGrid word={word} keyp={keyp}></WGrid>
    </div>
  );
}

export default App;
