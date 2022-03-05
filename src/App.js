import React, { useState, useEffect, useRef } from "react";
import Targets from "./targets";
import WGrid from "./WGrid";
// https://hodgef.com/simple-keyboard/editor/?d=simple-keyboard/react-simple-keyboard-hooks-demo/tree/master
import Keyboard from "react-simple-keyboard";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "react-simple-keyboard/build/css/index.css";
import "./App.css";

function App() {
  const [keyp, setKey] = useState();
  const [word, setWord] = useState();
  const keyboard = useRef();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      setKey(e);
    });
    const theword = Targets[Math.floor(Math.random() * Targets.length)];
    setWord(theword);
    console.log(theword);
    keyboard.current.addButtonTheme(
      "q w e r t y u i o p a s d f g h j k l {enter} z x c v b n m {bksp}",
      "myGrey"
    );
  }, []);

  function onKeyPress(button) {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: button,
        keyCode: button.charCodeAt(0),
      })
    );
  }

  return (
    <div className="App">
      <ReactNotifications />
      <header>JOSH'S WORDLE!</header>
      <WGrid theword={word} keyp={keyp} keyboard={keyboard.current}></WGrid>

      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName="default"
        theme={"hg-theme-default myTheme"}
        display={{
          "{bksp}": "<<",
          "{enter}": "enter",
        }}
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{enter} z x c v b n m {bksp}",
          ],
        }}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}

export default App;
