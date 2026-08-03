// game/scenes/WorldScene.js

import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // Fondo
        this.cameras.main.setBackgroundColor("#1a1a2e");

        // Título
        this.add.text(640, 40, "Valle del Cuarzo del Alma", {
            fontSize: "32px",
            color: "#00ffff"
        }).setOrigin(0.5);

        // Crear animaciones
        createKaelAnimations(this);

        // Crear Kael
        this.kael = this.physics.add.sprite(300, 500, "kael");

        this.kael.setCollideWorldBounds(true);

        // Animación inicial
        this.kael.play("kael-idle");

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

    }

    update() {

        // El movimiento lo agregaremos en el siguiente paso.

    }

}
