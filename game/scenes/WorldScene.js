// game/scenes/WorldScene.js

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

        // Kael
        this.kael = this.physics.add.sprite(300, 500, "kael");

        this.kael.setFrame(0);

        this.kael.setScale(1);

        this.kael.setCollideWorldBounds(true);

    }

    update() {

    }

} 
