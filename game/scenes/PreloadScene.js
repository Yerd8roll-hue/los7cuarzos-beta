import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // Fondo
        this.cameras.main.setBackgroundColor("#1a1a2e");

        // Mundo
        this.physics.world.setBounds(0, 0, 3000, 720);

        // Título
        this.add.text(640, 40, "Valle del Cuarzo del Alma", {
            fontSize: "32px",
            color: "#00ffff"
        }).setOrigin(0.5).setScrollFactor(0);

        // Suelo
        this.ground = this.add.rectangle(1500, 690, 3000, 60, 0x444444);
        this.physics.add.existing(this.ground, true);

        // Animaciones
        createKaelAnimations(this);

        // Kael
        this.kael = this.physics.add.sprite(200, 500, "kael");

        this.kael.setCollideWorldBounds(true);
        this.kael.setBounce(0);

        this.physics.add.collider(this.kael, this.ground);

        // Cámara
        this.cameras.main.startFollow(this.kael);
        this.cameras.main.setBounds(0, 0, 3000, 720);

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

    }

    update() {

        if (this.keys.A.isDown || this.cursors.left.isDown) {

            this.kael.setVelocityX(-180);
            this.kael.setFlipX(true);

        }
        else if (this.keys.D.isDown || this.cursors.right.isDown) {

            this.kael.setVelocityX(180);
            this.kael.setFlipX(false);

        }
        else {

            this.kael.setVelocityX(0);

        }

        if ((this.keys.SPACE.isDown || this.cursors.up.isDown) && this.kael.body.blocked.down) {

            this.kael.setVelocityY(-500);

        }

    }

}
