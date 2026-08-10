import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // =========================================
        // COLOR
        // =========================================

        this.cameras.main.setBackgroundColor("#05070d");

        // =========================================
        // MUSICA
        // =========================================

        this.finalizando = false;

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

        this.mundoAncho = 3000;

        this.physics.world.setBounds(
            0,
            0,
            this.mundoAncho,
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
        // FLOOR
        // =========================================

        this.floorImage = this.add.image(
            0,
            570,
            "floor"
        );

        this.floorImage
            .setOrigin(0, 0)
            .setDisplaySize(
                this.mundoAncho,
                150
            )
            .setDepth(3);

        // =========================================
        // PISO FISICO
        // =========================================

        this.ground = this.add.rectangle(
            this.mundoAncho / 2,
            650,
            this.mundoAncho,
            50,
            0x000000,
            0
        );

        this.physics.add.existing(
            this.ground,
            true
        );

        // =========================================
        // PUNTO CUARZO
        // =========================================

        this.puntoCuarzo = 1672;
        this.eventoCuarzoActivo = false;

        // =========================================
        // GEMA ENERGIA
        // =========================================

        this.puntoGemaEnergia = 2800;
        this.gemaEnergiaRecogida = false;
        this.gemaEnergiaActiva = false;

        // =========================================
        // TITULO
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

        // =========================================
        // KAEL
        // =========================================

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

        // =========================================
        // KAEL SUTIL
        // =========================================

        this.kael.setScale(0.78);
        this.kael.clearTint();

        // =========================================
        // PATINES
        // =========================================

        this.kaelPatines = this.add.graphics();

        this.kaelPatines.setDepth(4);

        this.dibujarPatinesKael();

        // =========================================
        // COLLIDER
        // =========================================

        this.physics.add.collider(
            this.kael,
            this.ground
        );

        // =========================================
        // ENERGIA
        // =========================================

        this.energiaMaxima = 100;
        this.energiaKael = 77;

        this.costoSalto = 10;

        this.energiaMaxRecarga = 70;
        this.velocidadRecarga = 10;

        this.brilloEnergiaActivo = false;

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

        this.fuerzaSalto = -500;
        this.fuerzaSaltoPotenciado = -680;

        // =========================================
        // DRON GRANDE
        // =========================================

        this.crearDronGrande();

        // =========================================
        // DRONES PEQUEÑOS
        // =========================================

        this.crearDronesPequenos();

        // =========================================
        // GEMA
        // =========================================

        this.crearGemaEnergia();

        // =========================================
        // BARRA
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
            this.mundoAncho,
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
        // ESTADO DE DISPAROS
        // =========================================

        this.laseres = [];

        this.dronGrandePuedeDisparar = true;

        this.dronesPequenosActivos = false;

        this.dronPequeno1PuedeDisparar = true;
        this.dronPequeno2PuedeDisparar = true;

        // =========================================
        // EVENTO CUARZO
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

                        if (this.finalizando) {
                            return;
                        }

                        const pulso = this.add.circle(
                            this.puntoCuarzo,
                            330,
                            45,
                            0x00ffff,
                            0
                        );

                        pulso
                            .setStrokeStyle(
                                8,
                                0x00ffff,
                                1
                            )
                            .setDepth(8)
                            .setScale(0.2);

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
    // PATINES DE KAEL
    // =============================================

    dibujarPatinesKael() {

        if (!this.kaelPatines) {
            return;
        }

        this.kaelPatines.clear();

        this.kaelPatines.fillStyle(
            0x111820,
            1
        );

        this.kaelPatines.fillRoundedRect(
            -18,
            20,
            17,
            5,
            2
        );

        this.kaelPatines.fillRoundedRect(
            2,
            20,
            17,
            5,
            2
        );

        this.kaelPatines.fillStyle(
            0x555f66,
            1
        );

        this.kaelPatines.fillCircle(
            -13,
            27,
            3
        );

        this.kaelPatines.fillCircle(
            13,
            27,
            3
        );

        this.kaelPatines.fillStyle(
            0xff3344,
            0.75
        );

        this.kaelPatines.fillCircle(
            -4,
            23,
            2
        );

        this.kaelPatines.fillCircle(
            7,
            23,
            2
        );
    }

    // =============================================
    // DRON GRANDE
    // =============================================

    crearDronGrande() {

        this.dron = this.add.container(
            1900,
            390
        );

        this.dron.setDepth(7);

        // cuerpo

        this.dronBody = this.add.graphics();

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

        // placa

        this.dronPlaca = this.add.rectangle(
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

        // nucleo

        this.dronNucleo = this.add.circle(
            0,
            0,
            8,
            0x00eaff,
            1
        );

        this.dron.add(
            this.dronNucleo
        );

        // brillo

        this.dronNucleoBrillo = this.add.circle(
            0,
            0,
            17,
            0x00eaff,
            0.10
        );

        this.dron.add(
            this.dronNucleoBrillo
        );

        // leds

        this.dronLedIzq = this.add.circle(
            -27,
            0,
            4,
            0xff3333,
            0.85
        );

        this.dron.add(
            this.dronLedIzq
        );

        this.dronLedDer = this.add.circle(
            27,
            0,
            4,
            0xff3333,
            0.85
        );

        this.dron.add(
            this.dronLedDer
        );

        // antena

        this.dronAntena = this.add.rectangle(
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

        this.dronAntenaLed = this.add.circle(
            0,
            -35,
            3,
            0xff3333,
            0.9
        );

        this.dron.add(
            this.dronAntenaLed
        );

        // detalles

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

        // halo

        this.dronHalo = this.add.circle(
            1900,
            390,
            45,
            0x00d9ff,
            0.045
        );

        this.dronHalo.setDepth(6);

        // anillo

        this.dronAnillo = this.add.circle(
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

        // =====================================
        // PULSO NUCLEO
        // =====================================

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

        // =====================================
        // HALO
        // =====================================

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

        // =====================================
        // ANILLO
        // =====================================

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

        // =====================================
        // FLOTACION
        // =====================================

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

        // =====================================
        // RECORRIDO
        // =====================================

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

                    if (this.finalizando) {
                        return;
                    }

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
    // DRONES PEQUEÑOS
    // =============================================

    crearDronesPequenos() {

        this.dronPequeno1 =
            this.crearDronPequeno(
                450,
                500
            );

        this.dronPequeno2 =
            this.crearDronPequeno(
                2450,
                500
            );

        // =====================================
        // RECORRIDO DRON 1
        // =====================================

        this.tweens.add({
            targets: this.dronPequeno1,
            x: 2450,
            duration: 8500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // =====================================
        // RECORRIDO DRON 2
        // =====================================

        this.tweens.add({
            targets: this.dronPequeno2,
            x: 450,
            duration: 8500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    }

    // =============================================
    // CREAR DRON PEQUEÑO
    // =============================================

    crearDronPequeno(x, y) {

        const dron = this.add.container(
            x,
            y
        );

        dron.setDepth(6);

        const cuerpo =
            this.add.graphics();

        cuerpo.fillStyle(
            0x080d11,
            1
        );

        cuerpo.fillRoundedRect(
            -24,
            -12,
            48,
            24,
            7
        );

        cuerpo.lineStyle(
            2,
            0x28343b,
            0.9
        );

        cuerpo.strokeRoundedRect(
            -24,
            -12,
            48,
            24,
            7
        );

        dron.add(cuerpo);

        const nucleo =
            this.add.circle(
                0,
                0,
                5,
                0x35ff66,
                0.95
            );

        dron.add(nucleo);

        const brillo =
            this.add.circle(
                0,
                0,
                12,
                0x00ff55,
                0.08
            );

        dron.add(brillo);

        const antena =
            this.add.rectangle(
                0,
                -18,
                2,
                7,
                0x3c474c,
                1
            );

        dron.add(antena);

        this.tweens.add({
            targets: nucleo,
            alpha: {
                from: 0.5,
                to: 1
            },
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        return dron;
    }

    // =============================================
    // GEMA DE ENERGIA
    // =============================================

    crearGemaEnergia() {

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

        this.activarGemaEnergia =
            () => {

                if (
                    this.gemaEnergiaRecogida ||
                    !this.gemaEnergia
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

                        this.gemaEnergiaActiva =
                            true;

                        this.brilloKaelEnergia();

                        this.dronesPequenosActivos =
                            true;

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

                                if (
                                    this.gemaEnergia
                                ) {
                                    this.gemaEnergia.destroy();
                                }

                                if (
                                    this.auraGemaEnergia
                                ) {
                                    this.auraGemaEnergia.destroy();
                                }

                                if (
                                    this.brilloGemaEnergia
                                ) {
                                    this.brilloGemaEnergia.destroy();
                                }

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
    // DIALOGO KAEL
    // =============================================

    mostrarDialogoKael() {

        if (!this.kael) {
            return;
        }

        const nube =
            this.add.graphics();

        nube.setPosition(
            this.kael.x,
            this.kael.y - 155
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

        nube.fillCircle(-48, 76, 15);
        nube.fillCircle(-30, 103, 10);
        nube.fillCircle(-14, 123, 7);

        nube.lineStyle(
            4,
            0x000000,
            1
        );

        nube.strokeCircle(-48, 76, 15);
        nube.strokeCircle(-30, 103, 10);
        nube.strokeCircle(-14, 123, 7);

        nube.setDepth(100);
        nube.setScale(0.7);
        nube.setAlpha(0);

        const texto =
            this.add.text(
                this.kael.x,
                this.kael.y - 155,
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

        texto
            .setOrigin(0.5)
            .setDepth(101)
            .setScale(0.7)
            .setAlpha(0);

        this.tweens.add({
            targets: [
                nube,
                texto
            ],
            scale: 1,
            alpha: 1,
            duration: 400,
            ease: "Back.easeOut"
        });

        const seguir =
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

                    texto.setPosition(
                        this.kael.x,
                        this.kael.y - 155
                    );

                }
            });

        this.time.delayedCall(
            2700,
            () => {

                if (seguir) {
                    seguir.remove();
                }

                this.tweens.add({
                    targets: [
                        nube,
                        texto
                    ],
                    alpha: 0,
                    scale: 0.9,
                    duration: 450,
                    ease: "Sine.easeIn",
                    onComplete: () => {
                        nube.destroy();
                        texto.destroy();
                    }
                });

            }
        );
    }

    // =============================================
    // BARRA
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
    }

    // =============================================
    // ACTUALIZAR BARRA
    // =============================================

    actualizarBarraEnergia() {

        if (!this.barraEnergia) {
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

        }

        this.textoEnergia.setText(
            "ENERGÍA  " +
            Math.floor(this.energiaKael) +
            " / " +
            this.energiaMaxima
        );
    }

    // =============================================
    // BRILLO SUAVE DE KAEL
    // =============================================

    brilloKaelEnergia() {

        if (
            !this.kael ||
            this.brilloEnergiaActivo
        ) {
            return;
        }

        this.brilloEnergiaActivo = true;

        const aura =
            this.add.circle(
                this.kael.x,
                this.kael.y,
                24,
                0x00ffff,
                0.14
            );

        aura.setDepth(4);

        this.tweens.add({
            targets: aura,
            scale: 1.8,
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

                this.brilloEnergiaActivo =
                    false;

            }
        });
    }

    // =============================================
    // DISPARO DRON GRANDE
    // =============================================

    dispararLaserDronGrande() {

        if (
            this.finalizando ||
            !this.dron ||
            !this.kael
        ) {
            return;
        }

        if (!this.dronGrandePuedeDisparar) {
            return;
        }

        const distancia =
            Phaser.Math.Distance.Between(
                this.dron.x,
                this.dron.y,
                this.kael.x,
                this.kael.y
            );

        if (distancia > 500) {
            return;
        }

        this.dronGrandePuedeDisparar = false;

        const laser =
            this.crearLaser(
                this.dron.x,
                this.dron.y,
                this.kael.x,
                this.kael.y,
                0xff3333,
                12
            );

        this.laseres.push(laser);

        this.time.delayedCall(
            3600,
            () => {

                this.dronGrandePuedeDisparar =
                    true;

            }
        );
    }

    // =============================================
    // DISPARO DRON PEQUEÑO
    // =============================================

    dispararLaserPequeno(
        dron,
        numero
    ) {

        if (
            this.finalizando ||
            !this.dronesPequenosActivos ||
            !dron ||
            !this.kael
        ) {
            return;
        }

        if (
            numero === 1 &&
            !this.dronPequeno1PuedeDisparar
        ) {
            return;
        }

        if (
            numero === 2 &&
            !this.dronPequeno2PuedeDisparar
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

        if (distancia > 700) {
            return;
        }

        if (numero === 1) {
            this.dronPequeno1PuedeDisparar =
                false;
        } else {
            this.dronPequeno2PuedeDisparar =
                false;
        }

        const laser =
            this.crearLaser(
                dron.x,
                dron.y,
                this.kael.x,
                this.kael.y,
                0x35ff55,
                8
            );

        this.laseres.push(laser);

        this.time.delayedCall(
            4000,
            () => {

                if (numero === 1) {
                    this.dronPequeno1PuedeDisparar =
                        true;
                } else {
                    this.dronPequeno2PuedeDisparar =
                        true;
                }

            }
        );
    }

    // =============================================
    // CREAR LASER
    // =============================================

    crearLaser(
        x1,
        y1,
        x2,
        y2,
        color,
        grosor
    ) {

        const distancia =
            Phaser.Math.Distance.Between(
                x1,
                y1,
                x2,
                y2
            );

        const angulo =
            Phaser.Math.Angle.Between(
                x1,
                y1,
                x2,
                y2
            );

        const laser =
            this.add.rectangle(
                x1,
                y1,
                distancia,
                grosor,
                color,
                0.95
            );

        laser
            .setOrigin(0, 0.5)
            .setRotation(angulo)
            .setDepth(20);

        // brillo

        const brillo =
            this.add.rectangle(
                x1,
                y1,
                distancia,
                3,
                0xffffff,
                0.75
            );

        brillo
            .setOrigin(0, 0.5)
            .setRotation(angulo)
            .setDepth(21);

        laser.brillo =
            brillo;

        laser.xInicial = x1;
        laser.yInicial = y1;

        laser.xObjetivo = x2;
        laser.yObjetivo = y2;

        laser.colorLaser =
            color;

        laser.tiempoVida = 0;

        this.tweens.add({
            targets: laser,
            alpha: {
                from: 0.2,
                to: 1
            },
            duration: 90,
            yoyo: true,
            repeat: 2
        });

        return laser;
    }

    // =============================================
    // ACTUALIZAR LASERES
    // =============================================

    actualizarLasers(delta) {

        if (!this.laseres) {
            return;
        }

        for (
            let i = this.laseres.length - 1;
            i >= 0;
            i--
        ) {

            const laser =
                this.laseres[i];

            if (!laser) {
                this.laseres.splice(i, 1);
                continue;
            }

            laser.tiempoVida += delta;

            if (
                laser.tiempoVida > 230
            ) {

                if (laser.brillo) {
                    laser.brillo.destroy();
                }

                laser.destroy();

                this.laseres.splice(i, 1);

                continue;
            }

            if (
                this.kael &&
                !laser.golpeado
            ) {

                const distancia =
                    Phaser.Math.Distance.Between(
                        laser.x,
                        laser.y,
                        this.kael.x,
                        this.kael.y
                    );

                if (distancia < 45) {

                    laser.golpeado =
                        true;

                    this.recibirImpactoLaser();

                }

            }

        }
    }

    // =============================================
    // IMPACTO LASER
    // =============================================

    recibirImpactoLaser() {

        if (
            this.finalizando ||
            !this.kael
        ) {
            return;
        }

        // =====================================
        // QUITA 7
        // =====================================

        this.energiaKael -= 7;

        if (this.energiaKael < 0) {
            this.energiaKael = 0;
        }

        this.actualizarBarraEnergia();

        // =====================================
        // DESTELLO ROJO SUAVE
        // =====================================

        const destello =
            this.add.circle(
                this.kael.x,
                this.kael.y,
                20,
                0xff2222,
                0.55
            );

        destello.setDepth(15);

        this.tweens.add({
            targets: destello,
            scale: 2,
            alpha: 0,
            duration: 250,
            ease: "Cubic.easeOut",
            onComplete: () => {
                destello.destroy();
            }
        });

        // =====================================
        // TEXTO
        // =====================================

        const texto =
            this.add.text(
                this.kael.x,
                this.kael.y - 55,
                "VAYA...\nESO SÍ DOLIÓ.",
                {
                    fontFamily: "Arial",
                    fontSize: "17px",
                    fontStyle: "bold",
                    color: "#ff5555",
                    stroke: "#050505",
                    strokeThickness: 4,
                    align: "center"
                }
            );

        texto
            .setOrigin(0.5)
            .setDepth(100);

        this.tweens.add({
            targets: texto,
            y: texto.y - 25,
            alpha: 0,
            duration: 900,
            ease: "Sine.easeOut",
            onComplete: () => {
                texto.destroy();
            }
        });

        // =====================================
        // MUERTE
        // =====================================

        if (
            this.energiaKael <= 0
        ) {

            this.time.delayedCall(
                250,
                () => {

                    if (!this.finalizando) {
                        this.finalizarValle();
                    }

                }
            );

        }
    }

    // =============================================
    // UPDATE
    // =============================================

    update(time, delta) {

        if (this.finalizando) {
            return;
        }

        // =====================================
        // PATINES
        // =====================================

        if (
            this.kael &&
            this.kaelPatines
        ) {

            this.kaelPatines.setPosition(
                this.kael.x,
                this.kael.y
            );

            this.kaelPatines.setFlipX(
                this.kael.flipX
            );

        }

        // =====================================
        // DRON GRANDE
        // =====================================

        if (
            this.dron &&
            this.dronHalo &&
            this.dronAnillo
        ) {

            this.dronHalo.x =
                this.dron.x;

            this.dronHalo.y =
                this.dron.y;

            this.dronAnillo.x =
                this.dron.x;

            this.dronAnillo.y =
                this.dron.y;

            if (this.kael) {

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
                    !detectado
                ) {

                    this.dronDetectando =
                        false;

                }

                // dispara cuando tiene a Kael cerca

                if (
                    detectado
                ) {

                    this.dispararLaserDronGrande();

                }

            }
        }

        // =====================================
        // DRONES PEQUEÑOS
        // =====================================

        if (
            this.dronesPequenosActivos
        ) {

            if (
                this.dronPequeno1
            ) {

                this.dispararLaserPequeno(
                    this.dronPequeno1,
                    1
                );

            }

            if (
                this.dronPequeno2
            ) {

                this.dispararLaserPequeno(
                    this.dronPequeno2,
                    2
                );

            }

        }

        // =====================================
        // LASERES
        // =====================================

        this.actualizarLasers(
            delta
        );

        // =====================================
        // VELOCIDAD
        // =====================================

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

        // =====================================
        // MOVIMIENTO
        // =====================================

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

        // =====================================
        // SALTO
        // =====================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            ) &&
            this.kael.body.blocked.down &&
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

        // =====================================
        // RECARGA
        // =====================================

        if (
            this.kael.body.blocked.down &&
            this.kael.body.velocity.x === 0 &&
            this.energiaKael <
            this.energiaMaxRecarga
        ) {

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

            this.actualizarBarraEnergia();

        }

        // =====================================
        // GEMA
        // =====================================

        if (
            !this.gemaEnergiaRecogida &&
            this.gemaEnergia &&
            this.kael.x >=
            this.puntoGemaEnergia - 35
        ) {

            this.activarGemaEnergia();

        }

        // =====================================
        // CUARZO
        // =====================================

        if (
            this.kael.x >=
            this.puntoCuarzo - 250
        ) {

            this.activarCuarzo();

        }

    }

    // =============================================
    // ALERTA DRON
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
                    strokeThickness: 4
                }
            );

        alerta
            .setOrigin(0.5)
            .setDepth(100);

        this.time.delayedCall(
            2400,
            () => {

                if (alerta) {

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

                if (this.dronNucleo) {

                    this.dronNucleo.setFillStyle(
                        0x00eaff,
                        1
                    );

                }

                if (this.dronNucleoBrillo) {

                    this.dronNucleoBrillo.setFillStyle(
                        0x00eaff,
                        0.10
                    );

                }

            }
        );
    }

    // =============================================
    // FINAL DEL VALLE
    // =============================================

    finalizarValle() {

        if (this.finalizando) {
            return;
        }

        this.finalizando = true;

        // =====================================
        // DETENER LASERES
        // =====================================

        if (this.laseres) {

            this.laseres.forEach(
                laser => {

                    if (laser.brillo) {
                        laser.brillo.destroy();
                    }

                    laser.destroy();

                }
            );

            this.laseres = [];

        }

        // =====================================
        // DETENER KAEL
        // =====================================

        if (this.kael) {

            this.kael.setVelocity(
                0,
                0
            );

            this.kael.body.enable =
                false;

        }

        // =====================================
        // DESTELLO
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
            .setDepth(100);

        this.tweens.add({
            targets: destello,
            alpha: 0.9,
            duration: 160,
            yoyo: true,
            ease: "Quad.easeOut"
        });

        // =====================================
        // FRAGMENTOS
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

            if (
                i % 4 === 0
            ) {

                fragmento.setStrokeStyle(
                    2,
                    0xffffff,
                    0.45
                );

            }

            this.tweens.add({
                targets: fragmento,
                x:
                    x +
                    Phaser.Math.Between(
                        -700,
                        700
                    ),
                y:
                    y +
                    Phaser.Math.Between(
                        -550,
                        550
                    ),
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

        // =====================================
        // DESAPARECER MUNDO
        // =====================================

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

        // =====================================
        // TUNEL OSCURO
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
            .setDepth(105);

        this.tweens.add({
            targets: negro,
            alpha: 0.35,
            duration: 1300,
            ease: "Sine.easeInOut"
        });

        // =====================================
        // EXPLOSION DORADA
        // =====================================

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

                            scaleX: 1.15,
                            scaleY: 1.15,

                            duration: 220,

                            ease: "Sine.easeInOut",

                            onComplete: () => {

                                flashBlanco.setFillStyle(
                                    0xffffff,
                                    1
                                );

                                this.tweens.add({

                                    targets:
                                        flashBlanco,

                                    scaleX: 1.35,
                                    scaleY: 1.35,

                                    duration: 160,

                                    ease: "Sine.easeOut",

                                    onComplete: () => {

                                        this.tweens.add({

                                            targets:
                                                flashBlanco,

                                            alpha: 0,

                                            scaleX: 1.8,
                                            scaleY: 1.8,

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

                });

            }
        );
    }
}
