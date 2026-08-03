export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.spritesheet(
            "kael",
            "assets/personajes/Kael/spritesheet.png",
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );

    }

    create() {
        this.scene.start("MenuScene");
    }
}
