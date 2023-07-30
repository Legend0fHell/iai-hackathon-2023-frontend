import Phaser from "phaser";

export default class PlayGame extends Phaser.Scene {
    constructor() {
        super('playGame'); // Identifier for this scene
        this.isRunning = false;
        this.swing = false;
    }

    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);

        // Declaration using sprite
        this.goblin = this.physics.add.sprite(400 - 50, 300 / 2, 'goblin');
        const lancelot = this.physics.add.sprite(50, 300 / 2, 'lancelot');
        this.excalibur = this.physics.add.sprite(70, 300 / 2 + 20, 'excalibur')

        // Set Scale and play anim
        this.goblin.setScale(3);
        this.goblin.setSize(5, 20, true)
        this.goblin.play('idle_goblin_anim');

        lancelot.setScale(3);
        lancelot.play('idle_lancelot_anim')
        lancelot.setCollideWorldBounds(true)

        this.lancelot = lancelot;

        this.excalibur.setScale(2);
        this.excalibur.angle = 90
        this.excalibur.play('excalibur_idle')

        this.cPlayer = this.add.container(0, 0)

        this.cPlayer.setSize(32, 32)
        this.physics.add.existing(this.cPlayer)
        this.cPlayer.add([this.lancelot, this.excalibur])


        // Logic
        // this.goblin.setInteractive();

        // this.input.on('gameobjectdown', this.killPlayer, this)

        lancelot.on(Phaser.Animations.Events.ANIMATION_START, function () {

            this.isRunning = true;

        }, this);

        this.input.once('pointerdown', function () {

            lancelot.play('run_lancelot_anim');

        });



        this.physics.add.overlap(lancelot, this.goblin, this.killMonster, null, this);

        // Finally trigger an event so that the scene is now visible. This is optional 
        // but useful if you want to transition your game's appearance.
        this.game.events.emit("putOnPlayGame", true)
    }

    movePlayer(player, speed) {
        player.x += speed;
        if (player.x > 400) {
            this.resetPlayer(player);
        }
    }

    resetPlayer(player) {
        player.x = 0;
        player.y = 300 / 2;
    }

    killMonster(player, monster) {

        if (this.swing == false) {
            this.swing = true;
            this.excalibur.play('excalibur_swing_r', true);
        }
        player.play('idle_lancelot_anim', true);
        monster.play('ded_goblin_anim', true);

        this.isRunning = false;
    }

    update() {

        if (this.isRunning) {
            this.movePlayer(this.cPlayer, 2)
            // lancelot.x += 2
        }

        let { lives, progress } = this
        // For example, monitor the number of lives and exit when 
        // if (!lives) {
        //     // Save the progress.
        //     this.registry.merge(progress)
        //     // Trigger the game end.
        //     this.game.events.emit("putOnPlayGame", false)
        // }
    }


}