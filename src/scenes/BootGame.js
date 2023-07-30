import Phaser from "phaser";

export default class BootGame extends Phaser.Scene {
    constructor() {
        super('bootGame'); // Identifier for this scene
    }

    preload(){
        this.load.image('background', "assets/images/star_field.png");
        
        this.load.spritesheet('goblin', "assets/game/caveSprites_/goblin_.png",{
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('goblin', "assets/game/caveSprites_/pickaxe_diamond.png",{
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('lancelot', "assets/game/camelot_/lancelot_.png",{
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('excalibur', "assets/game/camelot_/excalibur_.png",{
            frameWidth: 32,
            frameHeight: 32
        })
    }

    create () {
        this.add.text(20, 20, "Loading Game...");
        this.scene.start("playGame");

        // Animations
        this.anims.create({
            key: 'idle_goblin_anim',
            frames: this.anims.generateFrameNumbers('goblin', {
                start:4,
                end:7
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'ded_goblin_anim',
            frames: this.anims.generateFrameNumbers('goblin', {
                start:60,
                end:63
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })

        // Lancelot
        this.anims.create({
            key:'idle_lancelot_anim',
            frames: this.anims.generateFrameNumbers('lancelot', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key:'run_lancelot_anim',
            frames: this.anims.generateFrameNumbers('lancelot', {
                start: 8,
                end: 11
            }),
            frameRate: 10,
            repeat: -1,
            // zeroPad: 4
        })

        this.anims.create({
            key:'excalibur_idle',
            frames: this.anims.generateFrameNumbers('excalibur', {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key:'excalibur_swing_r',
            frames: this.anims.generateFrameNumbers('excalibur', {
                start: 0,
                end: 7,
            }),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        })
    }
}