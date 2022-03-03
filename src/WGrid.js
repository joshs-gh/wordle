import React, { useState, useEffect } from "react";
import WLine from "./WLine";
import "./App.css";

export default function WGrid(props) {
  const [word, setWord] = useState();
  const [line, setLine] = useState();

  useEffect(() => {
    setWord(props.word);
    setLine(1);
  }, [props.word]);

  return (
    <div className="wgrid">
      <WLine word={word} keyp={props.keyp} active={line === 1}></WLine>
      <WLine
        word={word}
        keyp={line === 2 && props.keyp}
        active={line === 2}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 3 && props.keyp}
        active={line === 3}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 4 && props.keyp}
        active={line === 3}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 5 && props.keyp}
        active={line === 3}
      ></WLine>
      <WLine
        word={word}
        keyp={line === 6 && props.keyp}
        active={line === 3}
      ></WLine>
    </div>
  );
}
