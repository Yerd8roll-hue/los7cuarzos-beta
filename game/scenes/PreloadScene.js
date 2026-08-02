// game/scenes/PreloadScene.js

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        // Aquí cargaremos imágenes, sonidos y sprites.

        console.log("Cargando recursos...");

    }

    create() {

        this.scene.start("MenuScene");

    }

}
