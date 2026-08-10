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
        // 💎 PUNTO GEMA DE ENERGÍA
        // =========================================

        this.puntoGemaEnergia = 2800;

        this.gemaEnergiaRecogida = false;


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


        this.tweens.add({

            targets: tituloValle,

            alpha: 1,
            scale: 1,

            duration: 1800,

            ease: "Sine.easeOut"

        });


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
        // 🤖 DRON
        // =========================================

        this.dron = this.add.container(
            1550,
            390
        );

        this.dron.setDepth(6);


        // =========================================
        // CUERPO DEL DRON
        // =========================================

        const cuerpoDron = this.add.graphics();

        cuerpoDron.fillStyle(
            0x18232d,
            1
        );

        cuerpoDron.fillRoundedRect(
            -48,
            -25,
            96,
            50,
            14
        );

        cuerpoDron.lineStyle(
            3,
            0x00ffff,
            1
        );

        cuerpoDron.strokeRoundedRect(
            -48,
            -25,
            96,
            50,
            14
        );

        this.dron.add(
            cuerpoDron
        );


        // =========================================
        // 👁️ VISOR
        // =========================================

        const visorDron = this.add.rectangle(
            0,
            0,
            42,
            13,
            0xff1744,
            1
        );

        visorDron.setStrokeStyle(
            2,
            0xff6680,
            1
        );

        this.dron.add(
            visorDron
        );


        // =========================================
        // 💡 LED
        // =========================================

        const haloLED = this.add.circle(
            0,
            0,
            18,
            0x00ffff,
            0.08
        );

        const ledExterior = this.add.circle(
            0,
            0,
            8,
            0x00ffff,
            0.45
        );

        const ledCentro = this.add.circle(
            0,
            0,
            4,
            0xffffff,
            1
        );

        this.dron.add([
            haloLED,
            ledExterior,
            ledCentro
        ]);


        // =========================================
        // 🪽 SOPORTES
        // =========================================

        const soporteIzq = this.add.rectangle(
            -63,
            0,
            18,
            5,
            0x00ffff,
            1
        );

        const soporteDer = this.add.rectangle(
            63,
            0,
            18,
            5,
            0x00ffff,
            1
        );

        this.dron.add([
            soporteIzq,
            soporteDer
        ]);


        // =========================================
        // 🔴 LUCES LATERALES
        // =========================================

        const luzIzq = this.add.circle(
            -39,
            22,
            4,
            0xff1744,
            1
        );

        const luzDer = this.add.circle(
            39,
            22,
            4,
            0xff1744,
            1
        );

        this.dron.add([
            luzIzq,
            luzDer
        ]);


        // =========================================
        // ✨ PULSO NORMAL LED
        // =========================================

        this.tweens.add({

            targets: [
                haloLED,
                ledExterior
            ],

            scale: {
                from: 0.8,
                to: 1.35
            },

            alpha: {
                from: 0.15,
                to: 0.65
            },

            duration: 650,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // =========================================
        // 👁️ ESTADO DEL DRON
        // =========================================

        this.dronDetectando = false;


        // =========================================
        // 👁️ DETECCION
        // =========================================

        this.comprobarVisionDron = () => {

            if (
                !this.dron ||
                !this.kael ||
                this.dronDetectando
            ) {
                return;
            }


            const distanciaX =
                Math.abs(
                    this.kael.x -
                    this.dron.x
                );


            const distanciaY =
                Math.abs(
                    this.kael.y -
                    this.dron.y
                );


            const veAKael =
                distanciaX < 500 &&
                distanciaY < 220;


            if (veAKael) {

                this.dronDetectando = true;


                // =================================
                // 🔴 CAMBIAR VISOR
                // =================================

                visorDron.setFillStyle(
                    0xff003c,
                    1
                );


                // =================================
                // 💡 LED ROJO
                // =================================

                haloLED.setFillStyle(
                    0xff1744,
                    1
                );

                ledExterior.setFillStyle(
                    0xff1744,
                    1
                );


                // =================================
                // 🚨 ALERTA
                // =================================

                this.mostrarAlertaDron();

            }

        };


        // =========================================
        // 🚨 ALERTA DEL DRON
        // =========================================

        this.mostrarAlertaDron = () => {

            const alerta = this.add.text(
                640,
                105,
                "¡ALERTA INTRUSO!",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    fontStyle: "bold",
                    color: "#ff304f",

                    stroke: "#160006",
                    strokeThickness: 5,

                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: "#ff1744",
                        blur: 12,
                        stroke: true,
                        fill: true
                    }
                }
            );

            alerta
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(90)
                .setAlpha(0)
                .setScale(0.8);


            this.tweens.add({

                targets: alerta,

                alpha: 1,
                scale: 1,

                duration: 300,

                ease: "Back.easeOut"

            });


            this.time.delayedCall(
                900,
                () => {

                    this.mostrarDialogoDron();

                }
            );


            this.time.delayedCall(
                2500,
                () => {

                    this.tweens.add({

                        targets: alerta,

                        alpha: 0,

                        y: 80,

                        duration: 400,

                        onComplete: () => {

                            alerta.destroy();

                        }

                    });

                }
            );

        };


        // =========================================
        // ☁️ CHISTE DE KAEL
        // =========================================

        this.mostrarDialogoDron = () => {

            if (!this.kael) {
                return;
            }


            const x =
                this.kael.x;

            const y =
                this.kael.y - 155;


            const nube =
                this.add.graphics();


            nube.setPosition(
                x,
                y
            );


            nube.fillStyle(
                0xffffff,
                1
            );


            nube.fillRoundedRect(
                -155,
                -58,
                310,
                116,
                32
            );


            nube.lineStyle(
                6,
                0x000000,
                1
            );


            nube.strokeRoundedRect(
                -155,
                -58,
                310,
                116,
                32
            );


            nube.fillStyle(
                0xffffff,
                1
            );


            nube.fillCircle(
                -48,
                76,
                15
            );

            nube.fillCircle(
                -30,
                103,
                10
            );

            nube.fillCircle(
                -14,
                123,
                7
            );


            nube.lineStyle(
                4,
                0x000000,
                1
            );


            nube.strokeCircle(
                -48,
                76,
                15
            );

            nube.strokeCircle(
                -30,
                103,
                10
            );

            nube.strokeCircle(
                -14,
                123,
                7
            );


            nube.setDepth(
                100
            );


            const textoKael =
                this.add.text(
                    x,
                    y,
                    "¿ALERTA INTRUSO? 😏\nTRANQUILO, DRON...\nSOLO ESTABA MIRANDO.\n¡AHORA SÍ ME TOCA CORRER!",
                    {
                        fontFamily: "Arial",
                        fontSize: "16px",
                        fontStyle: "bold",
                        color: "#000000",
                        align: "center",
                        lineSpacing: 4,
                        resolution: 2
                    }
                );


            textoKael
                .setOrigin(0.5)
                .setDepth(101);


            nube.setScale(0.7);
            nube.setAlpha(0);

            textoKael.setScale(0.7);
            textoKael.setAlpha(0);


            this.tweens.add({

                targets: [
                    nube,
                    textoKael
                ],

                scale: 1,
                alpha: 1,

                duration: 400,

                ease: "Back.easeOut"

            });


            const seguirNube =
                this.time.addEvent({

                    delay: 16,

                    repeat: 170,

                    callback: () => {

                        if (!this.kael) {
                            return;
                        }


                        nube.setPosition(
                            this.kael.x,
                            this.kael.y - 155
                        );


                        textoKael.setPosition(
                            this.kael.x,
                            this.kael.y - 155
                        );

                    }

                });


            this.time.delayedCall(
                3000,
                () => {

                    if (seguirNube) {
                        seguirNube.remove();
                    }


                    this.tweens.add({

                        targets: [
                            nube,
                            textoKael
                        ],

                        alpha: 0,

                        scale: 0.9,

                        duration: 450,

                        ease: "Sine.easeIn",

                        onComplete: () => {

                            nube.destroy();
                            textoKael.destroy();

                        }

                    });

                }
            );

        };


        // =========================================
        // 🔋 ENERGIA DE KAEL
        // =========================================

        this.energiaMaxima = 100;

        this.energiaKael = 77;

        this.costoSalto = 10;

        this.energiaMaxRecarga = 70;

        this.velocidadRecarga = 10;

        this.brilloEnergiaActivo = false;


        // =========================================
        // ⚡ IMPULSO DE LA GEMA
        // =========================================

        this.gemaEnergiaActiva = false;


        // =========================================
        // VELOCIDADES
        // =========================================

        this.velocidadNormal = 180;

        this.velocidadMedia = 150;

        this.velocidadBaja = 110;

        this.velocidadCritica = 70;


        this.velocidadNormalPotenciada = 300;

        this.velocidadMediaPotenciada = 245;

        this.velocidadBajaPotenciada = 180;

        this.velocidadCriticaPotenciada = 120;


        // =========================================
        // SALTO
        // =========================================

        this.fuerzaSalto = -500;

        this.fuerzaSaltoPotenciado = -680;


        // =========================================
        // 💎 GEMA DE ENERGÍA
        // =========================================

        this.gemaEnergia = this.add.image(
            this.puntoGemaEnergia,
            500,
            "gema-energia"
        );

        this.gemaEnergia
            .setOrigin(0.5)
            .setScale(0.075)
            .setDepth(8)
            .setAlpha(0.92);


        this.auraGemaEnergia = this.add.circle(
            this.puntoGemaEnergia,
            500,
            25,
            0xb400ff,
            0.10
        );

        this.auraGemaEnergia.setDepth(7);


        this.brilloGemaEnergia = this.add.circle(
            this.puntoGemaEnergia,
            500,
            12,
            0xe98cff,
            0.18
        );

        this.brilloGemaEnergia.setDepth(8);


        // =========================================
        // 💎 MOVIMIENTO GEMA
        // =========================================

        this.tweens.add({

            targets: [
                this.gemaEnergia,
                this.auraGemaEnergia,
                this.brilloGemaEnergia
            ],

            y: "-=18",

            duration: 1100,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets: this.gemaEnergia,

            x: this.puntoGemaEnergia + 3,

            duration: 150,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets: this.gemaEnergia,

            angle: 4,

            duration: 850,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets: this.auraGemaEnergia,

            scale: {
                from: 0.75,
                to: 1.45
            },

            alpha: {
                from: 0.06,
                to: 0.20
            },

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets: this.brilloGemaEnergia,

            scale: {
                from: 0.7,
                to: 1.4
            },

            alpha: {
                from: 0.10,
                to: 0.35
            },

            duration: 700,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets: this.gemaEnergia,

            alpha: {
                from: 0.78,
                to: 1
            },

            duration: 800,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // =========================================
        // ⚡ ACTIVAR GEMA
        // =========================================

        this.activarGemaEnergia = () => {

            if (
                this.gemaEnergiaRecogida ||
                !this.gemaEnergia ||
                !this.kael
            ) {
                return;
            }


            this.gemaEnergiaRecogida = true;


            this.tweens.killTweensOf(
                this.gemaEnergia
            );

            this.tweens.killTweensOf(
                this.auraGemaEnergia
            );

            this.tweens.killTweensOf(
                this.brilloGemaEnergia
            );


            const explosion =
                this.add.circle(
                    this.gemaEnergia.x,
                    this.gemaEnergia.y,
                    12,
                    0xd95cff,
                    0.65
                );

            explosion.setDepth(10);


            this.tweens.add({

                targets: explosion,

                scale: 4,

                alpha: 0,

                duration: 500,

                ease: "Cubic.easeOut",

                onComplete: () => {

                    explosion.destroy();

                }

            });


            for (let i = 0; i < 18; i++) {

                const particula =
                    this.add.circle(
                        this.gemaEnergia.x,
                        this.gemaEnergia.y,
                        Phaser.Math.Between(3, 6),
                        Phaser.Utils.Array.GetRandom([
                            0xd95cff,
                            0xb400ff,
                            0xe98cff,
                            0xffffff
                        ]),
                        Phaser.Math.FloatBetween(
                            0.65,
                            1
                        )
                    );

                particula.setDepth(11);


                this.tweens.add({

                    targets: particula,

                    x:
                        this.kael.x +
                        Phaser.Math.Between(-18, 18),

                    y:
                        this.kael.y +
                        Phaser.Math.Between(-18, 18),

                    scale: 0.2,

                    alpha: 0,

                    duration:
                        Phaser.Math.Between(
                            600,
                            1000
                        ),

                    delay: i * 25,

                    ease: "Cubic.easeIn",

                    onComplete: () => {

                        particula.destroy();

                    }

                });

            }


            const energiaPrincipal =
                this.add.circle(
                    this.gemaEnergia.x,
                    this.gemaEnergia.y,
                    9,
                    0xffffff,
                    0.95
                );

            energiaPrincipal.setDepth(12);


            this.tweens.add({

                targets: energiaPrincipal,

                x: this.kael.x,

                y: this.kael.y,

                scale: 0.35,

                duration: 900,

                ease: "Cubic.easeIn",

                onComplete: () => {

                    energiaPrincipal.destroy();

                    this.energiaKael =
                        this.energiaMaxima;

                    this.actualizarBarraEnergia();

                    this.gemaEnergiaActiva = true;

                    this.brilloKaelEnergia();


                    const haloEnergia =
                        this.add.circle(
                            this.kael.x,
                            this.kael.y,
                            30,
                            0xb400ff,
                            0.12
                        );

                    haloEnergia.setDepth(6);


                    this.tweens.add({

                        targets: haloEnergia,

                        scale: 2.2,

                        alpha: 0,

                        duration: 900,

                        ease: "Cubic.easeOut",

                        onUpdate: () => {

                            if (this.kael) {

                                haloEnergia.x =
                                    this.kael.x;

                                haloEnergia.y =
                                    this.kael.y;

                            }

                        },

                        onComplete: () => {

                            haloEnergia.destroy();

                        }

                    });


                    this.mostrarDialogoKael();


                    this.tweens.add({

                        targets: [
                            this.gemaEnergia,
                            this.auraGemaEnergia,
                            this.brilloGemaEnergia
                        ],

                        scale: 0,

                        alpha: 0,

                        duration: 500,

                        ease: "Back.easeIn",

                        onComplete: () => {

                            this.gemaEnergia.destroy();

                            this.auraGemaEnergia.destroy();

                            this.brilloGemaEnergia.destroy();

                            this.gemaEnergia = null;

                            this.auraGemaEnergia = null;

                            this.brilloGemaEnergia = null;

                        }

                    });

                }

            });

        };


        // =========================================
        // ☁️ DIALOGO ORIGINAL DE KAEL
        // =========================================

        this.mostrarDialogoKael = () => {

            if (!this.kael) {
                return;
            }


            const x =
                this.kael.x;

            const y =
                this.kael.y - 155;


            const nube =
                this.add.graphics();

            nube.setPosition(
                x,
                y
            );


            nube.fillStyle(
                0xffffff,
                1
            );


            nube.fillRoundedRect(
                -155,
                -58,
                310,
                116,
                32
            );


            nube.lineStyle(
                6,
                0x000000,
                1
            );


            nube.strokeRoundedRect(
                -155,
                -58,
                310,
                116,
                32
            );


            nube.fillStyle(
                0xffffff,
                1
            );


            nube.fillCircle(
                -48,
                76,
                15
            );

            nube.fillCircle(
                -30,
                103,
                10
            );

            nube.fillCircle(
                -14,
                123,
                7
            );


            nube.lineStyle(
                4,
                0x000000,
                1
            );


            nube.strokeCircle(
                -48,
                76,
                15
            );

            nube.strokeCircle(
                -30,
                103,
                10
            );

            nube.strokeCircle(
                -14,
                123,
                7
            );


            nube.setDepth(
                100
            );


            const textoKael =
                this.add.text(
                    x,
                    y,
                    "100% DE ENERGÍA...\nY YO QUE PENSABA\nQUE VENÍA A CAMINAR.",
                    {
                        fontFamily: "Arial",
                        fontSize: "18px",
                        fontStyle: "bold",
                        color: "#000000",
                        align: "center",
                        lineSpacing: 5,
                        resolution: 2
                    }
                );


            textoKael
                .setOrigin(0.5)
                .setDepth(101);


            nube.setScale(0.7);
            nube.setAlpha(0);

            textoKael.setScale(0.7);
            textoKael.setAlpha(0);


            this.tweens.add({

                targets: [
                    nube,
                    textoKael
                ],

                scale: 1,

                alpha: 1,

                duration: 400,

                ease: "Back.easeOut"

            });


            const seguirNube =
                this.time.addEvent({

                    delay: 16,

                    repeat: 170,

                    callback: () => {

                        if (!this.kael) {
                            return;
                        }


                        nube.setPosition(
                            this.kael.x,
                            this.kael.y - 155
                        );

                        textoKael.setPosition(
                            this.kael.x,
                            this.kael.y - 155
                        );

                    }

                });


            this.time.delayedCall(
                2700,
                () => {

                    if (seguirNube) {
                        seguirNube.remove();
                    }


                    this.tweens.add({

                        targets: [
                            nube,
                            textoKael
                        ],

                        alpha: 0,

                        scale: 0.9,

                        duration: 450,

                        ease: "Sine.easeIn",

                        onComplete: () => {

                            nube.destroy();

                            textoKael.destroy();

                            this.mostrarAvisoCuarzo();

                        }

                    });

                }
            );

        };


        // =========================================
        // ✨ AVISO DEL CUARZO
        // =========================================

        this.mostrarAvisoCuarzo = () => {

            const destelloDorado =
                this.add.rectangle(
                    640,
                    360,
                    1280,
                    720,
                    0xffd966,
                    0
                );

            destelloDorado
                .setScrollFactor(0)
                .setDepth(80);


            this.tweens.add({

                targets: destelloDorado,

                alpha: 0.42,

                duration: 130,

                yoyo: true,

                ease: "Quad.easeOut",

                onComplete: () => {

                    destelloDorado.destroy();

                }

            });


            const aviso = this.add.text(
                640,
                55,
                "¡RECOGE EL CUARZO DEL ALMA\nANTES DE QUE SE ACABE EL TIEMPO!",
                {
                    fontSize: "21px",
                    fontStyle: "bold",
                    color: "#fff4bd",
                    align: "center",

                    stroke: "#4a2800",
                    strokeThickness: 4,

                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: "#ffd966",
                        blur: 14,
                        stroke: true,
                        fill: true
                    }
                }
            );

            aviso
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(82)
                .setAlpha(0)
                .setScale(0.92);


            this.tweens.add({

                targets: aviso,

                alpha: 1,

                scale: 1,

                duration: 450,

                ease: "Back.easeOut"

            });


            this.tweens.add({

                targets: aviso,

                alpha: {
                    from: 0.82,
                    to: 1
                },

                duration: 700,

                yoyo: true,

                repeat: 2,

                ease: "Sine.easeInOut"

            });


            this.time.delayedCall(
                4200,
                () => {

                    this.tweens.add({

                        targets: aviso,

                        alpha: 0,

                        y: 35,

                        duration: 650,

                        ease: "Sine.easeIn",

                        onComplete: () => {

                            aviso.destroy();

                        }

                    });

                }
            );

        };


        // =========================================
        // BARRA ENERGIA
        // =========================================

        this.barraEnergiaMarco =
            this.add.graphics();

        this.barraEnergiaMarco
            .setScrollFactor(0)
            .setDepth(50);


        this.barraEnergiaFondo =
            this.add.graphics();

        this.barraEnergiaFondo
            .setScrollFactor(0)
            .setDepth(50);


        this.barraEnergia =
            this.add.graphics();

        this.barraEnergia
            .setScrollFactor(0)
            .setDepth(51);


        this.textoEnergia =
            this.add.text(
                55,
                38,
                "ENERGÍA  77 / 100",
                {
                    fontSize: "17px",
                    fontStyle: "bold",
                    color: "#d9ffff",

                    stroke: "#061316",
                    strokeThickness: 4,

                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: "#00ffff",
                        blur: 8,
                        stroke: true,
                        fill: true
                    }
                }
            )
            .setScrollFactor(0)
            .setDepth(52);


        this.actualizarBarraEnergia();


        this.tweens.add({

            targets: this.barraEnergia,

            alpha: {
                from: 0.88,
                to: 1
            },

            duration: 900,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


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

                        const pulso =
                            this.add.circle(
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


            this.time.delayedCall(
                7 * 650 + 1000,
                () => {

                    const cuarzo =
                        this.add.circle(
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
    // 🔋 ACTUALIZAR BARRA
    // =============================================

    actualizarBarraEnergia() {

        const x = 55;
        const y = 65;
        const ancho = 245;
        const alto = 22;

        const porcentaje =
            this.energiaKael /
            this.energiaMaxima;


        this.barraEnergiaMarco.clear();
        this.barraEnergiaFondo.clear();
        this.barraEnergia.clear();


        this.barraEnergiaMarco.fillStyle(
            0x071316,
            0.95
        );

        this.barraEnergiaMarco.fillRoundedRect(
            x - 6,
            y - 6,
            ancho + 12,
            alto + 12,
            8
        );


        this.barraEnergiaMarco.lineStyle(
            2,
            0x00ffff,
            0.9
        );

        this.barraEnergiaMarco.strokeRoundedRect(
            x - 6,
            y - 6,
            ancho + 12,
            alto + 12,
            8
        );


        this.barraEnergiaFondo.fillStyle(
            0x06191b,
            1
        );

        this.barraEnergiaFondo.fillRoundedRect(
            x,
            y,
            ancho,
            alto,
            5
        );


        const anchoEnergia =
            ancho * porcentaje;


        if (anchoEnergia > 0) {

            this.barraEnergia.fillStyle(
                0x00ff88,
                1
            );

            this.barraEnergia.fillRoundedRect(
                x,
                y,
                anchoEnergia,
                alto,
                5
            );


            this.barraEnergia.fillStyle(
                0x00ffff,
                0.55
            );

            this.barraEnergia.fillRoundedRect(
                x + 3,
                y + 3,
                Math.max(
                    0,
                    anchoEnergia - 6
                ),
                alto - 6,
                3
            );


            this.barraEnergia.fillStyle(
                0xffffff,
                0.30
            );

            this.barraEnergia.fillRoundedRect(
                x + 4,
                y + 3,
                Math.max(
                    0,
                    anchoEnergia - 8
                ),
                4,
                2
            );

        }


        this.textoEnergia.setText(
            "ENERGÍA  " +
            Math.floor(this.energiaKael) +
            " / " +
            this.energiaMaxima
        );

    }


    // =============================================
    // ✨ BRILLO KAEL
    // =============================================

    brilloKaelEnergia() {

        if (!this.kael) {
            return;
        }

        if (this.brilloEnergiaActivo) {
            return;
        }

        this.brilloEnergiaActivo = true;


        const escalaOriginalX =
            this.kael.scaleX;

        const escalaOriginalY =
            this.kael.scaleY;


        this.kael.setTint(
            0x66ffff
        );


        this.tweens.add({

            targets: this.kael,

            scaleX:
                escalaOriginalX * 1.12,

            scaleY:
                escalaOriginalY * 1.12,

            duration: 180,

            yoyo: true,

            ease: "Sine.easeOut"

        });


        const aura =
            this.add.circle(
                this.kael.x,
                this.kael.y,
                28,
                0x00ffff,
                0.18
            );


        aura
            .setScrollFactor(1)
            .setDepth(4);


        this.tweens.add({

            targets: aura,

            scale: 2.4,

            alpha: 0,

            duration: 500,

            ease: "Cubic.easeOut",

            onUpdate: () => {

                if (this.kael) {

                    aura.x =
                        this.kael.x;

                    aura.y =
                        this.kael.y;

                }

            },

            onComplete: () => {

                aura.destroy();

            }

        });


        this.time.delayedCall(
            450,
            () => {

                if (this.kael) {
                    this.kael.clearTint();
                }

                this.brilloEnergiaActivo = false;

            }
        );

    }


    // =============================================
    // 💥 FINAL DEL VALLE
    // =============================================

    finalizarValle() {

        if (this.finalizando) {
            return;
        }

        this.finalizando = true;


        if (this.kael) {

            this.kael.setVelocity(
                0,
                0
            );

            this.kael.body.enable = false;

        }


        const destello =
            this.add.rectangle(
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

            alpha: 0.9,

            duration: 160,

            yoyo: true,

            ease: "Quad.easeOut"

        });


        const colores = [

            0x00ffff,
            0x9b00ff,
            0x0066ff,
            0xff1744,
            0x00ff88,
            0xffd700,
            0xff66cc,
            0x7b4cff

        ];


        for (let i = 0; i < 150; i++) {

            const ancho =
                Phaser.Math.Between(
                    15,
                    110
                );

            const alto =
                Phaser.Math.Between(
                    10,
                    75
                );

            const x =
                Phaser.Math.Between(
                    -50,
                    1330
                );

            const y =
                Phaser.Math.Between(
                    -40,
                    760
                );

            const color =
                Phaser.Utils.Array.GetRandom(
                    colores
                );


            const fragmento =
                this.add.rectangle(
                    x,
                    y,
                    ancho,
                    alto,
                    color,
                    Phaser.Math.FloatBetween(
                        0.55,
                        0.95
                    )
                );


            fragmento
                .setScrollFactor(0)
                .setDepth(101);


            if (i % 4 === 0) {

                fragmento.setStrokeStyle(
                    2,
                    0xffffff,
                    0.45
                );

            }


            const destinoX =
                x +
                Phaser.Math.Between(
                    -700,
                    700
                );

            const destinoY =
                y +
                Phaser.Math.Between(
                    -550,
                    550
                );


            this.tweens.add({

                targets: fragmento,

                x: destinoX,

                y: destinoY,

                angle:
                    Phaser.Math.Between(
                        -360,
                        360
                    ),

                scaleX:
                    Phaser.Math.FloatBetween(
                        0.05,
                        0.25
                    ),

                scaleY:
                    Phaser.Math.FloatBetween(
                        0.05,
                        0.25
                    ),

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        1100,
                        1900
                    ),

                delay:
                    Phaser.Math.Between(
                        0,
                        350
                    ),

                ease: "Cubic.easeIn"

            });

        }


        const elementosMundo = [

            this.sky,
            this.cables,
            this.floorImage,
            this.gemaEnergia,
            this.dron

        ].filter(
            elemento => elemento
        );


        this.tweens.add({

            targets: elementosMundo,

            alpha: 0,

            scaleX: 1.04,

            scaleY: 1.04,

            duration: 1500,

            ease: "Cubic.easeIn"

        });


        if (this.kael) {

            this.tweens.add({

                targets: this.kael,

                alpha: 0,

                scale: 0.15,

                angle: 360,

                duration: 1100,

                ease: "Cubic.easeIn"

            });

        }


        const negro =
            this.add.rectangle(
                640,
                360,
                1280,
                720,
                0x05070d,
                0
            );

        negro
            .setScrollFactor(0)
            .setDepth(105);


        this.tweens.add({

            targets: negro,

            alpha: 0.35,

            duration: 1300,

            ease: "Sine.easeInOut"

        });


        this.time.delayedCall(
            1900,
            () => {

                const flashBlanco =
                    this.add.rectangle(
                        640,
                        360,
                        1280,
                        720,
                        0xffffff,
                        0
                    );

                flashBlanco
                    .setScrollFactor(0)
                    .setDepth(200);


                this.tweens.add({

                    targets: flashBlanco,

                    alpha: 1,

                    duration: 180,

                    ease: "Quad.easeOut",

                    onComplete: () => {

                        flashBlanco.setFillStyle(
                            0xffd966,
                            1
                        );


                        this.tweens.add({

                            targets: flashBlanco,

                            duration: 220,

                            ease: "Sine.easeInOut",

                            onComplete: () => {

                                flashBlanco.setFillStyle(
                                    0xffffff,
                                    1
                                );


                                this.tweens.add({

                                    targets: flashBlanco,

                                    duration: 160,

                                    ease: "Sine.easeOut",

                                    onComplete: () => {

                                        this.tweens.add({

                                            targets: flashBlanco,

                                            alpha: 0,

                                            duration: 450,

                                            ease: "Sine.easeInOut",

                                            onComplete: () => {

                                                flashBlanco.destroy();

                                                negro.destroy();

                                                destello.destroy();


                                                if (
                                                    this.musicaValle
                                                ) {

                                                    this.musicaValle.stop();

                                                    this.musicaValle.destroy();

                                                    this.musicaValle = null;

                                                }


                                                this.scene.start(
                                                    "MenuScene"
                                                );

                                            }

                                        });

                                    }

                                });

                            }

                        });

                    }

                });

            }
        );

    }


    // =============================================
    // UPDATE
    // =============================================

    update(time, delta) {

        if (this.finalizando) {
            return;
        }


        // =========================================
        // 🛼 VELOCIDAD SEGUN ENERGIA
        // =========================================

        let velocidadActual;


        if (this.energiaKael >= 70) {

            velocidadActual =
                this.gemaEnergiaActiva
                    ? this.velocidadNormalPotenciada
                    : this.velocidadNormal;

        }

        else if (this.energiaKael >= 30) {

            velocidadActual =
                this.gemaEnergiaActiva
                    ? this.velocidadMediaPotenciada
                    : this.velocidadMedia;

        }

        else if (this.energiaKael >= 10) {

            velocidadActual =
                this.gemaEnergiaActiva
                    ? this.velocidadBajaPotenciada
                    : this.velocidadBaja;

        }

        else {

            velocidadActual =
                this.gemaEnergiaActiva
                    ? this.velocidadCriticaPotenciada
                    : this.velocidadCritica;

        }


        // =========================================
        // MOVIMIENTO KAEL
        // =========================================

        if (
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ) {

            this.kael.setVelocityX(
                -velocidadActual
            );

            this.kael.setFlipX(
                true
            );

        }

        else if (
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ) {

            this.kael.setVelocityX(
                velocidadActual
            );

            this.kael.setFlipX(
                false
            );

        }

        else {

            this.kael.setVelocityX(
                0
            );

        }


        // =========================================
        // 🛼 SALTO + CONSUMO
        // =========================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            )
            &&
            this.kael.body.blocked.down
            &&
            this.energiaKael >= this.costoSalto
        ) {

            this.energiaKael -=
                this.costoSalto;


            if (this.energiaKael < 0) {
                this.energiaKael = 0;
            }


            this.actualizarBarraEnergia();


            this.kael.setVelocityY(

                this.gemaEnergiaActiva
                    ? this.fuerzaSaltoPotenciado
                    : this.fuerzaSalto

            );

        }


        // =========================================
        // 🔋 RECARGA
        // =========================================

        if (
            this.kael.body.blocked.down &&
            this.kael.body.velocity.x === 0 &&
            this.energiaKael < this.energiaMaxRecarga
        ) {

            const energiaAnterior =
                this.energiaKael;


            this.energiaKael +=
                this.velocidadRecarga *
                (delta / 1000);


            if (
                this.energiaKael >
                this.energiaMaxRecarga
            ) {

                this.energiaKael =
                    this.energiaMaxRecarga;

            }


            if (
                this.energiaKael !==
                energiaAnterior
            ) {

                this.actualizarBarraEnergia();

            }


            if (
                energiaAnterior <
                this.energiaMaxRecarga
                &&
                this.energiaKael >=
                this.energiaMaxRecarga
            ) {

                this.energiaKael =
                    this.energiaMaxRecarga;

                this.actualizarBarraEnergia();

                this.brilloKaelEnergia();

            }

        }


        // =========================================
        // 💎 GEMA DE ENERGÍA
        // =========================================

        if (
            !this.gemaEnergiaRecogida &&
            this.gemaEnergia &&
            this.kael.x >=
            this.puntoGemaEnergia - 35
        ) {

            this.activarGemaEnergia();

        }


        // =========================================
        // ⚡ CUARZO
        // =========================================

        if (
            this.kael.x >=
            this.puntoCuarzo - 250
        ) {

            this.activarCuarzo();

        }


        // =========================================
        // 👁️ VISIÓN DEL DRON
        // =========================================

        if (
            this.comprobarVisionDron
        ) {

            this.comprobarVisionDron();

        }

    }

}
     

     

