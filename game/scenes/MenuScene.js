```js
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
        // 🎧 AMBIENTE DEL INICIO
        // =========================================

        this.musicaMenu = this.sound.add(
            "musica-menu",
            {
                volume: 0.35,
                loop: true
            }
        );

        this.musicaMenu.play();


        // =========================================
        // ⚡ TITULO LOS 7 CUARZOS
        // =========================================

        const titulo = this.add.text(
            640,
            220,
            "LOS 7 CUARZOS",
            {
                fontSize: "68px",
                fontStyle: "bold",
                color: "#ffffff",
                stroke: "#00ffff",
                strokeThickness: 8,

                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: "#00ffff",
                    blur: 20,
                    stroke: true,
                    fill: true
                }
            }
        )
        .setOrigin(0.5)
        .setDepth(2);


        // =========================================
        // ✨ PULSO DEL TITULO
        // =========================================

        this.tweens.add({

            targets: titulo,

            alpha: {
                from: 0.75,
                to: 1
            },

            scale: {
                from: 1,
                to: 1.03
            },

            duration: 1200,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


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
```

