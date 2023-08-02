import { use, useEffect, useState } from "react";
import { Box, Dialog, DialogContent, Button } from "@mui/material";

import GameQuestions from "./GameQuestions";

import { useGameContext } from "../contexts/game";

export default function CoreGame() {
  // Basic states
  const [game, setGame] = useState(null);
  const [isAnswered, setAnswered] = useState(false);
  const [isCorrect, setCorrect] = useState("#fff");
  const [correct, setCorrectAnswer] = useState(null);
  const [done, setDone] = useState(true);
  const [message, setMessage] = useState("");
  const { gem, character, onFinished, currentCard } = useGameContext();

  // currentCard is the monster that is being fought
  // currentCard.data is the data of the monster (@/config/game.jsx)
  // open dialog when currentCard is not null
  // dialog is closed automatically after calling onFinished

  // Example of data put in game and question section
  const data_trash = {
    question:
      "Câu 1: Bộ phận nào trong số các bộ phận sau đây thuộc hệ hô hấp ?",
    answers: ["Gan", "Dạ Dày", "Não Bộ", "Phổi"],
  };
  const gameDataTrash = {
    map: {
      name: "taiga",
      x: -130,
      y: -140,
    },
    character: "knight",
    monster: "goblin",
  };

  // This is the basic data for game scene
  const [gameData, setGameData] = useState(gameDataTrash);

  // Check if done animation
  if(done){
    console.log('Animation Done!')
  }

  // Function that load phaser game into <div id ='game'/>
  const loadGame = async () => {
    console.log("Loading....");
    const Phaser = await import("phaser");
    const { default: BootGame } = await import("../scenes/BootGame");
    const { default: PlayGame } = await import("../scenes/PlayGame");

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 456,
      height: 240,
      title: "testeria",
      parent: "game",
      scale: {
        zoom: 2,
      },
      scene: [
        new BootGame({ gem, character }),
        new PlayGame({ gem, character, gameData, setDone }),
      ],
      physics: {
        default: "arcade",
        arcade: {
          // debug: 'isDevelopment',
          debug: false,
        },
      },
    });

    setGame(game);
  };

  // Not Important. Demo change data game instantly ( Can be removed )
  const changeNextQuestion = () => {
    console.log("change next question");
    game.destroy(true);
    if (gameData.map.name == "taiga") {
      setGameData({
        map: {
          name: "tundra",
          x: -240,
          y: -140,
        },
        character: "lancelot",
        monster: "orc",
      });
    } else {
      setGameData(gameDataTrash);
    }
  };

  // Handle when user choose answer
  const handleOnClick = (e) => {
    // console.log('Clicked')
    // console.log(e.target.value)
    const value = e.target.value;
    let correct;

    if (value == 2) {
      game.events.emit("Answer_Event", true);
      setAnswered(true);
      setCorrect("#1EF467");
      setMessage("Congratulation, you have the correct answer! 😎");
      correct = true;
    } else {
      game.events.emit("Answer_Event", false);
      setAnswered(true);
      setCorrect("#EC6B5E");
      setMessage("Oh noo, wrong answer! 😥");
      correct = false;
    }

    setTimeout(() => {
      handleClose();
      onFinished(correct);
    }, 2200);
  };

  const handleClose = () => {
    // setOpen(false);
    if (game) game.destroy(true);
    setGame(null);
    setAnswered(false);
    setMessage("");
    setCorrect("#fff");
    setDone(false);
  };

  useEffect(() => {
    if (currentCard != null) {
      loadGame();
    }
  }, [currentCard]);

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open game
      </Button> */}
      {/* <Button variant="outlined" onClick={changeNextQuestion}>
        Change Map
      </Button> */}
      <Dialog fullWidth={false} maxWidth="lg" open={currentCard != null}>
        <DialogContent sx={{ padding: "0px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box id="game"></Box>
              <GameQuestions
                data={data_trash}
                handleOnClick={handleOnClick}
                correct={isCorrect}
                answer={isAnswered}
                message={message}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
