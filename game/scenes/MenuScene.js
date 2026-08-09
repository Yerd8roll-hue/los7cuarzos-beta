export default class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        // =========================================
        // FONDO DEL MENU
        // =========================================

        this.cameras.main.setBackgroundColor("#05070d");

        this.fondo = this.add.image(
            640,
            360,
            "menu-fondo"
        );

        this.fondo
            .setDisplaySize(1280, 720)
            .setDepth(0);


        // =========================================
        // TITULO
        // =========================================

        this.add.text(
            640,
            220,
            "LOS 7 CUARZOS",
            {
                fontSize: "64px",
                color: "#00ffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setDepth(2);


        // =========================================
        // BOTON INICIO
        // =========================================

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
        )
        .setOrigin(0.5)
        .setDepth(2);


        boton.setInteractive({
            useHandCursor: true
        });


        // =========================================
        // AL HACER CLICK
        // =========================================

        boton.on("pointerdown", () => {

            this.scene.start("WorldScene");

        });

    }

}

