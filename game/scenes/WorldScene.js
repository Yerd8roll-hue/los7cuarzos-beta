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
        // 🌌 MUNDO
        // =========================================

        this.mundoAncho = 3000;

        const mundoAncho =
            this.mundoAncho;

        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            720
        );


        // =========================================
        // 🌌 SKY
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
        // 🌌 LUCES DEL CIELO
        // =========================================

        this.lucesCielo = [];

        for (let i = 0; i < 24; i++) {

            const luz = this.add.circle(
                Phaser.Math.Between(
                    40,
                    1240
                ),
                Phaser.Math.Between(
                    45,
                    260
                ),
                Phaser.Math.Between(
                    1,
                    2
                ),
                Phaser.Utils.Array.GetRandom([
                    0x00ffff,
                    0x9b00ff,
                    0x66ccff,
                    0xffffff
                ]),
                Phaser.Math.FloatBetween(
                    0.18,
                    0.55
                )
            );

            luz.setScrollFactor(0);
            luz.setDepth(1);

            this.lucesCielo.push(luz);


            this.tweens.add({

                targets: luz,

                alpha: {
                    from: 0.15,
                    to: 0.65
                },

                scale: {
                    from: 0.7,
                    to: 1.4
                },

                duration:
                    Phaser.Math.Between(
                        1200,
                        2600
                    ),

                yoyo: true,

                repeat: -1,

                delay:
                    Phaser.Math.Between(
                        0,
                        1500
                    ),

                ease: "Sine.easeInOut"

            });

        }


        // =========================================
        // 🌌 CABLES
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
        // 💎 PUNTO GEMA ENERGÍA
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
        // 🌌 AURA DEL TITULO
        // =========================================

        const auraTitulo =
            this.add.circle(
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

        const tituloValle =
            this.add.text(
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

        this.kael =
            this.physics.add.sprite(
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
        // 🔋 ENERGÍA
        // =========================================

        this.energiaMaxima = 100;

        this.energiaKael = 77;

        this.costoSalto = 10;

        this.energiaMaxRecarga = 70;

        this.velocidadRecarga = 10;

        this.brilloEnergiaActivo = false;


        this.gemaEnergiaActiva = false;


        // =========================================
        // 🛼 VELOCIDADES
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
        // 🦘 SALTO
        // =========================================

        this.fuerzaSalto = -500;

        this.fuerzaSaltoPotenciado = -680;


        // =========================================
        // 🤖 DRON GRANDE
        // =========================================

        this.crearDronGrande();


        // =========================================
        // 🤖🤖 DRONES PEQUEÑOS
        // =========================================

        this.dronesPequenosActivos = false;

        this.dronPeqIzq =
            this.crearDronPequeno(
                120,
                505,
                1
            );

        this.dronPeqDer =
            this.crearDronPequeno(
                mundoAncho - 120,
                505,
                -1
            );


        this.lasersPequenos = [];

        this.proximoDisparoIzq = 0;
        this.proximoDisparoDer = 0;

        this.danoLaser = 7;


        // =========================================
        // 💎 GEMA DE ENERGÍA
        // =========================================

        this.crearGemaEnergia();


        // =========================================
        // 📊 BARRA DE ENERGÍA
        // =========================================

        this.crearBarraEnergia();


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

                SPACE:
                    Phaser.Input.Keyboard.KeyCodes.SPACE

            });


        // =========================================
        // CUARZO
        // =========================================

        this.activarCuarzo = () => {

            if (
                this.eventoCuarzoActivo
            ) {
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
    // 🤖 DRON GRANDE
    // =============================================

    crearDronGrande() {

        this.dron =
            this.add.container(
                1900,
                390
            );

        this.dron.setDepth(7);


        const cuerpo =
            this.add.graphics();

        cuerpo.fillStyle(
            0x202a32,
            1
        );

        cuerpo.fillRoundedRect(
            -38,
            -17,
            76,
            34,
            10
        );

        cuerpo.lineStyle(
            2,
            0x607580,
            0.9
        );

        cuerpo.strokeRoundedRect(
            -38,
            -17,
            76,
            34,
            10
        );

        this.dron.add(cuerpo);


        const placa =
            this.add.rectangle(
                0,
                -19,
                38,
                6,
                0x34434d,
                1
            );

        placa.setStrokeStyle(
            1,
            0x00ffff,
            0.8
        );

        this.dron.add(placa);


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


        const detalleIzq =
            this.add.rectangle(
                -42,
                0,
                5,
                16,
                0x00bcd4,
                0.65
            );

        this.dron.add(
            detalleIzq
        );


        const detalleDer =
            this.add.rectangle(
                42,
                0,
                5,
                16,
                0x00bcd4,
                0.65
            );

        this.dron.add(
            detalleDer
        );


        this.dronHalo =
            this.add.circle(
                1900,
                390,
                45,
                0x00d9ff,
                0.045
            );

        this.dronHalo.setDepth(6);


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


        this.dronDetectando = false;


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

            targets: this.dronHalo,

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

            targets: this.dronAnillo,

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


        this.tweens.add({

            targets: this.dron,

            y: {
                from: 384,
                to: 396
            },

            duration: 1300,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        const moverDron = () => {

            if (
                !this.dron ||
                this.finalizando
            ) {
                return;
            }


            this.tweens.add({

                targets: this.dron,

                x: 2200,

                duration: 4200,

                ease: "Sine.easeInOut",

                onComplete: () => {

                    this.tweens.add({

                        targets: this.dron,

                        x: this.puntoCuarzo,

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


    // =============================================
    // 🤖 DRON PEQUEÑO
    // =============================================

    crearDronPequeno(
        x,
        y,
        direccion
    ) {

        const dron =
            this.add.container(
                x,
                y
            );

        dron.setDepth(7);


        // CUERPO CASI NEGRO
        const cuerpo =
            this.add.graphics();

        cuerpo.fillStyle(
            0x080d12,
            1
        );

        cuerpo.fillRoundedRect(
            -20,
            -11,
            40,
            22,
            7
        );

        cuerpo.lineStyle(
            2,
            0x26343b,
            1
        );

        cuerpo.strokeRoundedRect(
            -20,
            -11,
            40,
            22,
            7
        );

        dron.add(cuerpo);


        // NÚCLEO VERDE
        const nucleo =
            this.add.circle(
                0,
                0,
                4,
                0x39ff14,
                1
            );

        dron.add(nucleo);


        // HALO VERDE
        const brillo =
            this.add.circle(
                0,
                0,
                10,
                0x39ff14,
                0.10
            );

        dron.add(brillo);


        // LUZ LATERAL
        const luz =
            this.add.rectangle(
                direccion * 17,
                0,
                3,
                9,
                0x39ff14,
                0.75
            );

        dron.add(luz);


        // ANTENA
        const antena =
            this.add.rectangle(
                0,
                -17,
                2,
                7,
                0x1d292e,
                1
            );

        dron.add(antena);


        // LED
        const led =
            this.add.circle(
                0,
                -21,
                2,
                0x39ff14,
                0.9
            );

        dron.add(led);


        // PULSO
        this.tweens.add({

            targets: [
                nucleo,
                brillo
            ],

            scale: {
                from: 0.8,
                to: 1.25
            },

            alpha: {
                from: 0.35,
                to: 1
            },

            duration: 700,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // FLOTACIÓN
        this.tweens.add({

            targets: dron,

            y: y - 10,

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        dron.direccion =
            direccion;

        return dron;

    }


    // =============================================
    // 💎 GEMA DE ENERGÍA
    // =============================================

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

        this.auraGemaEnergia
            .setDepth(7);


        this.brilloGemaEnergia =
            this.add.circle(
                this.puntoGemaEnergia,
                500,
                12,
                0xe98cff,
                0.18
            );

        this.brilloGemaEnergia
            .setDepth(8);


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


        this.activarGemaEnergia =
            () => {

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


                // EXPLOSIÓN VIOLETA
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


                // PARTÍCULAS
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

                        targets: particula,

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

                        delay: i * 25,

                        ease: "Cubic.easeIn",

                        onComplete: () => {

                            particula.destroy();

                        }

                    });

                }


                // ENERGÍA PRINCIPAL
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


                        this.gemaEnergiaActiva =
                            true;


                        // ACTIVAR DRONES
                        this.dronesPequenosActivos =
                            true;


                        this.proximoDisparoIzq =
                            this.time.now + 2500;

                        this.proximoDisparoDer =
                            this.time.now + 4000;


                        this.brilloKaelEnergia();


                        // HALO
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


                        // DIÁLOGO
                        this.mostrarDialogoKael();


                        // DESAPARECER GEMA
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

    }


    // =============================================
    // ☁️ DIÁLOGO KAEL
    // =============================================

    mostrarDialogoKael() {

        if (!this.kael) {
            return;
        }


        const nube =
            this.add.graphics();

        nube.setDepth(100);


        const texto =
            this.add.text(
                0,
                0,
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

        texto.setOrigin(0.5);
        texto.setDepth(101);


        this.tweens.add({

            targets: [
                nube,
                texto
            ],

            alpha: {
                from: 0,
                to: 1
            },

            duration: 400

        });


        const actualizar =
            () => {

                if (
                    !this.kael ||
                    !nube ||
                    !texto
                ) {
                    return;
                }


                const x =
                    this.kael.x;

                const y =
                    this.kael.y - 155;


                nube.clear();


                nube.fillStyle(
                    0xffffff,
                    1
                );

                nube.fillRoundedRect(
                    x - 155,
                    y - 58,
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
                    x - 155,
                    y - 58,
                    310,
                    116,
                    32
                );


                texto.setPosition(
                    x,
                    y
                );

            };


        this.time.addEvent({

            delay: 16,

            repeat: 165,

            callback: actualizar

        });


        this.time.delayedCall(
            2700,
            () => {

                this.tweens.add({

                    targets: [
                        nube,
                        texto
                    ],

                    alpha: 0,

                    duration: 450,

                    onComplete: () => {

                        nube.destroy();
                        texto.destroy();

                        this.mostrarAvisoCuarzo();

                    }

                });

            }
        );

    }


    // =============================================
    // 🚨 ALERTA DRON GRANDE
    // =============================================

    activarAlertaDron() {

        if (
            !this.dron ||
            !this.dronLedIzq
        ) {
            return;
        }


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


        this.dronNucleo.setFillStyle(
            0xff3333,
            1
        );

        this.dronNucleoBrillo.setFillStyle(
            0xff2222,
            0.18
        );


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


        const seguir =
            this.time.addEvent({

                delay: 16,

                repeat: 150,

                callback: () => {

                    if (this.dron) {

                        alerta.x =
                            this.dron.x;

                        alerta.y =
                            this.dron.y - 80;

                    }

                }

            });


        this.time.delayedCall(
            650,
            () => {

                this.mostrarDialogoKaelDron();

            }
        );


        this.time.delayedCall(
            2400,
            () => {

                seguir.remove();

                this.tweens.add({

                    targets: alerta,

                    alpha: 0,

                    y: "-=15",

                    duration: 350,

                    onComplete: () => {

                        alerta.destroy();

                    }

                });

            }
        );

    }


    // =============================================
    // 😏 DIÁLOGO DRON
    // =============================================

    mostrarDialogoKaelDron() {

        if (!this.kael) {
            return;
        }


        const texto =
            this.add.text(
                this.kael.x,
                this.kael.y - 155,
                "Tranquilo, dron…\nsolo estaba mirando.\nBueno… ¡ahora sí me toca correr!",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    fontStyle: "bold",
                    color: "#000000",
                    align: "center",
                    lineSpacing: 4,
                    resolution: 2,

                    backgroundColor:
                        "#ffffff"
                }
            );


        texto
            .setOrigin(0.5)
            .setPadding(14, 10)
            .setDepth(101);


        this.tweens.add({

            targets: texto,

            scale: {
                from: 0.7,
                to: 1
            },

            alpha: {
                from: 0,
                to: 1
            },

            duration: 400,

            ease: "Back.easeOut"

        });


        this.time.delayedCall(
            2700,
            () => {

                this.tweens.add({

                    targets: texto,

                    alpha: 0,

                    duration: 450,

                    onComplete: () => {

                        texto.destroy();

                    }

                });

            }
        );

    }


    // =============================================
    // 💬 KAEL RECIBE DISPARO
    // =============================================

    mostrarGolpeKael() {

        if (!this.kael) {
            return;
        }


        const nube =
            this.add.graphics();

        const texto =
            this.add.text(
                this.kael.x,
                this.kael.y - 125,
                "¡VAYA, ESO SÍ DOLIÓ!",
                {
                    fontFamily: "Arial",
                    fontSize: "17px",
                    fontStyle: "bold",
                    color: "#000000",
                    align: "center",
                    resolution: 2
                }
            );


        nube.setDepth(100);

        texto
            .setOrigin(0.5)
            .setDepth(101);


        const dibujar =
            () => {

                if (!this.kael) {
                    return;
                }


                const x =
                    this.kael.x;

                const y =
                    this.kael.y - 125;


                nube.clear();


                nube.fillStyle(
                    0xffffff,
                    1
                );

                nube.fillRoundedRect(
                    x - 125,
                    y - 38,
                    250,
                    76,
                    25
                );

                nube.lineStyle(
                    5,
                    0x000000,
                    1
                );

                nube.strokeRoundedRect(
                    x - 125,
                    y - 38,
                    250,
                    76,
                    25
                );


                nube.fillStyle(
                    0xffffff,
                    1
                );

                nube.fillCircle(
                    x - 38,
                    y + 55,
                    12
                );

                nube.fillCircle(
                    x - 22,
                    y + 72,
                    8
                );


                texto.setPosition(
                    x,
                    y
                );

            };


        dibujar();


        this.tweens.add({

            targets: [
                nube,
                texto
            ],

            scale: {
                from: 0.7,
                to: 1
            },

            alpha: {
                from: 0,
                to: 1
            },

            duration: 250,

            ease: "Back.easeOut"

        });


        this.time.addEvent({

            delay: 16,

            repeat: 90,

            callback: dibujar

        });


        this.time.delayedCall(
            1500,
            () => {

                this.tweens.add({

                    targets: [
                        nube,
                        texto
                    ],

                    alpha: 0,

                    scale: 0.9,

                    duration: 300,

                    onComplete: () => {

                        nube.destroy();
                        texto.destroy();

                    }

                });

            }
        );

    }


    // =============================================
    // 🟢 DISPARAR LÁSER PEQUEÑO
    // =============================================

    dispararLaserPequeno(
        dron
    ) {

        if (
            !this.dronesPequenosActivos ||
            !dron ||
            !this.kael ||
            this.finalizando
        ) {
            return;
        }


        const origenX =
            dron.x;

        const origenY =
            dron.y;


        const objetivoX =
            this.kael.x;

        const objetivoY =
            this.kael.y;


        const laser =
            this.add.graphics();

        laser.setDepth(6);


        // DESTELLO DEL DISPARO
        const flash =
            this.add.circle(
                origenX,
                origenY,
                7,
                0x39ff14,
                0.9
            );

        flash.setDepth(8);


        this.tweens.add({

            targets: flash,

            scale: 2.5,

            alpha: 0,

            duration: 180,

            onComplete: () => {

                flash.destroy();

            }

        });


        // LÁSER
        laser.lineStyle(
            4,
            0x39ff14,
            0.95
        );

        laser.beginPath();

        laser.moveTo(
            origenX,
            origenY
        );

        laser.lineTo(
            objetivoX,
            objetivoY
        );

        laser.strokePath();


        // BRILLO
        const brilloLaser =
            this.add.graphics();

        brilloLaser.setDepth(5);

        brilloLaser.lineStyle(
            10,
            0x39ff14,
            0.12
        );

        brilloLaser.beginPath();

        brilloLaser.moveTo(
            origenX,
            origenY
        );

        brilloLaser.lineTo(
            objetivoX,
            objetivoY
        );

        brilloLaser.strokePath();


        this.lasersPequenos.push({

            x: origenX,

            y: origenY,

            objetivoX,

            objetivoY,

            laser,

            brilloLaser,

            velocidad: 900,

            golpeado: false

        });

    }


    // =============================================
    // 💥 GOLPEAR KAEL
    // =============================================

    golpearKaelConLaser() {

        if (
            !this.kael ||
            this.finalizando
        ) {
            return;
        }


        // QUITAR 7
        this.energiaKael -=
            this.danoLaser;


        if (
            this.energiaKael < 0
        ) {

            this.energiaKael = 0;

        }


        this.actualizarBarraEnergia();


        // =====================================
        // 🔴 DESTELLO ROJO
        // =====================================

        this.kael.setTint(
            0xff3333
        );


        const destello =
            this.add.circle(
                this.kael.x,
                this.kael.y,
                18,
                0xff2222,
                0.55
            );

        destello.setDepth(9);


        this.cameras.main.shake(
            180,
            0.006
        );


        this.tweens.add({

            targets: destello,

            scale: 2.8,

            alpha: 0,

            duration: 350,

            ease: "Cubic.easeOut",

            onUpdate: () => {

                if (this.kael) {

                    destello.x =
                        this.kael.x;

                    destello.y =
                        this.kael.y;

                }

            },

            onComplete: () => {

                destello.destroy();

            }

        });


        this.time.delayedCall(
            180,
            () => {

                if (
                    this.kael &&
                    !this.finalizando
                ) {

                    this.kael.clearTint();

                }

            }
        );


        // MENSAJE
        this.mostrarGolpeKael();


        // =====================================
        // ☠️ SIN ENERGÍA
        // =====================================

        if (
            this.energiaKael <= 0
        ) {

            this.time.delayedCall(
                450,
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


    // =============================================
    // ✨ AVISO CUARZO
    // =============================================

    mostrarAvisoCuarzo() {

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
            .setDepth(80);


        this.tweens.add({

            targets: destello,

            alpha: 0.42,

            duration: 130,

            yoyo: true,

            onComplete: () => {

                destello.destroy();

            }

        });


        const aviso =
            this.add.text(
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

                    onComplete: () => {

                        aviso.destroy();

                    }

                });

            }
        );

    }


    // =============================================
    // 📊 BARRA DE ENERGÍA
    // =============================================

    crearBarraEnergia() {

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


        // =====================================
        // 🧑 ICONO KAEL
        // =====================================

        if (
            this.textures.exists("kael-icon")
        ) {

            this.iconoKael =
                this.add.image(
                    32,
                    65,
                    "kael-icon"
                );

            this.iconoKael
                .setOrigin(0.5)
                .setDisplaySize(
                    42,
                    42
                )
                .setScrollFactor(0)
                .setDepth(53);

        }


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

            targets:
                this.barraEnergia,

            alpha: {
                from: 0.88,
                to: 1
            },

            duration: 900,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });

    }


    // =============================================
    // 🔋 ACTUALIZAR BARRA
    // =============================================

    actualizarBarraEnergia() {

        if (
            !this.barraEnergiaMarco ||
            !this.barraEnergiaFondo ||
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
            ancho *
            porcentaje;


        if (
            anchoEnergia > 0
        ) {

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


        if (
            this.textoEnergia
        ) {

            this.textoEnergia.setText(
                "ENERGÍA  " +
                Math.floor(
                    this.energiaKael
                ) +
                " / " +
                this.energiaMaxima
            );

        }


        // BARRA ROJA CUANDO ESTÁ MUY BAJA
        if (
            porcentaje <= 0.20
        ) {

            this.barraEnergiaMarco.lineStyle(
                3,
                0xff3333,
                0.9
            );

        }

    }


    // =============================================
    // ✨ BRILLO KAEL
    // =============================================

    brilloKaelEnergia() {

        if (
            !this.kael ||
            this.brilloEnergiaActivo
        ) {
            return;
        }


        this.brilloEnergiaActivo =
            true;


        const escalaX =
            this.kael.scaleX;

        const escalaY =
            this.kael.scaleY;


        this.kael.setTint(
            0x66ffff
        );


        this.tweens.add({

            targets: this.kael,

            scaleX:
                escalaX * 1.12,

            scaleY:
                escalaY * 1.12,

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

                this.brilloEnergiaActivo =
                    false;

            }
        );

    }


    // =============================================
    // 💥💥 FINAL ÉPICO DEL VALLE
    // =============================================

    finalizarValle() {

        if (
            this.finalizando
        ) {
            return;
        }


        this.finalizando = true;


        // =====================================
        // DETENER DRONES
        // =====================================

        this.dronesPequenosActivos =
            false;


        if (
            this.lasersPequenos
        ) {

            this.lasersPequenos.forEach(
                laser => {

                    if (laser.laser) {
                        laser.laser.destroy();
                    }

                    if (laser.brilloLaser) {
                        laser.brilloLaser.destroy();
                    }

                }
            );

            this.lasersPequenos = [];

        }


        // =====================================
        // DETENER KAEL
        // =====================================

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


        // =====================================
        // 🌌 TEMBLOR INICIAL
        // =====================================

        this.cameras.main.shake(
            900,
            0.012
        );


        // =====================================
        // ⚡ DESTELLO BLANCO
        // =====================================

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
            .setDepth(200);


        this.tweens.add({

            targets: destello,

            alpha: 0.85,

            duration: 130,

            yoyo: true

        });


        // =====================================
        // 🌈 ONDAS DE CUARZOS
        // =====================================

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


        for (
            let i = 0;
            i < 8;
            i++
        ) {

            this.time.delayedCall(
                i * 120,
                () => {

                    const onda =
                        this.add.circle(
                            640,
                            360,
                            40,
                            colores[i],
                            0
                        );

                    onda
                        .setScrollFactor(0)
                        .setDepth(202);

                    onda.setStrokeStyle(
                        7,
                        colores[i],
                        0.85
                    );


                    this.tweens.add({

                        targets: onda,

                        scale: 18,

                        alpha: 0,

                        duration: 1100,

                        ease: "Cubic.easeOut",

                        onComplete: () => {

                            onda.destroy();

                        }

                    });

                }
            );

        }


        // =====================================
        // 💎 FRAGMENTOS
        // =====================================

        for (
            let i = 0;
            i < 180;
            i++
        ) {

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


            const ancho =
                Phaser.Math.Between(
                    8,
                    75
                );

            const alto =
                Phaser.Math.Between(
                    6,
                    55
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
                        0.5,
                        0.95
                    )
                );


            fragmento
                .setScrollFactor(0)
                .setDepth(203);


            if (
                i % 3 === 0
            ) {

                fragmento.setStrokeStyle(
                    2,
                    0xffffff,
                    0.5
                );

            }


            this.tweens.add({

                targets:
                    fragmento,

                x:
                    x +
                    Phaser.Math.Between(
                        -700,
                        700
                    ),

                y:
                    y +
                    Phaser.Math.Between(
                        -600,
                        600
                    ),

                angle:
                    Phaser.Math.Between(
                        -720,
                        720
                    ),

                scaleX:
                    Phaser.Math.FloatBetween(
                        0.03,
                        0.25
                    ),

                scaleY:
                    Phaser.Math.FloatBetween(
                        0.03,
                        0.25
                    ),

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        1000,
                        1900
                    ),

                delay:
                    Phaser.Math.Between(
                        0,
                        450
                    ),

                ease: "Cubic.easeIn"

            });

        }


        // =====================================
        // 💥 EXPLOSIÓN CENTRAL
        // =====================================

        this.time.delayedCall(
            600,
            () => {

                const explosion =
                    this.add.circle(
                        640,
                        360,
                        35,
                        0xffffff,
                        1
                    );

                explosion
                    .setScrollFactor(0)
                    .setDepth(205);


                this.tweens.add({

                    targets: explosion,

                    scale: 12,

                    alpha: 0,

                    duration: 900,

                    ease: "Cubic.easeOut",

                    onComplete: () => {

                        explosion.destroy();

                    }

                });


                // SEGUNDA ONDA
                const onda =
                    this.add.circle(
                        640,
                        360,
                        80,
                        0xffffff,
                        0
                    );

                onda
                    .setScrollFactor(0)
                    .setDepth(204);

                onda.setStrokeStyle(
                    15,
                    0xffffff,
                    0.8
                );


                this.tweens.add({

                    targets: onda,

                    scale: 7,

                    alpha: 0,

                    duration: 850,

                    ease: "Cubic.easeOut",

                    onComplete: () => {

                        onda.destroy();

                    }

                });

            }
        );


        // =====================================
        // 🌌 DESVANECER MUNDO
        // =====================================

        const elementosMundo = [

            this.sky,
            this.cables,
            this.floorImage,
            this.gemaEnergia,
            this.auraGemaEnergia,
            this.brilloGemaEnergia,
            this.dron,
            this.dronHalo,
            this.dronAnillo,
            this.dronPeqIzq,
            this.dronPeqDer

        ].filter(
            elemento => elemento
        );


        this.tweens.add({

            targets:
                elementosMundo,

            alpha: 0,

            scaleX: 1.05,

            scaleY: 1.05,

            duration: 1500,

            ease: "Cubic.easeIn"

        });


        // =====================================
        // 🧑 KAEL DESAPARECE
        // =====================================

        if (
            this.kael
        ) {

            this.tweens.add({

                targets:
                    this.kael,

                alpha: 0,

                scale: 0.15,

                angle: 360,

                duration: 1100,

                ease: "Cubic.easeIn"

            });

        }


        // =====================================
        // 🌑 OSCURECER
        // =====================================

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
            .setDepth(210);


        this.tweens.add({

            targets: negro,

            alpha: 0.40,

            duration: 1300,

            ease: "Sine.easeInOut"

        });


        // =====================================
        // ⚡ GRAN FLASH FINAL
        // =====================================

        this.time.delayedCall(
            1900,
            () => {

                const flash =
                    this.add.rectangle(
                        640,
                        360,
                        1280,
                        720,
                        0xffffff,
                        0
                    );

                flash
                    .setScrollFactor(0)
                    .setDepth(220);


                this.tweens.add({

                    targets: flash,

                    alpha: 1,

                    duration: 180,

                    ease: "Quad.easeOut",

                    onComplete: () => {


                        // DORADO
                        flash.setFillStyle(
                            0xffd966,
                            1
                        );


                        this.cameras.main.flash(
                            250,
                            255,
                            255,
                            255
                        );


                        this.tweens.add({

                            targets: flash,

                            alpha: 0.95,

                            duration: 220,

                            onComplete: () => {


                                // VIOLETA
                                flash.setFillStyle(
                                    0x9b00ff,
                                    1
                                );


                                this.tweens.add({

                                    targets: flash,

                                    alpha: 0.85,

                                    duration: 180,

                                    onComplete: () => {


                                        // BLANCO
                                        flash.setFillStyle(
                                            0xffffff,
                                            1
                                        );


                                        this.tweens.add({

                                            targets: flash,

                                            alpha: 0,

                                            duration: 550,

                                            ease: "Sine.easeInOut",

                                            onComplete: () => {

                                                flash.destroy();

                                                negro.destroy();

                                                destello.destroy();


                                                // =================================
                                                // 🎵 DETENER MÚSICA
                                                // =================================

                                                if (
                                                    this.musicaValle
                                                ) {

                                                    this.musicaValle.stop();

                                                    this.musicaValle.destroy();

                                                    this.musicaValle =
                                                        null;

                                                }


                                                // =================================
                                                // 🔥 VOLVER AL INICIO
                                                // =================================

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
    // 🔄 UPDATE
    // =============================================

    update(
        time,
        delta
    ) {

        if (
            this.finalizando
        ) {
            return;
        }


        // =========================================
        // 🤖 DRON GRANDE
        // =========================================

        if (
            this.dron &&
            this.dronNucleo
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


            if (
                detectado &&
                !this.dronDetectando
            ) {

                this.dronDetectando =
                    true;

                this.activarAlertaDron();

            }


            if (
                !detectado &&
                this.dronDetectando
            ) {

                this.dronDetectando =
                    false;

            }

        }


        // =========================================
        // 🤖🤖 DRONES PEQUEÑOS
        // =========================================

        if (
            this.dronesPequenosActivos
        ) {

            // IZQUIERDO → DERECHA
            if (
                this.dronPeqIzq
            ) {

                this.dronPeqIzq.x +=
                    0.65 *
                    (delta / 16.67);


                if (
                    this.dronPeqIzq.x >
                    this.mundoAncho - 100
                ) {

                    this.dronPeqIzq.x =
                        100;

                }

            }


            // DERECHA → IZQUIERDA
            if (
                this.dronPeqDer
            ) {

                this.dronPeqDer.x -=
                    0.65 *
                    (delta / 16.67);


                if (
                    this.dronPeqDer.x <
                    100
                ) {

                    this.dronPeqDer.x =
                        this.mundoAncho - 100;

                }

            }


            // =====================================
            // 🟢 DETECCIÓN + DISPARO IZQUIERDO
            // =====================================

            if (
                this.dronPeqIzq
            ) {

                const distancia =
                    Math.abs(
                        this.kael.x -
                        this.dronPeqIzq.x
                    );


                if (
                    distancia < 650 &&
                    time >=
                    this.proximoDisparoIzq
                ) {

                    this.proximoDisparoIzq =
                        time + 4000;


                    this.dispararLaserPequeno(
                        this.dronPeqIzq
                    );

                }

            }


            // =====================================
            // 🟢 DETECCIÓN + DISPARO DERECHO
            // =====================================

            if (
                this.dronPeqDer
            ) {

                const distancia =
                    Math.abs(
                        this.kael.x -
                        this.dronPeqDer.x
                    );


                if (
                    distancia < 650 &&
                    time >=
                    this.proximoDisparoDer
                ) {

                    this.proximoDisparoDer =
                        time + 4000;


                    this.dispararLaserPequeno(
                        this.dronPeqDer
                    );

                }

            }

        }


        // =========================================
        // 🟢 ACTUALIZAR LÁSERES
        // =========================================

        if (
            this.lasersPequenos &&
            this.lasersPequenos.length > 0
        ) {

            for (
                let i =
                    this.lasersPequenos.length - 1;
                i >= 0;
                i--
            ) {

                const laser =
                    this.lasersPequenos[i];


                const dx =
                    laser.objetivoX -
                    laser.x;


                const dy =
                    laser.objetivoY -
                    laser.y;


                const distancia =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distancia < 25
                ) {

                    if (
                        !laser.golpeado
                    ) {

                        laser.golpeado =
                            true;

                        this.golpearKaelConLaser();

                    }


                    laser.laser.destroy();

                    laser.brilloLaser.destroy();


                    this.lasersPequenos.splice(
                        i,
                        1
                    );


                    continue;

                }


                const velocidad =
                    900 *
                    (delta / 1000);


                laser.x +=
                    (dx / distancia) *
                    velocidad;


                laser.y +=
                    (dy / distancia) *
                    velocidad;


                laser.laser.clear();


                laser.laser.lineStyle(
                    4,
                    0x39ff14,
                    0.95
                );


                laser.laser.beginPath();

                laser.laser.moveTo(
                    laser.x,
                    laser.y
                );

                laser.laser.lineTo(
                    laser.objetivoX,
                    laser.objetivoY
                );

                laser.laser.strokePath();


                laser.brilloLaser.clear();


                laser.brilloLaser.lineStyle(
                    10,
                    0x39ff14,
                    0.12
                );


                laser.brilloLaser.beginPath();

                laser.brilloLaser.moveTo(
                    laser.x,
                    laser.y
                );

                laser.brilloLaser.lineTo(
                    laser.objetivoX,
                    laser.objetivoY
                );

                laser.brilloLaser.strokePath();

            }

        }


        // =========================================
        // 🛼 VELOCIDAD
        // =========================================

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
        // 🦘 SALTO
        // =========================================

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
            this.energiaKael <
            this.energiaMaxRecarga
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
                this.energiaMaxRecarga &&
                this.energiaKael >=
                this.energiaMaxRecarga
            ) {

                this.brilloKaelEnergia();

            }

        }


        // =========================================
        // 💎 GEMA ENERGÍA
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

    }

}
