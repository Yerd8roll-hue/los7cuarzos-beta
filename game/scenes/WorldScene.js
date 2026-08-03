// game/scenes/WorldScene.js

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        this.add.text(640, 360, "Valle del Cuarzo del Alma", {
            fontSize: "36px",
            color: "#ffffff"
        }).setOrigin(0.5);

    }

}
