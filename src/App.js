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
import { useSearchParams } from "react-router-dom";
import Cheat from "./Cheat";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [keyp, setKey] = useState();
  const [word, setWord] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [cheat, setCheat] = useState(false);
  const [newGame, setNewGame] = useState(true);
  const keyboard = useRef();
  const reloadimg = useRef();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(async () => {
    window.addEventListener("keydown", keyEventHandler, false);
    const theword = Targets[Math.floor(Math.random() * Targets.length)];
    setWord(theword);
    console.log(theword);
    keyboard.current.addButtonTheme(
      "q w e r t y u i o p a s d f g h j k l {enter} z x c v b n m {bksp}",
      "myGrey"
    );
    if (newGame && searchParams.get("autotype") === "adieu") {
      await autopress("a");
      await autopress("d");
      await autopress("i");
      await autopress("e");
      await autopress("u");
      await autopress("{enter}");
      await sleep(1000);
      await autopress("s");
      await autopress("t");
      await autopress("o");
      await autopress("r");
      await autopress("y");
      await autopress("{enter}");
      setNewGame(false);
    }
    if (newGame && searchParams.get("autotype") === "learn") {
      await autopress("l");
      await autopress("e");
      await autopress("a");
      await autopress("r");
      await autopress("n");
      await autopress("{enter}");
      await sleep(1000);
      await autopress("m");
      await autopress("o");
      await autopress("i");
      await autopress("s");
      await autopress("t");
      await autopress("{enter}");
      await sleep(1000);
      await autopress("d");
      await autopress("u");
      await autopress("c");
      await autopress("k");
      await autopress("y");
      await autopress("{enter}");
      setNewGame(false);
    }
  }, []);

  function keyEventHandler(e) {
    setKey(e);
  }

  function setGO(won) {
    // TODO: I CAN NOT GET THE DAMN KEYDOWN EVENT TO REMOVE - ERG!!!
    setTimeout(() => setGameOver(true), won ? 3200 : 500);
    setTimeout(() => (reloadimg.current.style.visibility = "visible"), 2600);
  }

  const autopress = async (k) => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: k,
        keyCode: k.charCodeAt(0),
      })
    );
    await sleep(200);
  };

  const onKeyPress = (button) => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: button,
        keyCode: button.charCodeAt(0),
      })
    );
    setNewGame(false);
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
        {cheat && <Cheat setCheat={setCheat} />}
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
      <button className="cheat" onClick={() => setCheat((cheat) => !cheat)}>
        Cheat
      </button>
    </div>
  );
}

export default App;
