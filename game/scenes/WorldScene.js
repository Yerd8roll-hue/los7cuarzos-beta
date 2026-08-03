import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#1a1a2e");

        this.add.text(640, 40, "Valle del Cuarzo del Alma", {
            fontSize: "32px",
            color: "#00ffff"
        }).setOrigin(0.5);

        createKaelAnimations(this);

        this.kael = this.physics.add.sprite(300, 500, "kael");

        this.kael.setScale(2);

        this.kael.play("kael-idle");

    }

    update() {

    }

}
