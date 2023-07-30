import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/game";

export default function LmaoGame() {
  const [game, setGame] = useState(null);
  const { gem, character, onFinished } = useGameContext();

  useEffect(() => {
    async function loadGame() {
      const Phaser = await import("phaser");

      class SimpleScene extends Phaser.Scene {
        constructor({ gem, character }) {
          super({ key: "SimpleScene" });
          this.gem = gem;
          this.character = character;
        }

        preload() {}

        create() {
          this.add.text(10, 10, `Gem: ${this.gem}`, {
            font: "16px Courier",
            fill: "#00ff00",
          });
          this.add.text(10, 30, `Character: ${this.character.name}`, {
            font: "16px Courier",
            fill: "#00ff00",
          });
          // simple button
          this.add
            .text(10, 50, "Click me", {
              font: "16px Courier",
              fill: "#00ff00",
            })
            .setInteractive()
            .on("pointerdown", () => {
              onFinished(); // <--- OUTPUT
            });
        }
      }

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "game",
        scene: [new SimpleScene({ gem, character })], // <--- INPUT
      });

      setGame(game);
    }

    loadGame();

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game"></div>;
}
