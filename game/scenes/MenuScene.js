// game/scenes/MenuScene.js

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        this.add.text(640, 180, "LOS 7 CUARZOS", {
            fontSize: "48px",
            color: "#00ffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(640, 260, "Beta 2.0", {
            fontSize: "24px",
            color: "#ffffff"
        }).setOrigin(0.5);

        const startButton = this.add.text(640, 420, "INICIAR", {
            fontSize: "32px",
            backgroundColor: "#00aaff",
            color: "#000000",
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        startButton.on("pointerdown", () => {
            this.scene.start("WorldScene");
        });

    }

}
