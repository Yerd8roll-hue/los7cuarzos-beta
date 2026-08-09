import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // =========================================
        // COLOR DE FONDO
        // =========================================

        this.cameras.main.setBackgroundColor("#05070d");


        // =========================================
        // MUNDO
        // =========================================

        const mundoAncho = 3000;

        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            720
        );


        // =========================================
        // SKY
        // =========================================

        this.sky = this.add.image(
            0,
            0,
            "sky"
        );

        this.sky
            .setOrigin(0, 0)
            .setDepth(0)
            .setScrollFactor(0);


        // =========================================
        // CABLES
        // =========================================

        this.cables = this.add.image(
            0,
            0,
            "cables"
        );

        this.cables
            .setOrigin(0, 0)
            .setDepth(2);


        // =========================================
        // PUNTO DEL CUARZO
        // =========================================

        this.puntoCuarzo = 1672;
        this.eventoCuarzoActivo = false;


        // =========================================
        // FLOOR VISUAL
        // =========================================

        this.floorImage = this.add.image(
            0,
            570,
            "floor"
        );

        this.floorImage
            .setOrigin(0, 0)
            .setDisplaySize(
                mundoAncho,
                150
            )
            .setDepth(3);


        // =========================================
        // PISO FISICO
        // =========================================

        this.ground = this.add.rectangle(
            mundoAncho / 2,
            650,
            mundoAncho,
            50,
            0x000000,
            0
        );

        this.physics.add.existing(
            this.ground,
            true
        );


        // =========================================
        // TITULO
        // =========================================

        this.add.text(
            640,
            50,
            "VALLE DEL CUARZO\nDEL ALMA",
            {
                fontSize: "32px",
                color: "#00ffff",
                fontStyle: "bold",
                align: "center"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(10);


        // =========================================
        // KAEL
        // =========================================

        createKaelAnimations(this);

        this.kael = this.physics.add.sprite(
            200,
            450,
            "kael"
        );

        this.kael.setDepth(5);

        this.kael.setBounce(0);

        this.kael.setCollideWorldBounds(true);


        this.physics.add.collider(
            this.kael,
            this.ground
        );


        // =========================================
        // CAMARA
        // =========================================

        this.cameras.main.startFollow(
            this.kael,
            true
        );

        this.cameras.main.setBounds(
            0,
            0,
            mundoAncho,
            720
        );


        // =========================================
        // CONTROLES
        // =========================================

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keys =
            this.input.keyboard.addKeys({

                A: Phaser.Input.Keyboard.KeyCodes.A,

                D: Phaser.Input.Keyboard.KeyCodes.D,

                SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE

            });


        // =========================================
        // ⚡ FUNCIÓN DE LOS 7 PULSOS
        // =========================================

        this.activarCuarzo = () => {

            if (this.eventoCuarzoActivo) {
                return;
            }

            this.eventoCuarzoActivo = true;


            // =====================================
            // 7 PULSOS DE ENERGÍA
            // =====================================

            for (let i = 0; i < 7; i++) {

                const pulso = this.add.circle(
                    this.puntoCuarzo,
                    330,
                    45,
                    0x00ffff,
                    0
                );

                pulso.setStrokeStyle(
                    8,
                    0x00ffff,
                    1
                );

                pulso.setDepth(8);

                pulso.setScale(0.2);

                this.tweens.add({

                    targets: pulso,

                    scale: 4,

                    alpha: 0,

                    duration: 1000,

                    delay: i * 700,

                    ease: "Cubic.easeOut",

                    onComplete: () => {

                        pulso.destroy();

                    }

                });

            }


            // =====================================
            // 💎 CUARZO DEL ALMA
            // =====================================

            this.time.delayedCall(
                7 * 700 + 1000,
                () => {

                    const cuarzo = this.add.circle(
                        this.puntoCuarzo,
                        330,
                        50,
                        0x9b00ff,
                        1
                    );

                    cuarzo.setDepth(9);

                    this.tweens.add({

                        targets: cuarzo,

                        scale: {
                            from: 0.6,
                            to: 1.3
                        },

                        alpha: {
                            from: 0.5,
                            to: 1
                        },

                        duration: 700,

                        yoyo: true,

                        repeat: -1,

                        ease: "Sine.easeInOut"

                    });

                }
            );

        };

    }


    update() {


        // =========================================
        // MOVIMIENTO KAEL
        // =========================================

        if (
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ) {

            this.kael.setVelocityX(-180);

            this.kael.setFlipX(true);

        }

        else if (
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ) {

            this.kael.setVelocityX(180);

            this.kael.setFlipX(false);

        }

        else {

            this.kael.setVelocityX(0);

        }


        // =========================================
        // SALTO
        // =========================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            )
            &&
            this.kael.body.blocked.down
        ) {

            this.kael.setVelocityY(-500);

        }


        // =========================================
        // ⚡ LLEGADA AL CUARZO
        // =========================================

        if (
            this.kael.x >= this.puntoCuarzo - 250
        ) {

            this.activarCuarzo();

        }

    }

}


      
