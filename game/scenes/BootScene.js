// game/scenes/BootScene.js

export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {
        console.log("Iniciando juego...");
    }

    create() {
        this.scene.start("PreloadScene");
    }

}
