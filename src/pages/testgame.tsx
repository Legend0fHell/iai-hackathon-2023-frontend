import React, {useState, useEffect} from 'react';

import { Game as GameType } from 'phaser';

const Game = () => {
    // const [game, setGame] = useState<GameType>();
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        async function initGame(){
            const Phaser = await import('phaser');
            
            const { default : BootGame } = await import('../scenes/BootGame');
            const { default : PlayGame } = await import('../scenes/PlayGame');

            let config = {
                type: Phaser.AUTO,
                title: 'testeria',
                parent: 'game-content',
                width: 400,
                height: 300,
                backgroundColor:0x000000,
                pixelArt: true,
                scale: {
                    zoom: 2,
                },
                scene: [
                    BootGame,
                    // PlayGame
                ],
                physics: {
                    default: 'arcade',
                    arcade: {
                        // debug: 'isDevelopment',
                        debug: false
                    }
                }
            }
            
            let phaserGame = new Phaser.Game(config);
            // setGame(phaserGame)
            phaserGame.events.on('putOnPlayGame', setReady)

            phaserGame.scene.add('PlayGame', PlayGame, true);
            return () => {
                setReady(false)
                phaserGame.destroy(true)
            }
        }
        console.log('i fire once');
        initGame();
    },[])

    return (
        <> 
            {/* id and key must match with parent */}
            <div id="game-content" key='game-content' className={isReady ? 'visible' : 'invisible'} > 
                {/* This is where game canvas will be rendered */}
            </div>
        </>
    )
}


export default Game;