import React, { useState, useEffect } from "react";
import { Store } from "react-notifications-component";
import "./App.css";
import Dict from "./dict";

export default function WLine({
  keyp,
  active,
  word,
  nextLine,
  keyboard,
  keyHandler,
}) {
  const [guess, setGuess] = useState([]);
  const [c1, sc1] = useState("");
  const [c2, sc2] = useState("");
  const [c3, sc3] = useState("");
  const [c4, sc4] = useState("");
  const [c5, sc5] = useState("");

  useEffect(() => {
    if (active && keyp) {
      keyp.keyCode === 8 || keyp.key === "{bksp}"
        ? setGuess([...guess.slice(0, -1)])
        : /[a-zA-Z]/.test(String.fromCharCode(keyp.keyCode)) && guess.length < 5
        ? setGuess([...guess, keyp.key.toUpperCase()])
        : (keyp.keyCode === 13 || keyp.key === "{enter}") && guess.length === 5
        ? checkGuess()
        : console.log("pass");
    }
  }, [keyp, active]);

  function checkGuess() {
    const g = guess.join("").toLowerCase();
    const ga = g.split("");
    const wa = word.split("");
    if (!Dict.includes(g)) {
      Store.addNotification({
        message: "Word not recognized.",
        type: "warning",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
      return;
    }
    let cn = "";
    let rc = 0;
    for (let i = 0; i < 5; i++) {
      if (ga[i] == wa[i]) {
        cn = "right";
        rc++;
        keyboard.removeButtonTheme(ga[i], "myGrey buttonhint");
        keyboard.addButtonTheme(ga[i], "buttonright");
      } else if (wa.includes(ga[i])) {
        cn = "hint";
        keyboard.removeButtonTheme(ga[i], "myGrey");
        keyboard.addButtonTheme(ga[i], "buttonhint");
      } else {
        cn = "wrong";
        keyboard.removeButtonTheme(ga[i], "myGrey");
        keyboard.addButtonTheme(ga[i], "buttonwrong");
      }

      switch (i) {
        case 0:
          sc1(cn);
        case 1:
          sc2(cn);
        case 2:
          sc3(cn);
        case 3:
          sc4(cn);
        case 4:
          sc5(cn);
      }
    }
    nextLine();
    if (rc === 5) {
      Store.addNotification({
        title: "You Won!",
        message: "Reload to play again",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
      });
      keyHandler();
    }
  }

  return (
    <div className="wline">
      <div className={`wcell ${c1}`}>{guess[0] || " "}</div>
      <div className={`wcell ${c2}`}> {guess[1] || " "}</div>
      <div className={`wcell ${c3}`}> {guess[2] || " "}</div>
      <div className={`wcell ${c4}`}> {guess[3] || " "}</div>
      <div className={`wcell ${c5}`}> {guess[4] || " "}</div>
    </div>
  );
}
