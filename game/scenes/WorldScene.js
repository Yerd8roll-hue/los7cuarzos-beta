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
        // PUNTO DE TRANSICIÓN / CUARZO
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
        // PISO FÍSICO
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
        // TÍTULO
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
        // CÁMARA
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
        // ⚡ EVENTO DE LOS 7 PULSOS
        // =========================================

        this.activarCuarzo = () => {

            if (this.eventoCuarzoActivo) {
                return;
            }

            this.eventoCuarzoActivo = true;


            for (let i = 0; i < 7; i++) {

                this.time.delayedCall(
                    i * 650,
                    () => {

                        // ---------------------------------
                        // HAZ PRINCIPAL
                        // ---------------------------------

                        const haz = this.add.rectangle(
                            this.puntoCuarzo,
                            360,
                            28,
                            720,
                            0x00ffff,
                            0
                        );

                        haz.setDepth(8);


                        // ---------------------------------
                        // HAZ EXTERIOR
                        // ---------------------------------

                        const brillo = this.add.rectangle(
                            this.puntoCuarzo,
                            360,
                            100,
                            720,
                            0x00ffff,
                            0
                        );

                        brillo.setDepth(7);


                        // ---------------------------------
                        // PULSO
                        // ---------------------------------

                        this.tweens.add({

                            targets: haz,

                            alpha: {
                                from: 0,
                                to: 0.85
                            },

                            scaleX: {
                                from: 0.3,
                                to: 2
                            },

                            duration: 180,

                            yoyo: true,

                            ease: "Cubic.easeOut",

                            onComplete: () => {

                                haz.destroy();

                            }

                        });


                        this.tweens.add({

                            targets: brillo,

                            alpha: {
                                from: 0,
                                to: 0.25
                            },

                            scaleX: {
                                from: 0.2,
                                to: 1
                            },

                            duration: 280,

                            yoyo: true,

                            ease: "Cubic.easeOut",

                            onComplete: () => {

                                brillo.destroy();

                            }

                        });


                        // ---------------------------------
                        // RAYOS LATERALES
                        // ---------------------------------

                        const rayo = this.add.graphics();

                        rayo.lineStyle(
                            5,
                            0x00ffff,
                            1
                        );

                        rayo.beginPath();

                        rayo.moveTo(
                            this.puntoCuarzo - 70,
                            150
                        );

                        rayo.lineTo(
                            this.puntoCuarzo + 30,
                            270
                        );

                        rayo.lineTo(
                            this.puntoCuarzo - 30,
                            390
                        );

                        rayo.lineTo(
                            this.puntoCuarzo + 60,
                            520
                        );

                        rayo.lineTo(
                            this.puntoCuarzo - 20,
                            680
                        );

                        rayo.strokePath();

                        rayo.setDepth(9);

                        this.tweens.add({

                            targets: rayo,

                            alpha: 0,

                            duration: 350,

                            ease: "Power2",

                            onComplete: () => {

                                rayo.destroy();

                            }

                        });

                    }
                );

            }


            // =====================================
            // 💎 APARICIÓN DEL CUARZO
            // =====================================

            this.time.delayedCall(
                7 * 650 + 500,
                () => {

                    const cuarzo = this.add.circle(
                        this.puntoCuarzo,
                        330,
                        45,
                        0x9b00ff,
                        1
                    );

                    cuarzo.setDepth(9);

                    this.tweens.add({

                        targets: cuarzo,

                        scale: {
                            from: 0.6,
                            to: 1.25
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
        // ⬆️ SALTO
        // =========================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            )
            &&
            this.kael.body.blocked.down
        ) {

            this.kael.setVelocityY(-600);

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
