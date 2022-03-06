import React, { useState, useEffect, useRef } from "react";
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
  const lineRef = useRef();

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
        message: "Not in word list",
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
      lineRef.current.className = "wline shake";
      setTimeout(() => (lineRef.current.className = "wline"), 2000);
      return;
    }
    let cellState = "";
    let rightCount = 0;
    for (let i = 0; i < 5; i++) {
      if (ga[i] === wa[i]) {
        cellState = "right";
        rightCount++;
        keyboard.removeButtonTheme(ga[i], "myGrey buttonhint");
        keyboard.addButtonTheme(ga[i], "buttonright");
      } else if (wa.includes(ga[i])) {
        cellState = "hint";
        keyboard.removeButtonTheme(ga[i], "myGrey");
        keyboard.addButtonTheme(ga[i], "buttonhint");
      } else {
        cellState = "wrong";
        keyboard.removeButtonTheme(ga[i], "myGrey");
        keyboard.addButtonTheme(ga[i], "buttonwrong");
      }

      switch (i) {
        case 0:
          sc1(cellState);
          break;
        case 1:
          sc2(cellState);
          break;
        case 2:
          sc3(cellState);
          break;
        case 3:
          sc4(cellState);
          break;
        case 4:
          sc5(cellState);
          break;
        default:
          break;
      }
    }
    if (rightCount === 5) {
      Store.addNotification({
        title: "You Won!",
        message: "Reload to play again",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
      });
      keyHandler();
      return;
    }
    nextLine();
  }

  return (
    <div className="wline" ref={lineRef}>
      <div className={guess[0] ? `wcell filled ${c1}` : `wcell ${c1}`}>
        {guess[0] || " "}
      </div>
      <div className={guess[1] ? `wcell filled ${c2}` : `wcell ${c2}`}>
        {" "}
        {guess[1] || " "}
      </div>
      <div className={guess[2] ? `wcell filled ${c3}` : `wcell ${c3}`}>
        {" "}
        {guess[2] || " "}
      </div>
      <div className={guess[3] ? `wcell filled ${c4}` : `wcell ${c4}`}>
        {" "}
        {guess[3] || " "}
      </div>
      <div className={guess[4] ? `wcell filled ${c5}` : `wcell ${c5}`}>
        {" "}
        {guess[4] || " "}
      </div>
    </div>
  );
}
