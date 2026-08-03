// game/scenes/PreloadScene.js

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        // Texto de carga
        this.add.text(640, 360, "Cargando...", {
            fontSize: "32px",
            color: "#ffffff"
        }).setOrigin(0.5);

        // ===== KAEL =====
        this.load.spritesheet("kael", "assets/personajes/Kael/spritesheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // ===== FONDOS =====
        this.load.image("sky", "assets/fondos/sky.png");
        this.load.image("cityBack", "assets/fondos/cityBack.png");
        this.load.image("cityFront", "assets/fondos/cityFront.png");
        this.load.image("cables", "assets/fondos/cables.png");

        // ===== SUELO =====
        this.load.image("floor", "assets/floor.png");

    }

    create() {

        this.scene.start("MenuScene");

    }

}
