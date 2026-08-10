import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }


    create() {

        // =========================================================
        // COLOR DE FONDO
        // =========================================================

        this.cameras.main.setBackgroundColor("#05070d");


        // =========================================================
        // MUSICA DEL VALLE
        // =========================================================

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


        // =========================================================
        // MUNDO
        // =========================================================

        const mundoAncho = 3000;

        this.mundoAncho = mundoAncho;

        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            720
        );


        // =========================================================
        // SKY
        // =========================================================

        this.sky = this.add.image(
            0,
            0,
            "sky"
        );

        this.sky
            .setOrigin(0, 0)
            .setDepth(0)
            .setScrollFactor(0);


        // =========================================================
        // ✨ LUCES SUTILES DEL CIELO
        // =========================================================

        this.lucesCielo = [];

        for (let i = 0; i < 28; i++) {

            const luz = this.add.circle(
                Phaser.Math.Between(20, 2980),
                Phaser.Math.Between(35, 285),
                Phaser.Math.Between(1, 2),
                Phaser.Utils.Array.GetRandom([
                    0xffffff,
                    0x8feaff,
                    0xcba6ff
                ]),
                Phaser.Math.FloatBetween(
                    0.18,
                    0.50
                )
            );

            luz
                .setScrollFactor(0.2)
                .setDepth(1);

            this.lucesCielo.push(luz);

            this.tweens.add({

                targets: luz,

                alpha: {
                    from: 0.12,
                    to: 0.65
                },

                duration:
                    Phaser.Math.Between(
                        1200,
                        2400
                    ),

                yoyo: true,

                repeat: -1,

                delay:
                    Phaser.Math.Between(
                        0,
                        1600
                    ),

                ease: "Sine.easeInOut"

            });

        }


        // =========================================================
        // CABLES
        // =========================================================

        this.cables = this.add.image(
            0,
            0,
            "cables"
        );

        this.cables
            .setOrigin(0, 0)
            .setDepth(2);


        // =========================================================
        // PUNTO DEL CUARZO
        // =========================================================

        this.puntoCuarzo = 1672;

        this.eventoCuarzoActivo = false;


        // =========================================================
        // PUNTO GEMA DE ENERGIA
        // =========================================================

        this.puntoGemaEnergia = 2800;

        this.gemaEnergiaRecogida = false;


        // =========================================================
        // FLOOR VISUAL
        // =========================================================

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


        // =========================================================
        // PISO FISICO
        // =========================================================

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


        // =========================================================
        // AURA TITULO
        // =========================================================

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


        // =========================================================
        // TITULO
        // =========================================================

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
        );

        tituloValle
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


        // =========================================================
        // KAEL FISICO
        // =========================================================

        createKaelAnimations(this);

        this.kael = this.physics.add.sprite(
            200,
            450,
            "kael"
        );

        this.kael
            .setDepth(5)
            .setBounce(0)
            .setCollideWorldBounds(true);

        // El sprite original queda invisible.
        // La nueva apariencia 2D se dibuja abajo.
        this.kael.setAlpha(0);

        this.kael.body.setSize(
            38,
            58,
            true
        );

        this.physics.add.collider(
            this.kael,
            this.ground
        );


        // =========================================================
        // KAEL 2.2
        // =========================================================

        this.crearKaelVisual();


        // =========================================================
        // ENERGIA
        // =========================================================

        this.energiaMaxima = 100;

        this.energiaKael = 77;

        this.costoSalto = 10;

        this.energiaMaxRecarga = 70;

        this.velocidadRecarga = 10;

        this.brilloEnergiaActivo = false;

        this.gemaEnergiaActiva = false;


        // =========================================================
        // VELOCIDADES
        // =========================================================

        this.velocidadNormal = 180;

        this.velocidadMedia = 150;

        this.velocidadBaja = 110;

        this.velocidadCritica = 70;


        this.velocidadNormalPotenciada = 300;

        this.velocidadMediaPotenciada = 245;

        this.velocidadBajaPotenciada = 180;

        this.velocidadCriticaPotenciada = 120;


        // =========================================================
        // SALTO
        // =========================================================

        this.fuerzaSalto = -500;

        this.fuerzaSaltoPotenciado = -680;


        // =========================================================
        // DRON GRANDE
        // =========================================================

        this.crearDronGrande();


        // =========================================================
        // DRONES PEQUEÑOS
        // =========================================================

        this.crearDronesPequenos();


        // =========================================================
        // LASERS
        // =========================================================

        this.lasers = [];

        this.danoLaser = 7;

        this.dronesPequenosActivos = false;

        this.tiempoDisparoDronGrande = 0;

        this.tiempoDisparoDronPequeno1 = 0;

        this.tiempoDisparoDronPequeno2 = 0;


        // =========================================================
        // GEMA
        // =========================================================

        this.crearGemaEnergia();


        // =========================================================
        // BARRA DE ENERGIA
        // =========================================================

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


        // =========================================================
        // ICONO DE KAEL EN LA BARRA
        // =========================================================

        this.iconoKaelEnergia =
            this.crearIconoKaelBarra(
                27,
                58
            );


        // =========================================================
        // TEXTO ENERGIA
        // =========================================================

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


        // =========================================================
        // PULSO BARRA
        // =========================================================

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


        // =========================================================
        // CAMARA
        // =========================================================

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


        // =========================================================
        // CONTROLES
        // =========================================================

        this.cursors =
            this.input.keyboard.createCursorKeys();


        this.keys =
            this.input.keyboard.addKeys({

                A: Phaser.Input.Keyboard.KeyCodes.A,

                D: Phaser.Input.Keyboard.KeyCodes.D,

                SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE

            });


        // =========================================================
        // ESTADOS
        // =========================================================

        this.finalizando = false;

        this.dronDetectando = false;

        this.dronAlertaMostrada = false;


        // =========================================================
        // FUNCIONES
        // =========================================================

        this.activarGemaEnergia = () => {

            this.recogerGemaEnergia();

        };


        this.mostrarDialogoKael = () => {

            this.mostrarDialogoKaelEnergia();

        };


        this.activarAlertaDron = () => {

            this.alertaDronGrande();

        };


        // =========================================================
        // EVENTO CUARZO
        // =========================================================

        this.activarCuarzo = () => {

            if (
                this.eventoCuarzoActivo ||
                this.finalizando
            ) {
                return;
            }

            this.eventoCuarzoActivo = true;


            for (
                let i = 0;
                i < 7;
                i++
            ) {

                this.time.delayedCall(

                    i * 650,

                    () => {

                        if (this.finalizando) {
                            return;
                        }

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

                    if (this.finalizando) {
                        return;
                    }

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


    // =========================================================
    // KAEL 2.2
    // =========================================================

    crearKaelVisual() {

        this.kaelVisual =
            this.add.container(
                this.kael.x,
                this.kael.y
            );

        this.kaelVisual.setDepth(6);


        const g =
            this.add.graphics();


        // ---------------------------------------------------------
        // AURA
        // ---------------------------------------------------------

        g.fillStyle(
            0x00ffff,
            0.10
        );

        g.fillCircle(
            0,
            -18,
            27
        );


        // ---------------------------------------------------------
        // CABELLO
        // ---------------------------------------------------------

        g.fillStyle(
            0x10151d,
            1
        );

        g.fillRoundedRect(
            -13,
            -47,
            26,
            24,
            8
        );


        // ---------------------------------------------------------
        // CARA
        // ---------------------------------------------------------

        g.fillStyle(
            0xd5a27f,
            1
        );

        g.fillRoundedRect(
            -11,
            -42,
            22,
            20,
            6
        );


        // ---------------------------------------------------------
        // CABELLO FRONTAL
        // ---------------------------------------------------------

        g.fillStyle(
            0x111111,
            1
        );

        g.fillTriangle(
            -12,
            -39,
            0,
            -50,
            12,
            -39
        );


        // ---------------------------------------------------------
        // OJOS
        // ---------------------------------------------------------

        g.fillStyle(
            0x00ffff,
            1
        );

        g.fillCircle(
            -5,
            -33,
            2
        );

        g.fillCircle(
            5,
            -33,
            2
        );


        // ---------------------------------------------------------
        // CUERPO / HOODIE
        // ---------------------------------------------------------

        g.fillStyle(
            0x151c26,
            1
        );

        g.fillRoundedRect(
            -17,
            -20,
            34,
            38,
            8
        );


        // ---------------------------------------------------------
        // DETALLE DEL PECHO
        // ---------------------------------------------------------

        g.lineStyle(
            2,
            0x00ffff,
            0.85
        );

        g.lineBetween(
            0,
            -17,
            0,
            13
        );


        // ---------------------------------------------------------
        // BRAZOS
        // ---------------------------------------------------------

        g.lineStyle(
            7,
            0x151c26,
            1
        );

        g.lineBetween(
            -15,
            -12,
            -25,
            8
        );

        g.lineBetween(
            15,
            -12,
            25,
            8
        );


        // ---------------------------------------------------------
        // MANOS
        // ---------------------------------------------------------

        g.fillStyle(
            0xd5a27f,
            1
        );

        g.fillCircle(
            -25,
            9,
            4
        );

        g.fillCircle(
            25,
            9,
            4
        );


        // ---------------------------------------------------------
        // PIERNAS
        // ---------------------------------------------------------

        g.lineStyle(
            8,
            0x202833,
            1
        );

        g.lineBetween(
            -8,
            17,
            -11,
            39
        );

        g.lineBetween(
            8,
            17,
            11,
            39
        );


        // ---------------------------------------------------------
        // PATINES
        // ---------------------------------------------------------

        g.fillStyle(
            0x090d12,
            1
        );

        g.fillRoundedRect(
            -20,
            36,
            20,
            8,
            4
        );

        g.fillRoundedRect(
            0,
            36,
            20,
            8,
            4
        );


        // ---------------------------------------------------------
        // LUCES ROJAS DE PATINES
        // ---------------------------------------------------------

        g.fillStyle(
            0xff1744,
            1
        );

        g.fillCircle(
            -14,
            46,
            3
        );

        g.fillCircle(
            -4,
            46,
            3
        );

        g.fillCircle(
            6,
            46,
            3
        );

        g.fillCircle(
            16,
            46,
            3
        );


        // ---------------------------------------------------------
        // RUEDAS
        // ---------------------------------------------------------

        g.fillStyle(
            0x4c5966,
            1
        );

        g.fillCircle(
            -14,
            45,
            2
        );

        g.fillCircle(
            -4,
            45,
            2
        );

        g.fillCircle(
            6,
            45,
            2
        );

        g.fillCircle(
            16,
            45,
            2
        );


        this.kaelVisual.add(
            g
        );


        // ---------------------------------------------------------
        // FLOTACION SUAVE
        // ---------------------------------------------------------

        this.tweens.add({

            targets: this.kaelVisual,

            y: "-=2",

            duration: 700,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }


    // =========================================================
    // ICONO KAEL BARRA
    // =========================================================

    crearIconoKaelBarra(
        x,
        y
    ) {

        const icono =
            this.add.container(
                x,
                y
            );

        icono
            .setScrollFactor(0)
            .setDepth(53);


        const g =
            this.add.graphics();


        g.fillStyle(
            0x111820,
            1
        );

        g.fillRoundedRect(
            -14,
            -14,
            28,
            28,
            7
        );


        g.fillStyle(
            0xd5a27f,
            1
        );

        g.fillCircle(
            0,
            -2,
            7
        );


        g.fillStyle(
            0x111111,
            1
        );

        g.fillRoundedRect(
            -8,
            -10,
            16,
            7,
            4
        );


        g.fillStyle(
            0x101820,
            1
        );

        g.fillRoundedRect(
            -10,
            6,
            20,
            10,
            4
        );


        g.fillStyle(
            0x00ffff,
            1
        );

        g.fillCircle(
            -3,
            -2,
            1.5
        );

        g.fillCircle(
            3,
            -2,
            1.5
        );


        icono.add(
            g
        );


        return icono;

    }


    // =========================================================
    // DRON GRANDE
    // =========================================================

    crearDronGrande() {

        this.dron =
            this.add.container(
                1900,
                390
            );

        this.dron.setDepth(7);


        // ---------------------------------------------------------
        // CUERPO
        // ---------------------------------------------------------

        this.dronBody =
            this.add.graphics();

        this.dronBody.fillStyle(
            0x202a32,
            1
        );

        this.dronBody.fillRoundedRect(
            -38,
            -17,
            76,
            34,
            10
        );

        this.dronBody.lineStyle(
            2,
            0x607580,
            0.9
        );

        this.dronBody.strokeRoundedRect(
            -38,
            -17,
            76,
            34,
            10
        );

        this.dron.add(
            this.dronBody
        );


        // ---------------------------------------------------------
        // PLACA
        // ---------------------------------------------------------

        this.dronPlaca =
            this.add.rectangle(
                0,
                -19,
                38,
                6,
                0x34434d,
                1
            );

        this.dronPlaca.setStrokeStyle(
            1,
            0x00ffff,
            0.8
        );

        this.dron.add(
            this.dronPlaca
        );


        // ---------------------------------------------------------
        // NUCLEO
        // ---------------------------------------------------------

        this.dronNucleo =
            this.add.circle(
                0,
                0,
                8,
                0x00eaff,
                1
            );

        this.dron.add(
            this.dronNucleo
        );


        // ---------------------------------------------------------
        // BRILLO NUCLEO
        // ---------------------------------------------------------

        this.dronNucleoBrillo =
            this.add.circle(
                0,
                0,
                17,
                0x00eaff,
                0.10
            );

        this.dron.add(
            this.dronNucleoBrillo
        );


        // ---------------------------------------------------------
        // LEDS
        // ---------------------------------------------------------

        this.dronLedIzq =
            this.add.circle(
                -27,
                0,
                4,
                0xff3333,
                0.85
            );

        this.dron.add(
            this.dronLedIzq
        );


        this.dronLedDer =
            this.add.circle(
                27,
                0,
                4,
                0xff3333,
                0.85
            );

        this.dron.add(
            this.dronLedDer
        );


        // ---------------------------------------------------------
        // ANTENA
        // ---------------------------------------------------------

        this.dronAntena =
            this.add.rectangle(
                0,
                -28,
                2,
                10,
                0x71828b,
                1
            );

        this.dron.add(
            this.dronAntena
        );


        this.dronAntenaLed =
            this.add.circle(
                0,
                -35,
                3,
                0xff3333,
                0.9
            );

        this.dron.add(
            this.dronAntenaLed
        );


        // ---------------------------------------------------------
        // DETALLES
        // ---------------------------------------------------------

        this.dronDetalleIzq =
            this.add.rectangle(
                -42,
                0,
                5,
                16,
                0x00bcd4,
                0.65
            );

        this.dron.add(
            this.dronDetalleIzq
        );


        this.dronDetalleDer =
            this.add.rectangle(
                42,
                0,
                5,
                16,
                0x00bcd4,
                0.65
            );

        this.dron.add(
            this.dronDetalleDer
        );


        // ---------------------------------------------------------
        // HALO
        // ---------------------------------------------------------

        this.dronHalo =
            this.add.circle(
                1900,
                390,
                45,
                0x00d9ff,
                0.045
            );

        this.dronHalo.setDepth(6);


        // ---------------------------------------------------------
        // ANILLO
        // ---------------------------------------------------------

        this.dronAnillo =
            this.add.circle(
                1900,
                390,
                28,
                0x00ffff,
                0
            );

        this.dronAnillo.setStrokeStyle(
            1,
            0x00ffff,
            0.30
        );

        this.dronAnillo.setDepth(6);


        // ---------------------------------------------------------
        // PULSO
        // ---------------------------------------------------------

        this.tweens.add({

            targets: [
                this.dronNucleo,
                this.dronNucleoBrillo
            ],

            scale: {
                from: 0.85,
                to: 1.15
            },

            alpha: {
                from: 0.55,
                to: 1
            },

            duration: 850,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets:
                this.dronHalo,

            scale: {
                from: 0.85,
                to: 1.15
            },

            alpha: {
                from: 0.025,
                to: 0.09
            },

            duration: 1200,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets:
                this.dronAnillo,

            scale: {
                from: 0.7,
                to: 1.35
            },

            alpha: {
                from: 0.5,
                to: 0
            },

            duration: 1500,

            repeat: -1,

            ease: "Sine.easeOut"

        });


        // ---------------------------------------------------------
        // FLOTACION
        // ---------------------------------------------------------

        this.tweens.add({

            targets:
                this.dron,

            y: {
                from: 384,
                to: 396
            },

            duration: 1300,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // ---------------------------------------------------------
        // RECORRIDO
        // ---------------------------------------------------------

        const moverDron = () => {

            if (
                !this.dron ||
                this.finalizando
            ) {
                return;
            }


            this.tweens.add({

                targets:
                    this.dron,

                x: 2200,

                duration: 4200,

                ease: "Sine.easeInOut",

                onComplete: () => {

                    if (this.finalizando) {
                        return;
                    }


                    this.tweens.add({

                        targets:
                            this.dron,

                        x:
                            this.puntoCuarzo,

                        duration: 3600,

                        ease: "Sine.easeInOut",

                        onComplete: () => {

                            this.time.delayedCall(
                                2200,
                                () => {

                                    if (
                                        this.dron &&
                                        !this.finalizando
                                    ) {

                                        moverDron();

                                    }

                                }
                            );

                        }

                    });

                }

            });

        };


        moverDron();

    }


    // =========================================================
    // DOS DRONES PEQUEÑOS
    // =========================================================

    crearDronesPequenos() {

        this.dronesPequenos = [];


        this.dronPequeno1 =
            this.crearDronPequeno(
                760,
                505,
                -1
            );


        this.dronPequeno2 =
            this.crearDronPequeno(
                2350,
                505,
                1
            );


        this.dronesPequenos.push(
            this.dronPequeno1,
            this.dronPequeno2
        );


        // ---------------------------------------------------------
        // MOVIMIENTO DRON 1
        // ---------------------------------------------------------

        this.tweens.add({

            targets:
                this.dronPequeno1,

            y: {
                from: 495,
                to: 515
            },

            duration: 1500,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // ---------------------------------------------------------
        // MOVIMIENTO DRON 2
        // ---------------------------------------------------------

        this.tweens.add({

            targets:
                this.dronPequeno2,

            y: {
                from: 515,
                to: 495
            },

            duration: 1500,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }


    crearDronPequeno(
        x,
        y,
        direccion
    ) {

        const d =
            this.add.container(
                x,
                y
            );

        d.setDepth(7);


        const g =
            this.add.graphics();


        // ---------------------------------------------------------
        // CUERPO OSCURO
        // ---------------------------------------------------------

        g.fillStyle(
            0x080b0f,
            1
        );

        g.fillRoundedRect(
            -24,
            -11,
            48,
            22,
            8
        );


        g.lineStyle(
            2,
            0x26323b,
            0.9
        );

        g.strokeRoundedRect(
            -24,
            -11,
            48,
            22,
            8
        );


        // ---------------------------------------------------------
        // PLACA
        // ---------------------------------------------------------

        g.fillStyle(
            0x0d1218,
            1
        );

        g.fillRoundedRect(
            -13,
            -17,
            26,
            6,
            3
        );


        // ---------------------------------------------------------
        // NUCLEO VERDE
        // ---------------------------------------------------------

        g.fillStyle(
            0x24ff77,
            1
        );

        g.fillCircle(
            0,
            0,
            5
        );


        // ---------------------------------------------------------
        // HALO VERDE
        // ---------------------------------------------------------

        g.fillStyle(
            0x24ff77,
            0.10
        );

        g.fillCircle(
            0,
            0,
            14
        );


        // ---------------------------------------------------------
        // LUCES
        // ---------------------------------------------------------

        g.fillStyle(
            0x24ff77,
            0.8
        );

        g.fillCircle(
            -18,
            0,
            2.5
        );

        g.fillCircle(
            18,
            0,
            2.5
        );


        d.add(
            g
        );


        d.direccion =
            direccion;

        d.activo =
            false;

        d.ultimoDisparo =
            0;


        return d;

    }


    // =========================================================
    // GEMA DE ENERGIA
    // =========================================================

    crearGemaEnergia() {

        this.gemaEnergia =
            this.add.image(
                this.puntoGemaEnergia,
                500,
                "gema-energia"
            );


        this.gemaEnergia
            .setOrigin(0.5)
            .setScale(0.075)
            .setDepth(8)
            .setAlpha(0.92);


        this.auraGemaEnergia =
            this.add.circle(
                this.puntoGemaEnergia,
                500,
                25,
                0xb400ff,
                0.10
            );


        this.auraGemaEnergia.setDepth(7);


        this.brilloGemaEnergia =
            this.add.circle(
                this.puntoGemaEnergia,
                500,
                12,
                0xe98cff,
                0.18
            );


        this.brilloGemaEnergia.setDepth(8);


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

            targets:
                this.gemaEnergia,

            x:
                this.puntoGemaEnergia + 3,

            duration: 150,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets:
                this.gemaEnergia,

            angle: 4,

            duration: 850,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets:
                this.auraGemaEnergia,

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

            targets:
                this.brilloGemaEnergia,

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

            targets:
                this.gemaEnergia,

            alpha: {
                from: 0.78,
                to: 1
            },

            duration: 800,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }


    // =========================================================
    // RECOGER GEMA
    // =========================================================

    recogerGemaEnergia() {

        if (
            this.gemaEnergiaRecogida ||
            !this.gemaEnergia ||
            !this.kael
        ) {
            return;
        }


        this.gemaEnergiaRecogida =
            true;


        this.tweens.killTweensOf(
            this.gemaEnergia
        );

        this.tweens.killTweensOf(
            this.auraGemaEnergia
        );

        this.tweens.killTweensOf(
            this.brilloGemaEnergia
        );


        // ---------------------------------------------------------
        // EXPLOSION
        // ---------------------------------------------------------

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

            targets:
                explosion,

            scale: 4,

            alpha: 0,

            duration: 500,

            ease: "Cubic.easeOut",

            onComplete: () => {

                explosion.destroy();

            }

        });


        // ---------------------------------------------------------
        // PARTICULAS
        // ---------------------------------------------------------

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const particula =
                this.add.circle(

                    this.gemaEnergia.x,

                    this.gemaEnergia.y,

                    Phaser.Math.Between(
                        3,
                        6
                    ),

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

                targets:
                    particula,

                x:
                    this.kael.x +
                    Phaser.Math.Between(
                        -18,
                        18
                    ),

                y:
                    this.kael.y +
                    Phaser.Math.Between(
                        -18,
                        18
                    ),

                scale: 0.2,

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        600,
                        1000
                    ),

                delay:
                    i * 25,

                ease: "Cubic.easeIn",

                onComplete: () => {

                    particula.destroy();

                }

            });

        }


        // ---------------------------------------------------------
        // ENERGIA PRINCIPAL
        // ---------------------------------------------------------

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

            targets:
                energiaPrincipal,

            x:
                this.kael.x,

            y:
                this.kael.y,

            scale: 0.35,

            duration: 900,

            ease: "Cubic.easeIn",

            onComplete: () => {

                energiaPrincipal.destroy();


                this.energiaKael =
                    this.energiaMaxima;


                this.actualizarBarraEnergia();


                this.gemaEnergiaActiva =
                    true;


                this.brilloKaelEnergia();


                // -------------------------------------------------
                // ACTIVAR PEQUEÑOS
                // -------------------------------------------------

                this.dronesPequenosActivos =
                    true;


                this.tiempoDisparoDronPequeno1 =
                    this.time.now + 1400;


                this.tiempoDisparoDronPequeno2 =
                    this.time.now + 2600;


                this.dronPequeno1.activo =
                    true;

                this.dronPequeno2.activo =
                    true;


                // -------------------------------------------------
                // HALO
                // -------------------------------------------------

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

                    targets:
                        haloEnergia,

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


                // -------------------------------------------------
                // DIALOGO
                // -------------------------------------------------

                this.mostrarDialogoKaelEnergia();


                // -------------------------------------------------
                // DESAPARECER GEMA
                // -------------------------------------------------

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

    }


    // =========================================================
    // DIALOGO ENERGIA
    // =========================================================

    mostrarDialogoKaelEnergia() {

        if (
            !this.kael ||
            this.finalizando
        ) {
            return;
        }


        this.crearBurbujaKael(

            "100% DE ENERGÍA...\n" +
            "Y YO QUE PENSABA\n" +
            "QUE VENÍA A CAMINAR.",

            2700

        );

    }


    // =========================================================
    // BURBUJA DE KAEL
    // =========================================================

    crearBurbujaKael(
        texto,
        duracion = 2300
    ) {

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


        nube.setScale(
            0.7
        );

        nube.setAlpha(
            0
        );


        const textoKael =
            this.add.text(
                x,
                y,
                texto,
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
            .setDepth(101)
            .setScale(0.7)
            .setAlpha(0);


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


        const seguir =
            this.time.addEvent({

                delay: 16,

                repeat:
                    Math.floor(
                        duracion / 16
                    ),

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
            duracion,
            () => {

                if (seguir) {
                    seguir.remove();
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

    }


    // =========================================================
    // ALERTA DRON GRANDE
    // =========================================================

    alertaDronGrande() {

        if (
            !this.dron ||
            !this.dronLedIzq ||
            !this.dronLedDer ||
            this.dronAlertaMostrada
        ) {
            return;
        }


        this.dronAlertaMostrada =
            true;


        // ---------------------------------------------------------
        // LEDS
        // ---------------------------------------------------------

        this.tweens.add({

            targets: [
                this.dronLedIzq,
                this.dronLedDer,
                this.dronAntenaLed
            ],

            alpha: {
                from: 0.15,
                to: 1
            },

            scale: {
                from: 0.8,
                to: 1.4
            },

            duration: 160,

            yoyo: true,

            repeat: 7,

            ease: "Sine.easeInOut"

        });


        // ---------------------------------------------------------
        // NUCLEO ROJO
        // ---------------------------------------------------------

        this.dronNucleo.setFillStyle(
            0xff3333,
            1
        );

        this.dronNucleoBrillo.setFillStyle(
            0xff2222,
            0.18
        );


        // ---------------------------------------------------------
        // ALERTA
        // ---------------------------------------------------------

        const alerta =
            this.add.text(
                this.dron.x,
                this.dron.y - 80,
                "¡ALERTA, INTRUSO!",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#ff3333",

                    stroke: "#050505",
                    strokeThickness: 4,

                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: "#ff2222",
                        blur: 8,
                        stroke: true,
                        fill: true
                    }
                }
            );


        alerta
            .setOrigin(0.5)
            .setDepth(100);


        const seguirAlerta =
            this.time.addEvent({

                delay: 16,

                repeat: 150,

                callback: () => {

                    if (
                        this.dron &&
                        alerta
                    ) {

                        alerta.x =
                            this.dron.x;

                        alerta.y =
                            this.dron.y - 80;

                    }

                }

            });


        // ---------------------------------------------------------
        // CHISTE
        // ---------------------------------------------------------

        this.time.delayedCall(
            650,
            () => {

                if (
                    this.kael &&
                    !this.finalizando
                ) {

                    this.crearBurbujaKael(

                        "Tranquilo, dron...\n" +
                        "solo estaba mirando.\n" +
                        "¡Ahora sí me toca correr!",

                        2700

                    );

                }

            }
        );


        // ---------------------------------------------------------
        // QUITAR ALERTA
        // ---------------------------------------------------------

        this.time.delayedCall(
            2400,
            () => {

                if (seguirAlerta) {
                    seguirAlerta.remove();
                }


                if (alerta) {

                    this.tweens.add({

                        targets:
                            alerta,

                        alpha: 0,

                        y: "-=15",

                        duration: 350,

                        onComplete: () => {

                            alerta.destroy();

                        }

                    });

                }

            }
        );

    }


    // =========================================================
    // LASER DRON GRANDE
    // =========================================================

    dispararLaserDronGrande() {

        if (
            !this.dron ||
            !this.kael ||
            this.finalizando
        ) {
            return;
        }


        this.crearLaser(

            this.dron.x,

            this.dron.y,

            this.kael.x,

            this.kael.y,

            0x00ffff,

            8,

            760,

            true

        );

    }


    // =========================================================
    // LASER DRON PEQUEÑO
    // =========================================================

    dispararLaserDronPequeno(
        dron
    ) {

        if (
            !dron ||
            !dron.activo ||
            !this.kael ||
            this.finalizando ||
            !this.gemaEnergiaActiva
        ) {
            return;
        }


        const distancia =
            Phaser.Math.Distance.Between(

                dron.x,
                dron.y,

                this.kael.x,
                this.kael.y

            );


        if (
            distancia > 1050
        ) {
            return;
        }


        this.crearLaser(

            dron.x,

            dron.y,

            this.kael.x,

            this.kael.y,

            0x24ff77,

            6,

            850,

            true

        );

    }


    // =========================================================
    // CREAR LASER 2D
    // =========================================================

    crearLaser(
        x,
        y,
        destinoX,
        destinoY,
        color,
        grosor,
        duracion,
        haceDano
    ) {

        const dx =
            destinoX - x;

        const dy =
            destinoY - y;


        const angulo =
            Math.atan2(
                dy,
                dx
            );


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        // ---------------------------------------------------------
        // LASER PRINCIPAL
        // ---------------------------------------------------------

        const laser =
            this.add.rectangle(
                x,
                y,
                distancia,
                grosor,
                color,
                0.95
            );


        laser.setOrigin(
            0,
            0.5
        );


        laser.setRotation(
            angulo
        );


        laser.setDepth(
            20
        );


        // ---------------------------------------------------------
        // BRILLO
        // ---------------------------------------------------------

        const brillo =
            this.add.rectangle(
                x,
                y,
                distancia,
                grosor * 2.6,
                color,
                0.16
            );


        brillo.setOrigin(
            0,
            0.5
        );


        brillo.setRotation(
            angulo
        );


        brillo.setDepth(
            19
        );


        const datos = {

            laser,

            brillo,

            haceDano,

            golpeado: false,

            terminado: false

        };


        this.lasers.push(
            datos
        );


        // ---------------------------------------------------------
        // MOVIMIENTO
        // ---------------------------------------------------------

        this.tweens.add({

            targets: [
                laser,
                brillo
            ],

            x: destinoX,

            y: destinoY,

            alpha: 0,

            duration: duracion,

            ease: "Linear",

            onComplete: () => {

                datos.terminado =
                    true;


                if (laser) {
                    laser.destroy();
                }


                if (brillo) {
                    brillo.destroy();
                }


                this.eliminarLaser(
                    datos
                );

            }

        });


        // ---------------------------------------------------------
        // DESTELLO ORIGEN
        // ---------------------------------------------------------

        const flash =
            this.add.circle(
                x,
                y,
                grosor * 1.7,
                color,
                0.35
            );


        flash.setDepth(
            21
        );


        this.tweens.add({

            targets:
                flash,

            scale: 2.2,

            alpha: 0,

            duration: 180,

            onComplete: () => {

                flash.destroy();

            }

        });

    }


    eliminarLaser(
        datos
    ) {

        const indice =
            this.lasers.indexOf(
                datos
            );


        if (
            indice !== -1
        ) {

            this.lasers.splice(
                indice,
                1
            );

        }

    }


    // =========================================================
    // COMPROBAR IMPACTOS
    // =========================================================

    comprobarImpactos() {

        if (
            !this.kael ||
            this.finalizando
        ) {
            return;
        }


        for (
            const datos
            of [...this.lasers]
        ) {

            if (
                datos.golpeado ||
                datos.terminado ||
                !datos.laser ||
                !datos.haceDano
            ) {
                continue;
            }


            const distancia =
                Phaser.Math.Distance.Between(

                    datos.laser.x,

                    datos.laser.y,

                    this.kael.x,

                    this.kael.y

                );


            if (
                distancia < 30
            ) {

                datos.golpeado =
                    true;


                this.recibirDanoLaser();

            }

        }

    }


    // =========================================================
    // DAÑO KAEL
    // =========================================================

    recibirDanoLaser() {

        if (
            this.finalizando
        ) {
            return;
        }


        // 7 PUNTOS = 7%
        this.energiaKael -= 7;


        if (
            this.energiaKael < 0
        ) {

            this.energiaKael = 0;

        }


        this.actualizarBarraEnergia();


        this.destelloRojoKael();


        // ---------------------------------------------------------
        // CHISTE
        // ---------------------------------------------------------

        this.crearBurbujaKael(

            "Vaya...\n" +
            "ESO SÍ DOLIÓ.",

            1700

        );


        // ---------------------------------------------------------
        // SIN ENERGIA = MUERTE
        // ---------------------------------------------------------

        if (
            this.energiaKael <= 0
        ) {

            this.time.delayedCall(

                250,

                () => {

                    if (
                        !this.finalizando
                    ) {

                        this.finalizarValle();

                    }

                }

            );

        }

    }


    // =========================================================
    // DESTELLO ROJO KAEL
    // =========================================================

    destelloRojoKael() {

        if (
            !this.kael
        ) {
            return;
        }


        this.kaelVisual.setScale(
            1.12
        );


        this.tweens.add({

            targets:
                this.kaelVisual,

            scale: 1,

            duration: 220,

            ease: "Sine.easeOut"

        });


        const flash =
            this.add.circle(

                this.kael.x,

                this.kael.y - 8,

                28,

                0xff1744,

                0.38

            );


        flash.setDepth(
            25
        );


        this.tweens.add({

            targets:
                flash,

            scale: 2.2,

            alpha: 0,

            duration: 320,

            ease: "Cubic.easeOut",

            onUpdate: () => {

                if (this.kael) {

                    flash.x =
                        this.kael.x;

                    flash.y =
                        this.kael.y - 8;

                }

            },

            onComplete: () => {

                flash.destroy();

            }

        });


        this.cameras.main.shake(
            100,
            0.004
        );

    }


    // =========================================================
    // ACTUALIZAR BARRA
    // =========================================================

    actualizarBarraEnergia() {

        if (
            !this.barraEnergia
        ) {
            return;
        }


        const x = 55;

        const y = 65;

        const ancho = 245;

        const alto = 22;


        const porcentaje =
            Phaser.Math.Clamp(

                this.energiaKael /
                this.energiaMaxima,

                0,
                1

            );


        this.barraEnergiaMarco.clear();

        this.barraEnergiaFondo.clear();

        this.barraEnergia.clear();


        // ---------------------------------------------------------
        // MARCO
        // ---------------------------------------------------------

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


        // ---------------------------------------------------------
        // FONDO
        // ---------------------------------------------------------

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


        if (
            anchoEnergia > 0
        ) {

            // Verde.
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


            // Cian.
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


            // Reflejo.
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

            Math.floor(
                this.energiaKael
            ) +

            " / " +

            this.energiaMaxima

        );

    }


    // =========================================================
    // BRILLO KAEL
    // =========================================================

    brilloKaelEnergia() {

        if (
            !this.kael ||
            this.brilloEnergiaActivo
        ) {
            return;
        }


        this.brilloEnergiaActivo =
            true;


        this.kaelVisual.setScale(
            1.15
        );


        this.tweens.add({

            targets:
                this.kaelVisual,

            scale: 1,

            duration: 260,

            ease: "Sine.easeOut"

        });


        const aura =
            this.add.circle(

                this.kael.x,

                this.kael.y - 8,

                28,

                0x00ffff,

                0.18

            );


        aura.setDepth(
            4
        );


        this.tweens.add({

            targets:
                aura,

            scale: 2.4,

            alpha: 0,

            duration: 500,

            ease: "Cubic.easeOut",

            onUpdate: () => {

                if (this.kael) {

                    aura.x =
                        this.kael.x;

                    aura.y =
                        this.kael.y - 8;

                }

            },

            onComplete: () => {

                aura.destroy();

            }

        });


        this.time.delayedCall(

            450,

            () => {

                this.brilloEnergiaActivo =
                    false;

            }

        );

    }


    // =========================================================
    // AVISO CUARZO
    // =========================================================

    mostrarAvisoCuarzo() {

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

            targets:
                destelloDorado,

            alpha: 0.42,

            duration: 130,

            yoyo: true,

            ease: "Quad.easeOut",

            onComplete: () => {

                destelloDorado.destroy();

            }

        });


        const aviso =
            this.add.text(

                640,

                55,

                "¡RECOGE EL CUARZO DEL ALMA\n" +
                "ANTES DE QUE SE ACABE EL TIEMPO!",

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

            targets:
                aviso,

            alpha: 1,

            scale: 1,

            duration: 450,

            ease: "Back.easeOut"

        });


        this.tweens.add({

            targets:
                aviso,

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

                if (
                    !aviso.active
                ) {
                    return;
                }


                this.tweens.add({

                    targets:
                        aviso,

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

    }


    // =========================================================
    // UPDATE
    // =========================================================

    update(
        time,
        delta
    ) {

        if (
            this.finalizando
        ) {
            return;
        }


        // =====================================================
        // KAEL VISUAL SIGUE AL PERSONAJE
        // =====================================================

        if (
            this.kaelVisual &&
            this.kael
        ) {

            this.kaelVisual.x =
                this.kael.x;

            this.kaelVisual.y =
                this.kael.y - 1;


            if (
                this.kael.flipX
            ) {

                this.kaelVisual.setScale(
                    -1,
                    1
                );

            } else {

                this.kaelVisual.setScale(
                    1,
                    1
                );

            }

        }


        // =====================================================
        // HALO DRON GRANDE
        // =====================================================

        if (
            this.dron
        ) {

            if (
                this.dronHalo
            ) {

                this.dronHalo.x =
                    this.dron.x;

                this.dronHalo.y =
                    this.dron.y;

            }


            if (
                this.dronAnillo
            ) {

                this.dronAnillo.x =
                    this.dron.x;

                this.dronAnillo.y =
                    this.dron.y;

            }

        }


        // =====================================================
        // DETECCION DRON GRANDE
        // =====================================================

        if (
            this.dron &&
            this.kael
        ) {

            const distanciaX =
                Math.abs(

                    this.kael.x -
                    this.dron.x

                );


            const diferenciaY =
                Math.abs(

                    this.kael.y -
                    this.dron.y

                );


            const detectado =
                distanciaX < 260 &&
                diferenciaY < 95;


            // -------------------------------------------------
            // ENTRA EN DETECCION
            // -------------------------------------------------

            if (
                detectado &&
                !this.dronDetectando
            ) {

                this.dronDetectando =
                    true;

                this.dronAlertaMostrada =
                    false;


                this.activarAlertaDron();


                // PRIMER DISPARO
                this.time.delayedCall(

                    500,

                    () => {

                        if (
                            !this.finalizando &&
                            this.dronDetectando
                        ) {

                            this.dispararLaserDronGrande();

                        }

                    }

                );


                // SEGUNDO DISPARO
                this.time.delayedCall(

                    1150,

                    () => {

                        if (
                            !this.finalizando &&
                            this.dronDetectando
                        ) {

                            this.dispararLaserDronGrande();

                        }

                    }

                );


                this.tiempoDisparoDronGrande =
                    time + 2500;

            }


            // -------------------------------------------------
            // SALE DE DETECCION
            // -------------------------------------------------

            if (
                !detectado &&
                this.dronDetectando
            ) {

                this.dronDetectando =
                    false;

            }


            // -------------------------------------------------
            // DISPAROS POSTERIORES
            // -------------------------------------------------

            if (

                this.dronDetectando &&

                time >=
                this.tiempoDisparoDronGrande

            ) {

                this.dispararLaserDronGrande();


                this.tiempoDisparoDronGrande =
                    time + 2500;

            }

        }


        // =====================================================
        // DRONES PEQUEÑOS
        // =====================================================

        if (
            this.dronesPequenosActivos &&
            this.kael
        ) {

            // -----------------------------------------------
            // PEQUEÑO 1
            // -----------------------------------------------

            if (
                time >=
                this.tiempoDisparoDronPequeno1
            ) {

                this.dispararLaserDronPequeno(

                    this.dronPequeno1

                );


                this.tiempoDisparoDronPequeno1 =
                    time + 4000;

            }


            // -----------------------------------------------
            // PEQUEÑO 2
            // -----------------------------------------------

            if (
                time >=
                this.tiempoDisparoDronPequeno2
            ) {

                this.dispararLaserDronPequeno(

                    this.dronPequeno2

                );


                this.tiempoDisparoDronPequeno2 =
                    time + 4000;

            }

        }


        // =====================================================
        // IMPACTOS
        // =====================================================

        this.comprobarImpactos();


        // =====================================================
        // VELOCIDAD SEGUN ENERGIA
        // =====================================================

        let velocidadActual;


        if (
            this.energiaKael >= 70
        ) {

            velocidadActual =

                this.gemaEnergiaActiva

                    ? this.velocidadNormalPotenciada

                    : this.velocidadNormal;

        }

        else if (
            this.energiaKael >= 30
        ) {

            velocidadActual =

                this.gemaEnergiaActiva

                    ? this.velocidadMediaPotenciada

                    : this.velocidadMedia;

        }

        else if (
            this.energiaKael >= 10
        ) {

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


        // =====================================================
        // MOVIMIENTO
        // =====================================================

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


        // =====================================================
        // SALTO
        // =====================================================

        if (

            (

                this.keys.SPACE.isDown ||

                this.cursors.up.isDown

            )

            &&

            this.kael.body.blocked.down

            &&

            this.energiaKael >=
            this.costoSalto

        ) {

            this.energiaKael -=
                this.costoSalto;


            if (
                this.energiaKael < 0
            ) {

                this.energiaKael =
                    0;

            }


            this.actualizarBarraEnergia();


            this.kael.setVelocityY(

                this.gemaEnergiaActiva

                    ? this.fuerzaSaltoPotenciado

                    : this.fuerzaSalto

            );

        }


        // =====================================================
        // RECARGA
        // =====================================================

        if (

            this.kael.body.blocked.down &&

            this.kael.body.velocity.x === 0 &&

            this.energiaKael <
            this.energiaMaxRecarga

        ) {

            const energiaAnterior =
                this.energiaKael;


            this.energiaKael +=

                this.velocidadRecarga *

                (
                    delta / 1000
                );


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
                this.energiaMaxRecarga &&

                this.energiaKael >=
                this.energiaMaxRecarga

            ) {

                this.energiaKael =
                    this.energiaMaxRecarga;


                this.actualizarBarraEnergia();


                this.brilloKaelEnergia();

            }

        }


        // =====================================================
        // LLEGADA GEMA
        // =====================================================

        if (

            !this.gemaEnergiaRecogida &&

            this.gemaEnergia &&

            this.kael.x >=

            this.puntoGemaEnergia - 35

        ) {

            this.activarGemaEnergia();

        }


        // =====================================================
        // LLEGADA CUARZO
        // =====================================================

        if (

            this.kael.x >=

            this.puntoCuarzo - 250

        ) {

            this.activarCuarzo();

        }

    }


    // =========================================================
    // FINAL DEL VALLE
    // TUNEL DORADO
    // =========================================================

    finalizarValle() {

        if (
            this.finalizando
        ) {
            return;
        }


        this.finalizando =
            true;


        // =====================================================
        // PARAR KAEL
        // =====================================================

        if (
            this.kael
        ) {

            this.kael.setVelocity(
                0,
                0
            );

            this.kael.body.enable =
                false;

        }


        // =====================================================
        // DESTRUIR LASERS
        // =====================================================

        if (
            this.lasers
        ) {

            for (
                const datos
                of this.lasers
            ) {

                if (
                    datos.laser
                ) {

                    datos.laser.destroy();

                }


                if (
                    datos.brillo
                ) {

                    datos.brillo.destroy();

                }

            }


            this.lasers.length =
                0;

        }


        // =====================================================
        // FLASH DORADO
        // =====================================================

        const destello =
            this.add.rectangle(

                640,

                360,

                1280,

                720,

                0xffd966,

                0

            );


        destello
            .setScrollFactor(0)
            .setDepth(100);


        this.tweens.add({

            targets:
                destello,

            alpha: 0.82,

            duration: 180,

            yoyo: true,

            ease: "Quad.easeOut"

        });


        // =====================================================
        // TUNEL DORADO
        // =====================================================

        for (
            let i = 0;
            i < 22;
            i++
        ) {

            const anillo =
                this.add.ellipse(

                    640,

                    360,

                    80 + i * 55,

                    45 + i * 34,

                    0xffd966,

                    0

                );


            anillo.setStrokeStyle(

                Phaser.Math.Between(
                    2,
                    7
                ),

                Phaser.Utils.Array.GetRandom([

                    0xffd966,

                    0xffb300,

                    0xffffcc,

                    0xffffff

                ]),

                Phaser.Math.FloatBetween(
                    0.35,
                    0.9
                )

            );


            anillo
                .setScrollFactor(0)
                .setDepth(103)
                .setScale(0.12);


            this.tweens.add({

                targets:
                    anillo,

                scale:
                    Phaser.Math.FloatBetween(
                        2.4,
                        5.2
                    ),

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        900,
                        1600
                    ),

                delay:
                    i * 45,

                ease: "Cubic.easeIn",

                onComplete: () => {

                    anillo.destroy();

                }

            });

        }


        // =====================================================
        // PARTICULAS HACIA EL TUNEL
        // =====================================================

        const colores = [

            0xffd966,

            0xffb300,

            0xffffcc,

            0xffffff,

            0x9b00ff,

            0x00ffff

        ];


        for (
            let i = 0;
            i < 170;
            i++
        ) {

            const angulo =

                Phaser.Math.FloatBetween(
                    0,
                    Math.PI * 2
                );


            const radio =

                Phaser.Math.Between(
                    80,
                    520
                );


            const x =

                640 +

                Math.cos(
                    angulo
                ) *

                radio;


            const y =

                360 +

                Math.sin(
                    angulo
                ) *

                radio *

                0.62;


            const particula =

                this.add.circle(

                    x,

                    y,

                    Phaser.Math.Between(
                        2,
                        7
                    ),

                    Phaser.Utils.Array.GetRandom(
                        colores
                    ),

                    Phaser.Math.FloatBetween(
                        0.5,
                        1
                    )

                );


            particula
                .setScrollFactor(0)
                .setDepth(104);


            this.tweens.add({

                targets:
                    particula,

                x: 640,

                y: 360,

                scale: 0.15,

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        700,
                        1500
                    ),

                delay:
                    Phaser.Math.Between(
                        0,
                        450
                    ),

                ease: "Cubic.easeIn",

                onComplete: () => {

                    particula.destroy();

                }

            });

        }


        // =====================================================
        // FRAGMENTOS
        // =====================================================

        for (
            let i = 0;
            i < 90;
            i++
        ) {

            const fragmento =

                this.add.rectangle(

                    Phaser.Math.Between(
                        0,
                        1280
                    ),

                    Phaser.Math.Between(
                        0,
                        720
                    ),

                    Phaser.Math.Between(
                        8,
                        55
                    ),

                    Phaser.Math.Between(
                        5,
                        28
                    ),

                    Phaser.Utils.Array.GetRandom(
                        colores
                    ),

                    Phaser.Math.FloatBetween(
                        0.45,
                        0.9
                    )

                );


            fragmento
                .setScrollFactor(0)
                .setDepth(105);


            this.tweens.add({

                targets:
                    fragmento,

                x: 640,

                y: 360,

                angle:
                    Phaser.Math.Between(
                        -360,
                        360
                    ),

                scaleX: 0.05,

                scaleY: 0.05,

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        800,
                        1700
                    ),

                delay:
                    Phaser.Math.Between(
                        0,
                        500
                    ),

                ease: "Cubic.easeIn",

                onComplete: () => {

                    fragmento.destroy();

                }

            });

        }


        // =====================================================
        // KAEL ENTRA AL TUNEL
        // =====================================================

        if (
            this.kaelVisual
        ) {

            this.tweens.add({

                targets:
                    this.kaelVisual,

                x: 640,

                y: 360,

                scale: 0.12,

                angle: 720,

                alpha: 0,

                duration: 1300,

                ease: "Cubic.easeIn"

            });

        }


        // =====================================================
        // MUNDO SE APAGA
        // =====================================================

        const elementosMundo = [

            this.sky,

            this.cables,

            this.floorImage,

            this.gemaEnergia,

            this.dron,

            this.dronHalo,

            this.dronAnillo,

            this.dronPequeno1,

            this.dronPequeno2

        ].filter(
            elemento => elemento
        );


        this.tweens.add({

            targets:
                elementosMundo,

            alpha: 0,

            scaleX: 1.04,

            scaleY: 1.04,

            duration: 1200,

            ease: "Cubic.easeIn"

        });


        // =====================================================
        // NEGRO
        // =====================================================

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
            .setDepth(106);


        this.tweens.add({

            targets:
                negro,

            alpha: 0.28,

            duration: 1200,

            ease: "Sine.easeInOut"

        });


        // =====================================================
        // FLASH FINAL
        // =====================================================

        this.time.delayedCall(

            1500,

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

                    targets:
                        flashBlanco,

                    alpha: 1,

                    duration: 180,

                    ease: "Quad.easeOut",

                    onComplete: () => {


                        flashBlanco.setFillStyle(

                            0xffd966,

                            1

                        );


                        this.tweens.add({

                            targets:
                                flashBlanco,

                            duration: 240,

                            onComplete: () => {


                                flashBlanco.setFillStyle(

                                    0xffffe0,

                                    1

                                );


                                this.tweens.add({

                                    targets:
                                        flashBlanco,

                                    alpha: 0,

                                    duration: 520,

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

                                            this.musicaValle =
                                                null;

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

        );

    }

}
