import React, { useState, useEffect, useRef } from "react";
import Targets from "./targets";
import WGrid from "./WGrid";
// https://hodgef.com/simple-keyboard/editor/?d=simple-keyboard/react-simple-keyboard-hooks-demo/tree/master
import Keyboard from "react-simple-keyboard";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "react-simple-keyboard/build/css/index.css";
import "./App.css";
import reloadpng from "./reload.png";
import Score from "./Score";

function App() {
  const [keyp, setKey] = useState();
  const [word, setWord] = useState();
  const [gameOver, setGameOver] = useState(false);
  const keyboard = useRef();
  const reloadimg = useRef();

  useEffect(() => {
    window.addEventListener("keydown", keyEventHandler, false);
    const theword = Targets[Math.floor(Math.random() * Targets.length)];
    setWord(theword);
    console.log(theword);
    keyboard.current.addButtonTheme(
      "q w e r t y u i o p a s d f g h j k l {enter} z x c v b n m {bksp}",
      "myGrey"
    );
  }, []);

  function keyEventHandler(e) {
    setKey(e);
  }

  function setGO(won) {
    // TODO: I CAN NOT GET THE DAMN KEYDOWN EVENT TO REMOVE - ERG!!!
    setTimeout(() => setGameOver(true), won ? 3200 : 500);
    setTimeout(() => (reloadimg.current.style.visibility = "visible"), 2600);
  }

  const onKeyPress = (button) => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: button,
        keyCode: button.charCodeAt(0),
      })
    );
  };

  return (
    <div className="App">
      <ReactNotifications />
      <div className="headdiv">
        <header>JOSH'S WORDLE! </header>
        <img
          className="reloaderpng"
          src={reloadpng}
          onClick={() => window.location.reload()}
          ref={reloadimg}
        ></img>
      </div>
      <div style={{ position: "relative", width: "335px" }}>
        {gameOver && <Score />}
      </div>

      <WGrid
        theword={word}
        keyp={!gameOver ? keyp : null}
        keyboard={keyboard.current}
        keyHandler={setGO}
        gameOver={gameOver}
        reloadimg={reloadimg}
      ></WGrid>

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
