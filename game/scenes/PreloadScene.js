export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        // Cargar Kael como imagen normal (prueba)
        this.load.image(
            "kael",
            "game/assets/personajes/Kael/spritesheet.png"
        );

    }

    create() {

        this.scene.start("MenuScene");

    }

}
