export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        // aquí van tus cargas

    }

    create() {

        this.scene.start("MenuScene");

    }

}
