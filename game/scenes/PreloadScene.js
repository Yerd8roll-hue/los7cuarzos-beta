export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.spritesheet(
            "kael",
            "game/assets/personajes/Kael/spritesheet.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );

    }

    create() {

        this.scene.start("MenuScene");

    }

}
