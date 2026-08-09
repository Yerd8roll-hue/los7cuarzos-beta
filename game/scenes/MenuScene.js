export default class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#05070d");

        this.add.text(
            640,
            220,
            "LOS 7 CUARZOS",
            {
                fontSize: "64px",
                color: "#00ffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        const boton = this.add.text(
            640,
            400,
            "INICIO",
            {
                fontSize: "36px",
                color: "#ffffff",
                backgroundColor: "#111111",
                padding: {
                    left: 30,
                    right: 30,
                    top: 15,
                    bottom: 15
                }
            }
        ).setOrigin(0.5);

        boton.setInteractive({ useHandCursor: true });

        boton.on("pointerdown", () => {
            this.scene.start("WorldScene");
        });

    }
}
