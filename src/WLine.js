import React, { useState, useEffect, useRef } from "react";
import { Store } from "react-notifications-component";
import "./App.css";
import Dict from "./dict";
import { useSwipeable } from "react-swipeable";

export default function WLine({
  keyp,
  active,
  lineNum,
  word,
  nextLine,
  keyboard,
  keyHandler,
  setCheatLine,
  setCheat,
}) {
  const [guess, setGuess] = useState([]);
  // refs used to add classes dynamically
  const lineRef = useRef();
  const cr1 = useRef();
  const cr2 = useRef();
  const cr3 = useRef();
  const cr4 = useRef();
  const cr5 = useRef();
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      setCheatLine(guess.join(""));
      setCheat(true);
    },
  });

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
    let hints = []; // bug where hint shows twice on same letter
    for (let i = 0; i < 5; i++) {
      if (ga[i] === wa[i]) {
        cellState = "right";
        rightCount++;
        keyboard.removeButtonTheme(ga[i], "myGrey buttonhint");
        keyboard.addButtonTheme(ga[i], "buttonright");
      } else if (wa.includes(ga[i]) && !hints.includes(ga[i])) {
        cellState = "hint";
        keyboard.removeButtonTheme(ga[i], "myGrey");
        !keyboard.getButtonElement(ga[i]).className.match(/buttonright/g) && // don't turn keyboard back to yellow if green
          keyboard.addButtonTheme(ga[i], "buttonhint");
        hints.push(ga[i]);
      } else {
        cellState = "wrong";
        keyboard.removeButtonTheme(ga[i], "myGrey");
        !keyboard.getButtonElement(ga[i]).className.match(/buttonright/g) &&
          keyboard.addButtonTheme(ga[i], "buttonwrong");
      }

      switch (i) {
        case 0:
          let tmpState = cellState;
          cr1.current.className = `wcell ${tmpState} flip`;
          setTimeout(() => (cr1.current.className = `wcell ${tmpState}`), 1500);
          break;
        case 1:
          let tmpState1 = cellState;
          setTimeout(
            () => (cr2.current.className = `wcell ${tmpState1} flip`),
            500
          );
          setTimeout(
            () => (cr2.current.className = `wcell ${tmpState1}`),
            1000
          );
          break;
        case 2:
          let tmpState2 = cellState;
          setTimeout(
            () => (cr3.current.className = `wcell ${tmpState2} flip`),
            1000
          );
          setTimeout(
            () => (cr3.current.className = `wcell ${tmpState2}`),
            1500
          );
          break;
        case 3:
          let tmpState3 = cellState;
          setTimeout(
            () => (cr4.current.className = `wcell ${tmpState3} flip`),
            1500
          );
          setTimeout(
            () => (cr4.current.className = `wcell ${tmpState3}`),
            2000
          );
          break;
        case 4:
          let tmpState4 = cellState;
          setTimeout(
            () => (cr5.current.className = `wcell ${tmpState4} flip`),
            2000
          );
          setTimeout(
            () => (cr5.current.className = `wcell ${tmpState4}`),
            2500
          );
          break;
        default:
          break;
      }
    }

    if (rightCount === 5) {
      setTimeout(
        () =>
          Store.addNotification({
            title: "You Won!",
            message: "Reload to play again",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            onRemoval: (id, removedBy) => window.location.reload(),
          }),
        2500
      );

      // https://www.geeksforgeeks.org/how-to-use-dynamic-variable-names-in-javascript/
      for (let i = 1; i < 6; i++) {
        eval(
          "setTimeout(() => {cr" +
            i +
            '.current.className += " hop"}, ' +
            (2350 + i * 150) +
            ");"
        );
      }

      // record to local storage
      window.localStorage.setItem(
        "jwwins",
        parseInt(window.localStorage.getItem("jwwins") || 0) + 1
      );
      window.localStorage.setItem(
        `jwg${lineNum}`,
        parseInt(window.localStorage.getItem(`jwg${lineNum}`) || 0) + 1
      );

      keyHandler(true); // this actually sets game Over now.  Bleh - needs refactoring.
      return; // This fixed the you won, you lost bug
    }
    nextLine(); // You lost is in here
  }

  return (
    <div className="wline" ref={lineRef} {...handlers}>
      <div className={guess[0] ? `wcell filled` : `wcell`} ref={cr1}>
        {guess[0] || " "}
      </div>
      <div className={guess[1] ? `wcell filled` : `wcell`} ref={cr2}>
        {guess[1] || " "}
      </div>
      <div className={guess[2] ? `wcell filled` : `wcell`} ref={cr3}>
        {guess[2] || " "}
      </div>
      <div className={guess[3] ? `wcell filled` : `wcell`} ref={cr4}>
        {guess[3] || " "}
      </div>
      <div className={guess[4] ? `wcell filled` : `wcell`} ref={cr5}>
        {guess[4] || " "}
      </div>
    </div>
  );
}
