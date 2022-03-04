import React, { useState, useEffect } from "react";
import "./App.css";

export default function WCell(props) {
  const [guess, setGuess] = useState("");
  const [order, setOrder] = useState();

  useEffect(() => {
    setOrder(props.order);
  }, []);

  useEffect(() => {
    if (props.cursor === order) {
      setGuess(props.keyCode === 8 ? " " : props.keyp);
    }
  }, [props.keyp, props.active]);

  return (
    <div className="wcell">
      {guess && (guess.keyCode === 8 ? " " : guess.key.toUpperCase())}
    </div>
  );
}
