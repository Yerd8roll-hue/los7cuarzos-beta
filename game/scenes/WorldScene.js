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
        // 🎵 MUSICA DEL VALLE
        // =========================================

        this.musicaValle = this.sound.add(
            "musica-valle",
            {
                volume: 0.35,
                loop: false
            }
        );

        this.musicaValle.play();


        // =========================================
        // FIN DE LA CANCION
        // =========================================

        this.musicaValle.once(
            "complete",
            () => {

                this.finalizarValle();

            }
        );


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
        // 🌌 AURA DEL TITULO
        // =========================================

        const auraTitulo = this.add.circle(
            640,
            120,
            85,
            0x9b00ff,
            0.06
        );

        auraTitulo
            .setScrollFactor(0)
            .setDepth(19)
            .setAlpha(0);


        // =========================================
        // 🌌 TITULO
        // =========================================

        const tituloValle = this.add.text(
            640,
            120,
            "VALLE DEL CUARZO\nDEL ALMA",
            {
                fontSize: "30px",
                fontStyle: "normal",
                color: "#e8e8ff",
                stroke: "#7b4cff",
                strokeThickness: 2,
                align: "center",

                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: "#9b00ff",
                    blur: 12,
                    stroke: true,
                    fill: true
                }
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(20)
        .setAlpha(0)
        .setScale(0.96);


        // =========================================
        // ✨ ENTRADA DEL TITULO
        // =========================================

        this.tweens.add({

            targets: tituloValle,

            alpha: 1,
            scale: 1,

            duration: 1800,

            ease: "Sine.easeOut"

        });


        // =========================================
        // AURA RESPIRANDO
        // =========================================

        this.tweens.add({

            targets: auraTitulo,

            alpha: {
                from: 0,
                to: 0.18
            },

            scale: {
                from: 0.8,
                to: 1.15
            },

            duration: 2200,

            yoyo: true,

            repeat: 3,

            ease: "Sine.easeInOut"

        });


        // =========================================
        // 🌫️ DESAPARECER TITULO
        // =========================================

        this.time.delayedCall(
            10000,
            () => {

                this.tweens.add({

                    targets: [
                        tituloValle,
                        auraTitulo
                    ],

                    alpha: 0,

                    duration: 1800,

                    ease: "Sine.easeInOut",

                    onComplete: () => {

                        tituloValle.destroy();

                        auraTitulo.destroy();

                    }

                });

            }
        );


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

                            ease: "Cubic.easeOut",

                            onComplete: () => {

                                pulso.destroy();

                            }

                        });

                    }
                );

            }


            // =====================================
            // 💎 CUARZO DEL ALMA
            // =====================================

            this.time.delayedCall(
                7 * 650 + 1000,
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


    // =============================================
    // 💥 FINAL DEL VALLE
    // =============================================

    finalizarValle() {

        // Evitar que se ejecute dos veces
        if (this.finalizando) {
            return;
        }

        this.finalizando = true;


        // =========================================
        // DETENER MOVIMIENTO
        // =========================================

        if (this.kael) {

            this.kael.setVelocity(
                0,
                0
            );

            this.kael.body.enable = false;

        }


        // =========================================
        // ⚡ DESTELLO
        // =========================================

        const destello = this.add.rectangle(
            640,
            360,
            1280,
            720,
            0xffffff,
            0
        );

        destello
            .setScrollFactor(0)
            .setDepth(100);


        this.tweens.add({

            targets: destello,

            alpha: 0.95,

            duration: 180,

            yoyo: true,

            ease: "Quad.easeOut"

        });


        // =========================================
        // 💥 CREAR FRAGMENTOS
        // =========================================

        const fragmentos = [];


        for (let i = 0; i < 55; i++) {

            const ancho =
                Phaser.Math.Between(25, 100);

            const alto =
                Phaser.Math.Between(15, 70);


            const x =
                Phaser.Math.Between(
                    0,
                    1280
                );

            const y =
                Phaser.Math.Between(
                    0,
                    720
                );


            const fragmento =
                this.add.rectangle(
                    x,
                    y,
                    ancho,
                    alto,
                    i % 3 === 0
                        ? 0x9b00ff
                        : 0x05070d,
                    Phaser.Math.FloatBetween(
                        0.45,
                        0.9
                    )
                );


            fragmento
                .setScrollFactor(0)
                .setDepth(101);


            fragmentos.push(
                fragmento
            );


            // Dirección aleatoria
            const destinoX =
                x +
                Phaser.Math.Between(
                    -500,
                    500
                );

            const destinoY =
                y +
                Phaser.Math.Between(
                    -400,
                    400
                );


            this.tweens.add({

                targets: fragmento,

                x: destinoX,

                y: destinoY,

                angle:
                    Phaser.Math.Between(
                        -180,
                        180
                    ),

                scaleX: 0.1,

                scaleY: 0.1,

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        900,
                        1500
                    ),

                delay:
                    Phaser.Math.Between(
                        0,
                        250
                    ),

                ease: "Cubic.easeIn"

            });

        }


        // =========================================
        // 🟪 KAEL SE FRAGMENTA
        // =========================================

        if (this.kael) {

            this.tweens.add({

                targets: this.kael,

                alpha: 0,

                scale: 0.2,

                angle: 180,

                duration: 900,

                ease: "Cubic.easeIn"

            });

        }


        // =========================================
        // 🌑 OSCURECER
        // =========================================

        this.time.delayedCall(
            1300,
            () => {

                const negro = this.add.rectangle(
                    640,
                    360,
                    1280,
                    720,
                    0x000000,
                    0
                );

                negro
                    .setScrollFactor(0)
                    .setDepth(110);


                this.tweens.add({

                    targets: negro,

                    alpha: 1,

                    duration: 1000,

                    ease: "Sine.easeInOut",

                    onComplete: () => {

                        // =================================
                        // 🎵 DETENER MUSICA DEL VALLE
                        // =================================

                        if (this.musicaValle) {

                            this.musicaValle.stop();

                            this.musicaValle.destroy();

                            this.musicaValle = null;

                        }


                        // =================================
                        // 🎬 VOLVER AL MENU
                        // =================================

                        this.scene.start(
                            "MenuScene"
                        );

                    }

                });

            }
        );

    }


    update() {

        // Si el Valle está terminando,
        // no permitir movimiento.

        if (this.finalizando) {
            return;
        }


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
            this.kael.x >=
            this.puntoCuarzo - 250
        ) {

            this.activarCuarzo();

        }

    }

}




